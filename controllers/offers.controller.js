import {
    STATUS_CODES,
    adminAuthRequiredFields
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { AdminAuthService } from '../services/adminAuth.service.js';
import { OffersModel } from '../models/offers.model.js';
import fetch from 'node-fetch';
// const express = require('express');

export class OffersController {
    static async addCoupon(req, res) {
        try {
            let {
                added_by,
                coupon_type,
                coupon_bearer,
                seller_id,
                customer_id,
                title,
                code,
                start_date,
                expire_date,
                min_purchase,
                max_discount,
                discount,
                discount_type,
                status,
                limit
            } = req.body;
            // const addProductResult = await UserModel.addProduct(added_by)
            const addCouponResult = await OffersModel.addCoupon({
                added_by,
                coupon_type,
                coupon_bearer,
                seller_id,
                customer_id,
                title,
                code,
                start_date,
                expire_date,
                min_purchase,
                max_discount,
                discount,
                discount_type,
                status,
                limit
            });
            return sendResponse(res, STATUS_CODES.OK, `successfully`, addCouponResult);

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

    static async couponList(req, res) {
        try {
            let couponListResult;
            let coupon_type = req.params.coupon_type
            coupon_type.toLowerCase()
            if (coupon_type === 'all') {
                couponListResult = await OffersModel.couponList()
            } else {
                couponListResult = await OffersModel.couponList(coupon_type)
            }

            return sendResponse(res, STATUS_CODES.OK, `successfully`, couponListResult);

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

    static async flashDeal(req, res) {
        try {
            let {
                title,
                start_date,
                end_date,
                status,
                featured,
                background_color,
                text_color,
                slug,
                product_id,
                deal_type
            } = req.body;

            let banner = req.files[0].filename;

            let flashDealResult;

            flashDealResult = await OffersModel.flashDeal({
                title,
                start_date,
                end_date,
                status,
                featured,
                background_color,
                text_color,
                banner,
                slug,
                product_id,
                deal_type
            })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, flashDealResult);

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
    static async flashDealUpdateData(req, res) {
        try {
            let flashDealUpdateDataResult;
            let id = req.query.id
            if (id === "all") {
                flashDealUpdateDataResult = await OffersModel.flashDealUpdateData()
            } else {
                flashDealUpdateDataResult = await OffersModel.flashDealUpdateData(id)
            }
           
            flashDealUpdateDataResult = await OffersModel.flashDealUpdateData(id)

            return sendResponse(res, STATUS_CODES.OK, `successfully`, flashDealUpdateDataResult);

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
    static async dealOfTheDay(req, res) {
        try {
            let {
                title,
                product_id
            } = req.body;


            let dealOfTheDayResult;

            dealOfTheDayResult = await OffersModel.dealOfTheDay({
                title,
                product_id
            })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, dealOfTheDayResult);

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

    static async dealOfTheDayTableUpdate(req, res) {
        try {
            let {
                status
            } = req.body;

            let id = req.params.id

            let dealOfTheDayTableUpdateResult;

            dealOfTheDayTableUpdateResult = await OffersModel.dealOfTheDayTableUpdate({
                id,
                status
            })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, dealOfTheDayTableUpdateResult);

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
    static async flashDealTableUpdate(req, res) {
        try {
            let {
                status
            } = req.body;

            let id = req.params.id

            let flashDealTableUpdateResult;

            flashDealTableUpdateResult = await OffersModel.flashDealTableUpdate({
                id,
                status
            })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, flasDealTableUpdateResult);

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
    static async flasDealUpdate(req, res) {
        try {
            let {
                title,
                start_date,
                end_date,

            } = req.body;
            let banner = req.files[0].filename
            let id = req.params.id

            let flasDealUpdateResult;

            flasDealUpdateResult = await OffersModel.flasDealUpdate({
                id,
                title,
                start_date,
                end_date,
                banner
            })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, flasDealUpdateResult);

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

    static async flashDealAddProduct(req, res) {
        try {
            let {
                id,
                product_id,

            } = req.body;

            let flashDealAddProductResult;

            flashDealAddProductResult = await OffersModel.flashDealAddProduct({
                id,
                product_id
            })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, flashDealAddProductResult);

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

    static async flashDealTable(req, res) {
        try {

            let flashDealTableResult = await OffersModel.flashDealTable()

            return sendResponse(res, STATUS_CODES.OK, `successfully`, flashDealTableResult);

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
    static async dealOfTheDayTable(req, res) {
        try {

            let dealOfTheDayTableResult = await OffersModel.dealOfTheDayTable()

            return sendResponse(res, STATUS_CODES.OK, `successfully`, dealOfTheDayTableResult);

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

    static async flashDealProductTable(req, res) {
        try {
            let id = req.params.id
            let flashDealProductTableResult = await OffersModel.flashDealProductTable(id)

            return sendResponse(res, STATUS_CODES.OK, `successfully`, flashDealProductTableResult);

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

    static async dealOfTheDayUpdate(req, res) {
        try {
            let {
                title,
                product_id,
                status
            } = req.body;

            let id = req.params.id

            let dealOfTheDayUpdateResult;

            dealOfTheDayUpdateResult = await OffersModel.dealOfTheDayUpdate({
                id,
                title,
                product_id,
                status
            })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, dealOfTheDayUpdateResult);

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

    // static couponRender(req, res){
    //     res.render('offers_deal/coupon')
    // }

    static couponRender(req, res) {
        try {
            res.render('offers_deal/coupon');
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

    static flashRender(req, res) {
        try {
            fetch(`${env.url}offer/flashDealTable`, {
                method: 'GET'
            })
            .then((res) => res.json())
            .then((data) =>{
                res.render('offers_deal/flash', { url: env.url, data: data });
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

    static dealOfTheDayRender(req, res) {
        try {
            res.render('offers_deal/dealoftheday', { url: env.url });
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

    static flasheditRender(req, res) {
        const id = req.query.id;
        fetch(`${env.url}offer/flashDealProductTable/${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((result) => {
                let data = result.data;
                console.log(data)
                res.render('offers_deal/flash_edit', { url: env.url, id: id, data: data });

            })
            .catch((err) => {
                console.log(err)
            })
    }

    static flashaddproductRender(req, res) {
        const id = req.query.id;
        fetch(`${env.url}offer/flashDealProductTable/${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((result) => {
                let data = result.data;
                console.log(data)
                res.render('offers_deal/flash_add_product', { url: env.url, id: id, data: data });

            })
            .catch((err) => {
                console.log(err)
            })
    }

}