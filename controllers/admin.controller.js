import {
    STATUS_CODES,
    cookieAttributeForJwtToken,
    dbErrorCodes,
    userAuthRequiredFields
  } from '../helpers/constants.js';
  import { AppError } from '../helpers/error.js';
// import { Query } from '../helpers/query.js';
  import {
    isAvailable,
    saveCookie,
    sendResponse,
    validate
  } from '../helpers/utils.js';
  import { CategoryModel } from '../models/category.model.js';

export class AdminController {
    /**
     * @description
     * the controller method to sign up a new user
     * @param {object} req the request object
     * @param {object} res the response object
     * @param {object} next the next middleware function in the application’s request-response cycle
     * @returns the newly created user
     */
    static async get_cart_ids(req, res, next) {
        try {

            console.log(req.session)
            // const user = req.session;

            const query = "select * from categories";
            const category = await CategoryModel.customQuery(query);
      
            if (!category.length) return next(new AppError('No category found', STATUS_CODES.NOT_FOUND));
      
            return sendResponse(res, STATUS_CODES.OK, 'All categories fetched successfully', category);
          } catch (error) {
            return next(
              new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
              )
            );
          }

    }
}
