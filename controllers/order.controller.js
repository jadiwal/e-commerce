import {
    STATUS_CODES,
    adminAuthRequiredFields,
    cookieAttributeForJwtToken,
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { AdminAuthService } from '../services/adminAuth.service.js';
import { OrderModel } from '../models/order.model.js';


export class OrderController {
    static async orderCount(req, res) {

        try {

            const orderCountResult = await OrderModel.orderCount();
            // console.log(orderCountResult[0].count )
            let data = []
            if (orderCountResult) {
                for (let i = 0; i < orderCountResult.length; i++) {
                    if (orderCountResult[i]) {
                        let data1 = {
                            source: orderCountResult[i].source,
                            count: orderCountResult[i].count
                        };
                        data.push(data1);
                    }
                }

                return sendResponse(res, STATUS_CODES.OK, `successfully`, data);
            }
            return (new AppError(` not be deleted`, STATUS_CODES.BAD_REQUEST));
        } catch (error) {
            return (
                new AppError(
                    error.message || 'Internal Server Error',
                    error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                    error.response || error
                )
            );
        }
    }

    static async orderList(req, res) {
        try {
            let orderListResult;
            let status = req.params.status
            status.toLowerCase()
            if (status === 'all') {
                orderListResult = await OrderModel.orderList()
            } else {
                orderListResult = await OrderModel.orderList(status)
            }

            return sendResponse(res, STATUS_CODES.OK, `successfully`, orderListResult);

        } catch (error) {
            return (
                new AppError(
                    error.message || 'Internal Server Error',
                    error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                    error.response || error
                )
            );
        }
    }
    static async orderDetails(req, res) {
        try {
            const orderId = req.params.order_id;
            // Check if orderId exists in the request
            if (!orderId) {
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, "Order ID is required");
            }
            const orderDetailsResult = await OrderModel.orderDetails(orderId)

            return sendResponse(res, STATUS_CODES.OK, `successfully`, orderDetailsResult);

        } catch (error) {
            return (
                new AppError(
                    error.message || 'Internal Server Error',
                    error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                    error.response || error
                )
            );
        }
    }
    static async orderInvoice(req, res) {
        try {
            const orderId = req.params.order_id;
            // Check if orderId exists in the request
            if (!orderId) {
                return sendResponse(res, STATUS_CODES.BAD_REQUEST, "Order ID is required");
            }
            const orderDetailsResult = await OrderModel.orderInvoice(orderId)

            return sendResponse(res, STATUS_CODES.OK, `successfully`, orderDetailsResult);

        } catch (error) {
            return (
                new AppError(
                    error.message || 'Internal Server Error',
                    error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                    error.response || error
                )
            );
        }
    }

    static saleslist_all(req, res, next) {
        if (req.cookies[`${cookieAttributeForJwtToken}`]) {
          res.clearCookie(cookieAttributeForJwtToken);
        }
        res.render('sales/saleslist_all', { url : env.url });
      }

    static saleslist_pending(req, res, next) {
        if (req.cookies[`${cookieAttributeForJwtToken}`]) {
          res.clearCookie(cookieAttributeForJwtToken);
        }
        res.render('sales/saleslist_pending', { url : env.url });
      }

    static saleslist_confirmed(req, res, next) {
        if (req.cookies[`${cookieAttributeForJwtToken}`]) {
          res.clearCookie(cookieAttributeForJwtToken);
        }
        res.render('sales/saleslist_confirmed', { url : env.url });
      }

    static saleslist_packaging(req, res, next) {
        if (req.cookies[`${cookieAttributeForJwtToken}`]) {
          res.clearCookie(cookieAttributeForJwtToken);
        }
        res.render('sales/saleslist_packaging', { url : env.url });
      }

    static saleslist_out_of_delivery(req, res, next) {
        if (req.cookies[`${cookieAttributeForJwtToken}`]) {
          res.clearCookie(cookieAttributeForJwtToken);
        }
        res.render('sales/saleslist_out_of_delivery', { url : env.url });
      }

    static saleslist_delivered(req, res, next) {
        if (req.cookies[`${cookieAttributeForJwtToken}`]) {
          res.clearCookie(cookieAttributeForJwtToken);
        }
        res.render('sales/saleslist_delivered', { url : env.url });
      }

    static saleslist_returned(req, res, next) {
        if (req.cookies[`${cookieAttributeForJwtToken}`]) {
          res.clearCookie(cookieAttributeForJwtToken);
        }
        res.render('sales/saleslist_returned', { url : env.url });
      }

    static saleslist_failed(req, res, next) {
        if (req.cookies[`${cookieAttributeForJwtToken}`]) {
          res.clearCookie(cookieAttributeForJwtToken);
        }
        res.render('sales/saleslist_failed', { url : env.url });
      }

    static saleslist_canceled(req, res, next) {
        if (req.cookies[`${cookieAttributeForJwtToken}`]) {
          res.clearCookie(cookieAttributeForJwtToken);
        }
        res.render('sales/saleslist_canceled', { url : env.url });
      }

    static sales_details(req, res, next) {
    
        res.render('sales/salesdetails', { url : env.url });
      }
      
}