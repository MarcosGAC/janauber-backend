import { db } from "../db.js";

export class Travel {
  /**
   * get all travels
   * @param {object} query
   * @return {Promise<Object> Travel}
   */

  async getAll(query) {
    const script = db.from("travel").select(
      `
      origin, 
      destination,
      travelTime,
      type,
      status,
      driver(email, name, cpf, birthday, color, plate, model, id),
      passengers: passenger_travel(passenger(email, name, cpf, birthday, id))`
    );
    if (query?.driverId) {
      script.eq("driverId", query?.driverId);
    }

    if (query?.passengerId) {
      script.eq("passenger_travel.passenger.id", query?.passengerId);
    }
    const { data: travel, error } = await script;
    return { travel, error };
  }
  /**
   * create ONE travel
   * @param {object} travel
   */

  async create(newTravel, passengersIds) {
    const {
      data: [travel],
      error: travelError,
    } = await db.from("travel").insert(newTravel).select().limit(1);

    const newPassengerTravels = passengersIds.map((passengerId) => ({
      passengerId,
      travelId: travel.id,
    }));

    const { error } = await db
      .from("passenger_travel")
      .insert(newPassengerTravels);

    return { success: true, error: error || travelError };
  }

  /**
   * Find a travel by Id
   * @param {string} id
   */

  async findOneById(id) {
    const {
      data: [travel],
      error,
    } = await db
      .from("travel")
      .select(
        `
    origin, 
    destination,
    travelTime,
    type,
    status,
    driver(email, name, cpf, birthday, color, plate, model),
    passengers: passenger_travel(passenger(email, name, cpf, birthday))`
      )
      .eq("id", id);
    return { travel, error };
  }

  /**
   * Find a travel by Passenger
   * @param {string} id
   */
  async findOneByPassengerId(id) {
    const {
      data: [travel],
      error,
    } = await db
      .from("travel")
      .select(
        `
    origin, 
    destination,
    travelTime,
    type,
    status,
    driver(email, name, cpf, birthday, color, plate, model),
    passengers: passenger_travel(passenger(email, name, cpf, birthday))`
      )
      .eq("passenger_travel(passengerId)", id);
    return { travel, error };
  }

  /**
   * Find a travel by Driver
   * @param {string} id
   */
  async findOneByDriverId(id) {
    const {
      data: [travel],
      error,
    } = await db
      .from("travel")
      .select(
        `
      origin, 
      destination,
      travelTime,
      type,
      status,
      driver(email, name, cpf, birthday, color, plate, model),
      passengers: passenger_travel(passenger(email, name, cpf, birthday))`
      )
      .eq("driverId", id);
    return { travel, error };
  }
}
