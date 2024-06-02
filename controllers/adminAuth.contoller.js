import {
  STATUS_CODES,
  cookieAttributeForJwtToken,
  dbErrorCodes,
  adminAuthRequiredFields
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import {
  isAvailable,
  saveCookie,
  sendResponse,
  validate,
  verifyJwtToken
} from '../helpers/utils.js';
import { AdminAuthService } from '../services/adminAuth.service.js';
// import { url } from '../helpers/constants.js'

export class AdminAuthController {

  /**
   * @description
   * the controller method to sign up a new admin
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the newly created admin
   */
  static async signUpAdmin(req, res, next) {
    const { body: requestBody } = req;

    const allFieldsArePresent = isAvailable(requestBody, Object.values(adminAuthRequiredFields));

    if (!allFieldsArePresent) return next(new AppError('Some fields are missing', STATUS_CODES.BAD_REQUEST));

    const { email, password } = requestBody;

    if (!validate.password(password)) return next(new AppError('Please use a different password', STATUS_CODES.BAD_REQUEST));

    try {
      const insertAdminResult = await AdminAuthService.signUpAdmin(email, password);

      return sendResponse(res, STATUS_CODES.SUCCESSFULLY_CREATED, 'The admin signed up successfully', { id: insertAdminResult.insertId, email });
    } catch (error) {
      if (error.code === dbErrorCodes.ER_DUP_ENTRY) delete error.sql; // avoiding the sql query to prevent showcasing sensitive information in the response

      return next(
        new AppError(
          error.code === dbErrorCodes.ER_DUP_ENTRY ? 'Email already exists' : error.message || 'Internal Server Error',
          error.code === dbErrorCodes.ER_DUP_ENTRY ? STATUS_CODES.BAD_REQUEST : error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @description
   * the controller method to log in an existing admin
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the information of the logged in admin and the access token
   */
  static async logInAdmin(req, res, next) {
    const { body: requestBody } = req;

    const allFieldsArePresent = isAvailable(requestBody, Object.values(adminAuthRequiredFields));

    if (!allFieldsArePresent) return next(new AppError('Some fields are missing !!!', STATUS_CODES.BAD_REQUEST));

    const { email, password } = requestBody;

    try {
      const { admin, token: access_token } = await AdminAuthService.logInAdmin(email, password);

      saveCookie(res, cookieAttributeForJwtToken, access_token);

      return sendResponse(res, STATUS_CODES.OK, 'Admin logged in successfully', { adminId: admin.id, email: admin.email, token: access_token });
    } catch (error) {
      next(
        new AppError(
          error.message || 'Internal Server Error',
          error.message === 'Incorrect Email'
            || error.message === 'Incorrect password'
            ? STATUS_CODES.BAD_REQUEST
            : error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @description
   * the controller method to log out a admin
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   */
  static logOutAdmin(req, res, next) {
    if (req.cookies[`${cookieAttributeForJwtToken}`]) {
      res.clearCookie(cookieAttributeForJwtToken);

      return sendResponse(res, STATUS_CODES.OK, 'Admin logged out successfully');
    }

    return next(new AppError('You need to log in first', STATUS_CODES.BAD_REQUEST));
  }

  /**
   * @description
   * the controller method to redirect from / to /login
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   */
  static indexRedirect(req, res, next) {
    if (req.cookies[`${cookieAttributeForJwtToken}`]) {
      res.redirect("/index");
    }
    res.redirect("/login");
  }

  /**
   * @description
   * the controller method to render the login page
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   */
  static login(req, res, next) {
 
    if (req.cookies[`${cookieAttributeForJwtToken}`]) {
      res.clearCookie(cookieAttributeForJwtToken);
    }
    res.render('sign_in', { url : env.url });
  }
  
  static index(req, res, next) {

    if (req.cookies[`${cookieAttributeForJwtToken}`]) {
      res.clearCookie(cookieAttributeForJwtToken);
    }
    res.render('index', { url : env.url });
  }
  
  static productlist(req, res, next) {
    if (req.cookies[`${cookieAttributeForJwtToken}`]) {
      res.clearCookie(cookieAttributeForJwtToken);
    }
    res.render('product/addproduct', { url : env.url });
  }

}
