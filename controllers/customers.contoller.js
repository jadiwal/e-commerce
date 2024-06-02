import {
    STATUS_CODES,
    adminAuthRequiredFields,
    cookieAttributeForJwtToken
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { AdminAuthService } from '../services/adminAuth.service.js';
import { CustomersModel } from '../models/customers.model.js';
import fetch from 'node-fetch';

export class CustomersController {
    
    static async customersList(req, res) {
        try {

            let customersListResult = await CustomersModel.customersList()
        
            return sendResponse(res, STATUS_CODES.OK, `successfully`, customersListResult);

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

    static async customersDetails(req, res) {
        try {
            let {id} = req.query
            let customersDetailsResult = await CustomersModel.customersDetails(id)
        
            return sendResponse(res, STATUS_CODES.OK, `successfully`, customersDetailsResult);

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

    static async customerStatus(req, res) {
        try {
            let {id} = req.query;
            let status = req.body.status;
            let customerStatusResult = await CustomersModel.customerStatus({id, status})
        
            return sendResponse(res, STATUS_CODES.OK, `successfully`, customerStatusResult);

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
   

    static async customersReviews(req, res) {
        try {

            let customersReviewsResult = await CustomersModel.customersReviews()
        
            return sendResponse(res, STATUS_CODES.OK, `successfully`, customersReviewsResult);

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
    static async walletTable(req, res) {
        try {

            let walletTableResult = await CustomersModel.walletTable()
        
            return sendResponse(res, STATUS_CODES.OK, `successfully`, walletTableResult);

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
    static async customerDelete(req, res) {
        try {
            let {id} = req.query;
            let {is_active} = req.body;
            let customerDeleteResult = await CustomersModel.customerDelete({id,is_active})
        
            return sendResponse(res, STATUS_CODES.OK, `successfully`, customerDeleteResult);

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

    static async customerReviewStatusUpdate(req, res) {
        try {
            let customer_id = req.query.id;
            let status = req.body.status;
            let customerReviewStatusUpdateResult = await CustomersModel.customerReviewStatusUpdate({customer_id, status})
        
            return sendResponse(res, STATUS_CODES.OK, `successfully`, customerReviewStatusUpdateResult);

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


    static customerList(req, res, next) {
        fetch(`${env.url}customers/customersList`, {
            method : 'GET'
        })
        .then(res => res.json())
        .then((result) => {
            let data = result.data;
            console.log(data)
            res.render('customers/customer_list', { url : env.url , data: data});

        })
        .catch((err) => {
            console.log(err)
        })
       
      }

    static customerView(req, res, next) {
        const id = req.query.id;
        fetch(`${env.url}customers/customersDetails?id=${id}`, {
            method : 'GET'
        })
        .then(res => res.json())
        .then((result) => {
            let data = result.data;
            console.log(data)
            res.render('customers/customer_view', { url : env.url, id: id, data: data });

        })
        .catch((err) => {
            console.log(err)
        })
      
      }

      static customerReviewRender(req, res, next) {
        fetch(`${env.url}customers/customersReviews`, {
            method : 'GET'
        })
        .then(res => res.json())
        .then((result) => {
            let data = result.data;
            console.log(data)
            res.render('customers/customer_review', { url : env.url, data: data });

        })
        .catch((err) => {
            console.log(err)
        })
      }


}