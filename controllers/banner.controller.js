import {
    STATUS_CODES,
    bannerCreationRequiredFields,
    possibleBannerUpdateFields,
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { BannerModel } from '../models/banner.model.js';

export class BannerController {
    /**
     * @description
     * the controller method to fetch all banners
     * @param {object} req the request object
     * @param {object} res the response object
     * @param {object} next the next middleware function in the application’s request-response cycle
     * @returns the array of banners
     */
    static async getAllBanners(req, res, next) {
        try {
            const banners = await BannerModel.get_all();

            if (!banners.length) return next(new AppError('No Banner found', STATUS_CODES.NOT_FOUND));
            return sendResponse(res, STATUS_CODES.OK, 'All Banners fetched successfully', banners);
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

    /**
     * @description
     * the controller method to create a banners
     * @param {object} req the request object
     * @param {object} res the response object
     * @param {object} next the next middleware function in the application’s request-response cycle
     * @returns the created banners
     */
    static async createBanner(req, res, next) {
        const { body: requestBody } = req;
        requestBody.created_at = 'now()';
        const allFieldsArePresent = isAvailable(requestBody, Object.values(bannerCreationRequiredFields));

        if (!allFieldsArePresent) return next(new AppError('Some fields are missing', STATUS_CODES.BAD_REQUEST));
        try {
            const bannerCreateResult = await BannerModel.create(requestBody);

            return sendResponse(res, STATUS_CODES.SUCCESSFULLY_CREATED, 'banner created successfully', {
                id: bannerCreateResult.insertId, ...requestBody
            });
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

    /**
     * @description
     * the controller method to fetch the banner corresponding to a banner id
     * @param {object} req the request object
     * @param {object} res the response object
     * @param {object} next the next middleware function in the application’s request-response cycle
     * @returns the banner fetched from the database
     */
    static async getBannerById(req, res, next) {
        const bannerId = req.params.id;
        try {
            const banner = await BannerModel.find(bannerId);

            if (banner && banner.length !== 0) {
                return sendResponse(res, STATUS_CODES.OK, `Banner with id ${bannerId} fetched successfully`, banner);
            } else {
                return next(new AppError(`Banner with id ${bannerId} not found`, STATUS_CODES.NOT_FOUND));
            }
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

    /**
     * @description
     * the controller method to update some attributes of a banner corresponding to an id
     * @param {object} req the request object
     * @param {object} res the response object
     * @param {object} next the next middleware function in the application’s request-response cycle
     */
    static async updateBanner(req, res, next) {
        const { body: requestBody } = req;
        requestBody.updated_at = 'now()';
        const fieldsToBeUpdatedExist = isAvailable(requestBody, Object.values(possibleBannerUpdateFields), false);

        if (!fieldsToBeUpdatedExist) return next(new AppError('Fields to be updated does not exist', STATUS_CODES.BAD_REQUEST));

        const bannerId = req.params.id;

        try {
            const banner = await BannerModel.find(bannerId, "id");

            if (banner && banner.length !== 0) {
                const updateBannerResult = await BannerModel.update(bannerId, requestBody, "id");
                if (updateBannerResult.affectedRows) return sendResponse(res, STATUS_CODES.OK, `Banner with id ${bannerId} updated successfully`, { id: bannerId, ...requestBody });
                return next(new AppError(`Banner with id ${bannerId} could not be updated`, STATUS_CODES.BAD_REQUEST));
            } else {
                return next(new AppError(`Banner with id ${bannerId} does not exist`, STATUS_CODES.NOT_FOUND));
            }
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
