import { db } from "../db.js";

export class Passenger {
  /**
   * get all passengers
   */
  async getAll() {
    return await db.from("passenger").select();
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
    return await db.from("passenger").insert(passenger).select().limit(1);
  }
  /**
   * Find a passenger by Id
   * @param {string} id
   */
  async findOneById(id) {
    return await db.from("passenger").select().eq("id", id);
  }

  /**
   * Find a passenger by email
   * @param {string} email
   */
  async findOneByEmail(email) {
    const { data, error } = await db
      .from("passenger")
      .select()
      .ilike("email", `%${email}%`)
      .limit(1);
    return { data, error };
  }
}
