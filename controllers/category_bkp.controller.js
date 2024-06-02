import {
    STATUS_CODES,
    categoryCreationRequiredFields,
    possibleCategoryUpdateFields,
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { createDynamicQuery, isAvailable, sendResponse } from '../helpers/utils.js';
import { CategoryModel } from '../models/category.model.js';

export class CategoryController {
    /**
     * @description
     * the controller method to fetch all categories
     * @param {object} req the request object
     * @param {object} res the response object
     * @param {object} next the next middleware function in the application’s request-response cycle
     * @returns the array of categories
     */
    static async getAllCategories(req, res, next) {
        try {
            const categories = await CategoryModel.get_all();

            if (!categories.length) return next(new AppError('No category found', STATUS_CODES.NOT_FOUND));

            return sendResponse(res, STATUS_CODES.OK, 'All categories fetched successfully', categories);
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
     * the controller method to create a category
     * @param {object} req the request object
     * @param {object} res the response object
     * @param {object} next the next middleware function in the application’s request-response cycle
     * @returns the created category
     */
    static async createCategory(req, res, next) {
        const { body: requestBody } = req;
        requestBody.created_at = 'now()';
        const allFieldsArePresent = isAvailable(requestBody, Object.values(categoryCreationRequiredFields));

        if (!allFieldsArePresent) return next(new AppError('Some fields are missing', STATUS_CODES.BAD_REQUEST));

        try {
            const categoryCreateResult = await CategoryModel.create(requestBody);

            return sendResponse(res, STATUS_CODES.SUCCESSFULLY_CREATED, 'category created successfully', {
                id: categoryCreateResult.insertId, ...requestBody
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
     * the controller method to fetch the blog corresponding to a blog id
     * @param {object} req the request object
     * @param {object} res the response object
     * @param {object} next the next middleware function in the application’s request-response cycle
     * @returns the blog fetched from the database
     */
    static async getCategoriesById(req, res, next) {
        const categoryId = req.params.id;
        try {
            const category = await CategoryModel.find(categoryId);

            if (category && category.length !== 0) {
                return sendResponse(res, STATUS_CODES.OK, `Category with id ${categoryId} fetched successfully`, category);
            } else {
                return next(new AppError(`Category with id ${categoryId} not found`, STATUS_CODES.NOT_FOUND));
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
     * the controller method to update some attributes of a user corresponding to an id
     * @param {object} req the request object
     * @param {object} res the response object
     * @param {object} next the next middleware function in the application’s request-response cycle
     */
    static async updateCategory(req, res, next) {
        const { body: requestBody } = req;
        requestBody.updated_at = 'now()';
        const fieldsToBeUpdatedExist = isAvailable(requestBody, Object.values(possibleCategoryUpdateFields), false);

        if (!fieldsToBeUpdatedExist) return next(new AppError('Fields to be updated does not exist', STATUS_CODES.BAD_REQUEST));

        const categoryId = req.params.id;

        try {
            const category = await CategoryModel.find(categoryId, "id");

            if (category && category.length !== 0) {
                const updateCategoryResult = await CategoryModel.update(categoryId, requestBody, "id");
                if (updateCategoryResult.affectedRows) return sendResponse(res, STATUS_CODES.OK, `Category with id ${categoryId} updated successfully`, { id: categoryId, ...requestBody });
                return next(new AppError(`Category with id ${categoryId} could not be updated`, STATUS_CODES.BAD_REQUEST));
            } else {
                return next(new AppError(`Category with id ${categoryId} does not exist`, STATUS_CODES.NOT_FOUND));
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


    static async getAllSubCategories(req, res, next) {
        try {
            const tables = ['categories'];
            const joins = [
                // { type: 'inner', table: 'table2', on: 'table1.common_column = table2.common_column' },
                // { type: 'left', table: 'table3', on: 'table1.another_column = table3.another_column' }
            ];
            const conditions = [
                { column: 'categories.parent_id', operator: '!=', value: 0 },
                // { column: 'table2.other_column', operator: '=', value: 'some_value' }
            ];

            // Create a dynamic Query object
            const dynamicQuery = createDynamicQuery(tables, joins, conditions);

            // Call the customQuery method with your dynamic Query object
            CategoryModel.customQuery(dynamicQuery)
                .then((result) => {
                    if (!result.length) return next(new AppError('No category found', STATUS_CODES.NOT_FOUND));
                    return sendResponse(res, STATUS_CODES.OK, 'All Sub categories fetched successfully', result);
                })
                .catch((error) => {
                    return next(
                        new AppError(
                            error.message || 'Internal Server Error',
                            error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                            error.response || error
                        )
                    );
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
}
