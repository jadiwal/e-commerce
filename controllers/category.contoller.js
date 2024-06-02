import {
    STATUS_CODES,
    adminAuthRequiredFields
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { AdminAuthService } from '../services/adminAuth.service.js';
import fetch from 'node-fetch';
import { categoryModel } from '../models/category.modal.js';
// const express = require('express');

export class categoryController {
    static async categoryList(req, res) {
        try {

            let categoryListResult = await categoryModel.categoryList()

            return sendResponse(res, STATUS_CODES.OK, `successfully`, categoryListResult);

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
    static async subCategoryList(req, res) {
        try {

            let subCategoryListResult = await categoryModel.subCategoryList()

            return sendResponse(res, STATUS_CODES.OK, `successfully`, subCategoryListResult);

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
    static async subSubCategoryList(req, res) {
        try {

            let subSubCategoryListResult = await categoryModel.subSubCategoryList()

            return sendResponse(res, STATUS_CODES.OK, `successfully`, subSubCategoryListResult);

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
    static async restoreCategoryList(req, res) {
        try {

            let restoreCategoryListResult = await categoryModel.restoreCategoryList()

            return sendResponse(res, STATUS_CODES.OK, `successfully`, restoreCategoryListResult);

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
    static async categoryAdd(req, res) {
        try {
            let { name, priority } = req.body;
            let img = req.files[0].filename;

            let slug = name.replace(/ /g, '-')
            let categoryAddResult = await categoryModel.categoryAdd({ name, priority, img, slug })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, categoryAddResult);

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
    static async subCategory(req, res) {
        try {
            let { name, priority, parent_id } = req.body;

            let slug = name.replace(/ /g, '-')
            let subCategoryResult = await categoryModel.subCategory({ name, priority, parent_id, slug })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, subCategoryResult);

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
    static async subSubCategory(req, res) {
        try {
            let { name, priority, parent_id } = req.body;

            let slug = name.replace(/ /g, '-')
            let subSubCategoryResult = await categoryModel.subSubCategory({ name, priority, parent_id, slug })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, subSubCategoryResult);

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
    static async categoryUpdate(req, res) {
        try {
            let { name, priority, image } = req.body;
            // let img =  req.files[0].filename;
            let id = req.query.id;

            let slug = name.replace(/ /g, '-')
            let categoryUpdateResult;
            if (req.files && req.files.length !== 0) {
                let image = req.files[0].filename;
                categoryUpdateResult = await categoryModel.categoryUpdate({ id, name, priority, image, slug })
            } else {
                categoryUpdateResult = await categoryModel.categoryUpdate({ id, name, priority, image, slug })
            }

            return sendResponse(res, STATUS_CODES.OK, `successfully`, categoryUpdateResult);

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
    static async subCategoryUpdate(req, res) {
        try {
            let { name, priority } = req.body;
            let id = req.query.id;

            let slug = name.replace(/ /g, '-')
            let subCategoryUpdateResult = await categoryModel.subCategoryUpdate({ id, name, priority, slug })


            return sendResponse(res, STATUS_CODES.OK, `successfully`, subCategoryUpdateResult);

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

    static async subSubCategoryUpdate(req, res) {
        try {
            let { name, priority } = req.body;
            let id = req.query.id;

            let slug = name.replace(/ /g, '-')
            let subSubCategoryUpdateResult = await categoryModel.subSubCategoryUpdate({ id, name, priority, slug })


            return sendResponse(res, STATUS_CODES.OK, `successfully`, subSubCategoryUpdateResult);

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
    static async categoryHomeStatusUpdate(req, res) {
        try {
            let { status } = req.body;
            let id = req.query.id;
            let categoryHomeStatusUpdateResult = await categoryModel.categoryHomeStatusUpdate({ status, id })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, categoryHomeStatusUpdateResult);

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
    static async categoryEditData(req, res) {
        try {
            let id = req.query.id;

            let categoryEditResult = await categoryModel.categoryEditData({ id })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, categoryEditResult);

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
    static async categoryDropdown(req, res) {
        try {
            let id = req.query.id;

            let categoryDropdownResult = await categoryModel.categoryDropdown({ id })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, categoryDropdownResult);

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
    static async categoryDefault(req, res) {
        try {
            let id = req.query.id;

            let categoryDefaultResult = await categoryModel.categoryDefault({ id })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, categoryDefaultResult);

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
    static async categoryDelete(req, res) {
        try {
            let { is_active } = req.body;
            let id = req.query.id;

            let categoryDeleteResult = await categoryModel.categoryDelete({ id, is_active })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, categoryDeleteResult);

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


    // EJS START

    static categoryListRender(req, res, next) {
        fetch(`${env.url}category/categoryList`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((result) => {
                let data = result.data;
                console.log(data);

                // Ek aur fetch request
                fetch(`${env.url}category/restoreCategoryList`, {
                    method: 'GET'
                })
                    .then(res => res.json())
                    .then((data1) => {
                        let deleteData = data1.data;
                        console.log(deleteData);

                        // Rendering with both sets of data
                        res.render('category/addcategory', { url: env.url, data: data, deleteData: deleteData });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    static categoryListEditRender(req, res, next) {
        let id = req.query.id
        fetch(`${env.url}category/categoryEditData?id=${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((result) => {
                let data = result.data;
                console.log(data)
                res.render('category/categorylistedit', { url: env.url, data: data });
            })
            .catch((err) => {
                console.log(err)
            })
    }

    static subCategoryRender(req, res, next) {
        const fetchCategoryList = fetch(`${env.url}category/categoryList`, {
            method: 'GET'
        }).then(res => res.json());

        const fetchSubCategoryList = fetch(`${env.url}category/subCategoryList`, {
            method: 'GET'
        }).then(res => res.json());

        const fetchDeleteSubCategoryList = fetch(`${env.url}category/restoreCategoryList`, {
            method: 'GET'
        }).then(res => res.json());

        Promise.all([fetchCategoryList, fetchSubCategoryList, fetchDeleteSubCategoryList])
            .then(([categoryResult, subCategoryResult ,deleteSubCategoryResult]) => {
                const categoryData = categoryResult.data;
                const subCategoryData = subCategoryResult.data;
                const deleteData = deleteSubCategoryResult.data
                // console.log(categoryData);
                console.log(subCategoryData);
                res.render('category/subcategory', { url: env.url, categoryData, subCategoryData, deleteData });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('An error occurred while fetching data');
            });
    }

    static subsubCategoryRender(req, res, next) {
        const fetchCategoryList = fetch(`${env.url}category/categoryList`, {
            method: 'GET'
        }).then(res => res.json());

        const fetchSubSubCategoryList = fetch(`${env.url}category/subSubCategoryList`, {
            method: 'GET'
        }).then(res => res.json());

        const fetchDeleteSubCategoryList = fetch(`${env.url}category/restoreCategoryList`, {
            method: 'GET'
        }).then(res => res.json());

        Promise.all([fetchCategoryList, fetchSubSubCategoryList, fetchDeleteSubCategoryList])
            .then(([categoryResult, subSubCategoryResult,deleteSubCategoryResult]) => {
                const categoryData = categoryResult.data;
                const subSubCategoryData = subSubCategoryResult.data;
                const deleteData = deleteSubCategoryResult.data
                // console.log(categoryData);
                console.log(subSubCategoryData);
                res.render('category/subsubcategory', { url: env.url, categoryData, subSubCategoryData ,deleteData});
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('An error occurred while fetching data');
            });
    }

    static subcategoryEditRender(req, res, next) {
        let id = req.query.id;
        fetch(`${env.url}category/categoryEditData?id=${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((result) => {
                let data = result.data;
                console.log(data)
                res.render('category/subcategoryedit', { url: env.url, data: data });
            })
            .catch((err) => {
                console.log(err)
            })
    }

    static subsubcategoryEditRender(req, res, next) {
        let id = req.query.id;
        fetch(`${env.url}category/categoryEditData?id=${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((result) => {
                let data = result.data;
                console.log(data)
                res.render('category/subsubcategoryedit', { url: env.url, data: data });
            })
            .catch((err) => {
                console.log(err)
            })
    }


}