import {
    STATUS_CODES,
    adminAuthRequiredFields,
    cookieAttributeForJwtToken
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { AdminAuthService } from '../services/adminAuth.service.js';
import { AttributeModel } from '../models/attribute.modal.js';
import fetch from 'node-fetch';
import { json } from 'express';

export class AttributeController{
    static async insertAttr(req, res) {
        try {
            let name = req.body.name;
            // Call model method to update product
            const insertAttrResult = await AttributeModel.insertAttr(name);

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Attribute Added successfully', insertAttrResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async fetchAttr(req, res) {
        try {
          
            const fetchAttrResult = await AttributeModel.fetchAttr();

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'All Attribute Fetched successfully', fetchAttrResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async deleteAttr(req, res) {
        try {
            let {id} = req.query;
            let {is_active} = req.body;
            const deleteAttrResult = await AttributeModel.deleteAttr(id, is_active);

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Attribute Deleted Successfully', deleteAttrResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async fetchAttrId(req, res) {
        try {
            let {id} = req.query;
            const fetchAttrIdResult = await AttributeModel.fetchAttrId(id);

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Attribute Fetched Successfully', fetchAttrIdResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async updateAttr(req, res) {
        try {
            let {id} = req.query;
            let name1  = req.body.name;
           let name = name1.trim()
            const updateAttrResult = await AttributeModel.updateAttr(name, id);

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Attribute Updated Successfully', updateAttrResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }



    // EJS Render
       static productAttributesRender(req, res) {
        try {
            fetch(`${env.url}attribute/fetchAttr`,{
                method: 'GET'
            })
            .then(res => res.json())
            .then((data) =>{
                let result = data.data;
                res.render('product/product_attributes' ,{url: env.url, data: result});
            })
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
}