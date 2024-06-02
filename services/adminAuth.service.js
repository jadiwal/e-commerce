import { getJwtToken, getHashPassword, verifyPassword } from '../helpers/utils.js';
// import { AdminAuthModel } from '../models/category.model.js';
import { AdminAuthModel } from '../models/adminAuth.model.js';

export const AdminAuthService = {};

/**
 * @description
 * the service method to sign up a new admin
 * @param {string} email the email of the admin to be created
 * @param {string} password the plaintext password of the admin to be created
 * @returns the newly created admin
 */
AdminAuthService.signUpAdmin = async (email, password) => {
  const hashPassword = await getHashPassword(password);

  const admin = await AdminAuthModel.createAdmin(email, hashPassword);

  return admin;
};

/**
 * @description
 * the service method to log in an existing admin
 * @param {string} email the email of the admin
 * @param {string} password the plaintext password of the admin
 * @returns the logged in admin along with the access token
 */
AdminAuthService.logInAdmin = async (email, password) => {
  const admin = await AdminAuthModel.findAdminByAttribute('email', email);

  if (admin) {
    const authCheck = await verifyPassword(password, admin.password);

    if (authCheck) {
      const jwtPayload = {
        adminId: admin.id,
        email: admin.email
      };
      const token = getJwtToken(jwtPayload, "admin");

      return { admin, token };
    } throw Error('Incorrect password');
  } throw Error('Incorrect email');
};
