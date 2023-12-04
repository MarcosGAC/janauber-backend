import { db } from "../db.js";

export class Driver {
  /**
   * get all drivers
   * @return {Promise<Object> Driver}
   */

  async getAll() {
    const { data: driver, error } = await db.from("driver").select();
    return { driver, error };
  }
  /**
   * create ONE driver
   * @param {object} driver
   * @param {string} driver.name
   * @param {string} driver.email
   * @param {string} driver.password
   * @param {string} driver.cpf
   * @param {string} driver.birthday
   */

  async create(driver) {
    const { data = [driver], error } = await db
      .from("driver")
      .insert(driver)
      .select()
      .limit(1);
    return { error };
  }

  /**
   * Find a driver by Id
   * @param {string} id
   */

  async findOneById(id) {
    const {
      data: [driver],
      error,
    } = await db.from("driver").select().eq("id", id);
    console.log("id ->", id);
    console.log("driver ->", driver);
    return { driver, error };
  }

  /**
   * Find a driver by email
   * @param {string} email
   */

  async findOneByEmail(email) {
    const {
      data: [driver],
      error,
    } = db.from("driver").select().ilike("email", `%${email}%`).limit(1);
    return { driver, error };
  }
}
