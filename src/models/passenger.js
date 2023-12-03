import { db } from "../db.js";

export class Passenger {
  /**
   * get all passengers
   * @return {Promise<Object>} Passenger
   */
  async getAll() {
    const { data: passenger, error } = await db.from("passenger").select();
    return { passenger, error };
  }

  /**
   * create ONE passengers
   * @param { Object } passenger
   * @param {string} passenger.name
   * @param {string} passenger.email
   * @param {string} passenger.password
   * @param {string} passenger.cpf
   * @param {string} passenger.birthday
   */
  async create(passenger) {
    const { data = [passenger], error } = await db
      .from("passenger")
      .insert(passenger)
      .select()
      .limit(1);
    return { passenger, error };
  }
  /**
   * Find a passenger by Id
   * @param {string} id
   */
  async findOneById(id) {
    const {
      data: [passenger],
      error,
    } = await db.from("passenger").select().eq("id", id);
    return { passenger, error };
  }

  /**
   * Find a passenger by email
   * @param {string} email
   */
  async findOneByEmail(email) {
    const {
      data: [passenger],
      error,
    } = await db
      .from("passenger")
      .select()
      .ilike("email", `%${email}%`)
      .limit(1);
    return { passenger, error };
  }
}
