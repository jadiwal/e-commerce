import { Database } from '../config/db.config.js';

export class AdminAuthModel {
  /**
   * @description
   * the following method creates and saves a new admin into the database
   * @param {string} email the email of the admin to be created
   * @param {string} password the hash password of the admin to be created
   * @returns the newly created admin, if all ok
   */
  static async createAdmin(email, password) {
    const query = 'INSERT INTO admins SET ?';
    const params = { email, password };

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * the following method fetches a admin corresponding to a particular admin attribute
   * @param {string} attribute the attribute for which the admin is to be fetched
   * @param {any} value the value of the attribute
   * @returns the admin, if exists
   */
  static async findAdminByAttribute(attribute, value) {
    const query = `SELECT * FROM admins WHERE ${attribute} = ?`;
    const params = [value];

    const result = await Database.executeQuery(query, params);

    return result[0];
  }
}
