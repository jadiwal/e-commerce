/* eslint-disable import/no-extraneous-dependencies */
import e from 'express';
import { STATUS_CODES, cookieAttributeForJwtToken } from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { verifyJwtToken } from '../helpers/utils.js';
export const AuthMiddlewares = {};
/**
 * @description
 * the following middleware checks whether a admin or user is currently logged in
 * and it is to be used in all private routes
 * @param {object} req the request object
 * @param {object} res the response object
 * @param {object} next the next middleware function in the application’s request-response cycle
 */
AuthMiddlewares.checkAuth = async (req, res, next) => {
    // if()
    console.log(req.originalUrl)
    if (req.originalUrl == "/customers/walletTable" ) {
        next();
    }else if(req.originalUrl.includes("/order/orderInvoice")){
        next();
    console.log(req.originalUrl)
    }else if(req.originalUrl.includes('/product/addProduct')){
        next();
    }
     else {
        const token = req.headers[`${cookieAttributeForJwtToken}`];
        if (token) {
            try {
                const decodedToken = verifyJwtToken(token);
                if (decodedToken.adminId) {
                    res.locals.admin = {
                        id: decodedToken.adminId,
                        email: decodedToken.email,
                    };
                } else if (decodedToken.userId) {
                    res.locals.user = {
                        id: decodedToken.userId,
                        email: decodedToken.email,
                    };
                }
                next();
            } catch (error) {
                return next(new AppError('You are not authorized', STATUS_CODES.UNAUTHORIZED));
            }
        } else return next(new AppError('You are not authorized', STATUS_CODES.UNAUTHORIZED));
    }
};

/**
 * @description
 * the following middleware checks if a admin is already logged in
 * @param {object} req the request object
 * @param {object} res the response object
 * @param {object} next the next middleware function in the application’s request-response cycle
 */
AuthMiddlewares.isAuthenticated = async (req, res, next) => {
    const token = req.cookies[`${cookieAttributeForJwtToken}`];
    if (!token) return next();
    return next(new AppError('You are already logged in', STATUS_CODES.BAD_REQUEST));
};