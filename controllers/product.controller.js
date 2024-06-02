import {
    STATUS_CODES,
    adminAuthRequiredFields,
    cookieAttributeForJwtToken
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { AdminAuthService } from '../services/adminAuth.service.js';
import { ProductModel } from '../models/product.model.js';
import fetch from 'node-fetch';
import { json } from 'express';

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

export class ProductController {

    static async addProductbkp(req, res) {
        try {
            let {
                added_by,
                user_id,
                name,
                product_type,
                category_ids,
                category_id,
                sub_category_id,
                sub_sub_category_id,
                brand_id,
                unit,
                min_qty,
                refundable,
                digital_product_type,
                digital_file_ready,
                featured,
                flash_deal,
                video_provider,
                video_url,
                colors,
                variant_product,
                attributes,
                choice_options,
                variation,
                published,
                unit_price,
                purchase_price,
                tax,
                tax_type,
                tax_model,
                discount,
                discount_type,
                current_stock,
                minimum_order_qty,
                details,
                free_shipping,
                attachment,
                status,
                featured_status,
                meta_title,
                meta_description,
                request_status,
                denied_note,
                shipping_cost,
                multiply_qty,
                temp_shipping_cost,
                is_shipping_cost_updated,
                code
            } = req.body;
            let slug = name.replace(/ /g, '-')
            let images = req.files[0].filename;
            let colorImage = req.files[1].filename;
            let thumbnail = req.files[2].filename;
            let meta_image = req.files[3].filename;
            // const addProductResult = await UserModel.addProduct(added_by)
            const addProductbkpResult = await ProductModel.addProductbkp({
                added_by,
                user_id,
                name,
                slug,
                product_type,
                category_ids,
                category_id,
                sub_category_id,
                sub_sub_category_id,
                brand_id,
                unit,
                min_qty,
                refundable,
                digital_product_type,
                digital_file_ready,
                images,
                colorImage,
                thumbnail,
                featured,
                flash_deal,
                video_provider,
                video_url,
                colors,
                variant_product,
                attributes,
                choice_options,
                variation,
                published,
                unit_price,
                purchase_price,
                tax,
                tax_type,
                tax_model,
                discount,
                discount_type,
                current_stock,
                minimum_order_qty,
                details,
                free_shipping,
                attachment,
                status,
                featured_status,
                meta_title,
                meta_description,
                meta_image,
                request_status,
                denied_note,
                shipping_cost,
                multiply_qty,
                temp_shipping_cost,
                is_shipping_cost_updated,
                code
            });
            return sendResponse(res, STATUS_CODES.OK, `successfully`, addProductbkpResult);

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
    static async addProduct(req, res) {
        try {
            let {
                user_id, name, details, category_id, sub_category_id, sub_sub_category_id, brand_id, product_type, code, unit, purchase_price, unit_price, minimum_order_qty, current_stock, discount_type, discount, tax, tax_model, shipping_cost, multiply_qty, colors, variation, attributes, video_url, meta_title, meta_description
            } = req.body;
            let slug = name.replace(/ /g, '-')
            // Check if files were uploaded
            if (!req.files || req.files.length < 4) {
                throw new Error('Four files were expected but not all files were uploaded.');
            }
            let color_image = [];
            if (Array.isArray(req.files.color_image) && req.files.color_image.length > 0) {
                color_image = req.files.color_image.map(file => file.filename);
            }

            let images = [];
            if (Array.isArray(req.files.images) && req.files.images.length > 0) {
                images = req.files.images.map(file => file.filename);
            }

            let thumbnail = [];
            if (Array.isArray(req.files.thumbnail) && req.files.thumbnail.length > 0) {
                thumbnail = req.files.thumbnail.map(file => file.filename);
            }

            let meta_image = [];
            if (Array.isArray(req.files.meta_image) && req.files.meta_image.length > 0) {
                meta_image = req.files.meta_image.map(file => file.filename);
            }
            // let color_image = req.files[0];
            // let images = req.files[1].filename;
            // let thumbnail = req.files[2].filename;
            // let meta_image = req.files[3].filename;

            let cl = JSON.parse(colors)
            let color_images = []
            let imgs = []
            for (let i = 0; i < cl.length; i++) {
                color_images.push({
                    color: cl[i],
                    filename: color_image[i] || null  // Using '|| null' to handle cases where color_imagess array may not have enough elements
                });
            }
            // imgs.push(images)
            // console.log(imgs)
            // let variationobj = JSON.parse(variation)
            let category_ids = JSON.stringify([{ "id": category_id, "position": "1" }, { "id": sub_category_id, "position": "2" }, { "id": sub_sub_category_id, "position": "3" }])

            let color_img = JSON.stringify(color_images)
            let img = JSON.stringify(images)
            const addProductResult = await ProductModel.addProduct({
                user_id,
                name,
                slug,
                product_type,
                category_ids,
                category_id,
                sub_category_id,
                sub_sub_category_id,
                brand_id,
                unit,
                img,
                color_img,
                thumbnail,
                video_url,
                colors,
                attributes,
                variation,
                unit_price,
                purchase_price,
                tax,
                tax_model,
                discount,
                discount_type,
                current_stock,
                minimum_order_qty,
                details,
                meta_title,
                meta_description,
                meta_image,
                shipping_cost,
                multiply_qty,
                code
            });
            return sendResponse(res, STATUS_CODES.OK, `successfully`, addProductResult);

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
    static async updateProduct(req, res) {
        try {
            let {
                name, details, category_id, sub_category_id, sub_sub_category_id, brand_id, product_type, code, unit, purchase_price, unit_price, minimum_order_qty, current_stock, discount_type, discount, tax, tax_model, shipping_cost, multiply_qty, variation, attributes, video_url, meta_title, meta_description
            } = req.body;
            let colors = req.body.colors || ['']
            let slug = name.replace(/ /g, '-')
            const productId = req.query.id;
            // Check if files were uploaded
            let UpdatecolorImage = [];
            let Updateimages = [];
            let Updatethumbnail = [];
            let Updatemeta_image = [];
            let cl = JSON.parse(colors)
            let color_images = []
            let imgs = []
            // Check if files were uploaded
            if (req.files && req.files.UpdatecolorImage) {
                if (Array.isArray(req.files.UpdatecolorImage) && req.files.UpdatecolorImage.length > 0) {
                    UpdatecolorImage = req.files.UpdatecolorImage.map(file => file.filename);
                }
                if (cl.length > 0) {
                    for (let i = 0; i < cl.length; i++) {
                        color_images.push({
                            color: cl[i],
                            filename: UpdatecolorImage[i] || null  // Using '|| null' to handle cases where color_imagess array may not have enough elements
                        });
                    }
                } else {
                    UpdatecolorImage = req.files.UpdatecolorImage.map(file => file.filename);

                }

            }
            // else{
            //     if (req.body.color_image) {
            //         UpdatecolorImage = req.body.color_image;
            //     }
            // }
            if (req.files && req.files.Updateimages) {
                if (Array.isArray(req.files.Updateimages) && req.files.Updateimages.length > 0) {
                    Updateimages = req.files.Updateimages.map(file => file.filename);
                }
            }
            // else{
            //     if (req.body.images) {
            //         Updateimages = req.body.images;
            //     }
            // }
            if (req.files && req.files.Updatethumbnail) {

                if (Array.isArray(req.files.Updatethumbnail) && req.files.Updatethumbnail.length > 0) {
                    Updatethumbnail = req.files.Updatethumbnail.map(file => file.filename);
                }
            }
            // else{
            //     if (req.body.thumbnail) {
            //         Updatethumbnail = req.body.thumbnail;
            //     }
            // }
            if (req.files && req.files.Updatemeta_image) {
                if (Array.isArray(req.files.Updatemeta_image) && req.files.Updatemeta_image.length > 0) {
                    Updatemeta_image = req.files.Updatemeta_image.map(file => file.filename);
                }
            }
            // else{ 
            //     if (req.body.meta_image) {
            //         Updatemeta_image = req.body.meta_image;
            //     }
            // }


            // imgs.push(images)
            // console.log(imgs)
            let category_ids = JSON.stringify([{ "id": category_id, "position": "1" }, { "id": sub_category_id, "position": "2" }, { "id": sub_sub_category_id, "position": "3" }])

            let color_img = JSON.stringify(color_images)
            let img = JSON.stringify(Updateimages)
            const updateProductResult = await ProductModel.updateProduct(productId, {
                UpdatecolorImage,
                name,
                slug,
                product_type,
                category_ids,
                category_id,
                sub_category_id,
                sub_sub_category_id,
                brand_id,
                unit,
                img,
                color_img,
                Updatethumbnail,
                video_url,
                colors,
                attributes,
                variation,
                unit_price,
                purchase_price,
                tax,
                tax_model,
                discount,
                discount_type,
                current_stock,
                minimum_order_qty,
                details,
                meta_title,
                meta_description,
                Updatemeta_image,
                shipping_cost,
                multiply_qty,
                code
            });
            return sendResponse(res, STATUS_CODES.OK, `successfully`, updateProductResult);

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


    // static async updateProduct(req, res) {
    //     try {
    //         // Extract parameters from request body
    //         const { productId } = req.params;
    //         const updatedFields = req.body;
    //         const { files } = req;

    //         // Extract filenames of updated images
    //         let Updateimages = '';
    //         let UpdatecolorImage = '';
    //         let Updatethumbnail = '';
    //         let Updatemeta_image = '';
    //         const filenames = files.map(file => file.filename);
    //         const objectsWithFilenames = body.color_image.map((obj, index) => {
    //             return { ...obj, filename: filenames[index] };
    //         });

    //         console.log(objectsWithFilenames)
    //         // if (files.length >= 1) {
    //         //     Updateimages = files[0].filename;
    //         // }
    //         // if (files.length >= 2) {
    //         //     UpdatecolorImage = files[1].filename;
    //         // }
    //         // if (files.length >= 3) {
    //         //     Updatethumbnail = files[2].filename;
    //         // }
    //         // if (files.length >= 4) {
    //         //     Updatemeta_image = files[3].filename;
    //         // }

    //         // Call model method to update product
    //         const updateProductResult = await ProductModel.updateProduct(productId, {
    //             updatedFields,
    //             Updateimages,
    //             UpdatecolorImage,
    //             Updatethumbnail,
    //             Updatemeta_image
    //         });

    //         // Return response
    //         return sendResponse(res, STATUS_CODES.OK, 'Product updated successfully', updateProductResult);
    //     } catch (error) {
    //         return new AppError(
    //             error.message || 'Internal Server Error',
    //             error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
    //             error.response || error
    //         );
    //     }
    // }

    static async units(req, res) {
        try {
            let id = req.query
            // Call model method to update product
            const unitsResult = await ProductModel.units();

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'All Brands Data Fetched successfully', unitsResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async deleteProductfetch(req, res) {
        try {
            // Call model method to update product
            const deleteProductfetchResult = await ProductModel.deleteProductfetch();

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'All Deleted Data Fetched successfully', deleteProductfetchResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async limitedStockData(req, res) {
        try {
            // Call model method to update product
            const limitedStockDataResult = await ProductModel.limitedStockData();

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'All Limited Stock Data Fetched successfully', limitedStockDataResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async limitedStockDataByID(req, res) {
        try {

            let id = req.query.id;
            // Call model method to update product
            const limitedStockDataByIDResult = await ProductModel.limitedStockDataByID(id);

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'All Limited Stock Data Fetched By ID Successfully', limitedStockDataByIDResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async limitedStockDataUpdate(req, res) {
        try {

            let id = req.query.id;
            let { variation, current_stock } = req.body;
            let variationProduct = JSON.stringify(variation)
            // Call model method to update product
            const limitedStockDataUpdateResult = await ProductModel.limitedStockDataUpdate(id, variationProduct, current_stock);

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'All Limited Stock Data Updated Successfully', limitedStockDataUpdateResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    // static async colorImgDelete(req, res) {
    //     try {

    //         let id = req.query.id;
    //         let index = req.body.index;
    //         let filePath = req.body.path;

    //         const currentFilePath = fileURLToPath(import.meta.url);
    //         const currentDirectoryPath = path.dirname(currentFilePath);
    //         const parentDirectoryPath = path.resolve(currentDirectoryPath, '..', 'public');

    //         let fullPath = path.join(parentDirectoryPath, filePath);
    //         // if (fs.existsSync(fullPath)) {
    //         //     fs.unlinkSync(fullPath);
    //             // Call model method to update product
    //             const colorImgDeleteResult = await ProductModel.colorImgDelete(id, index);

    //             // Return response
    //             return sendResponse(res, STATUS_CODES.OK, 'Color Image Deleted Successfully', colorImgDeleteResult);
    //         // }
    //         // else {
    //         //     throw new Error('File not found.');
    //         // }
    //     } catch (error) {
    //         return new AppError(
    //             error.message || 'Internal Server Error',
    //             error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
    //             error.response || error
    //         );
    //     }
    // }

    static async colorImgDelete(req, res) {
        try {
            let id = req.query.id;
            let index = req.body.index;
            let filePath = req.body.path;
    
            const currentFilePath = fileURLToPath(import.meta.url);
            const currentDirectoryPath = path.dirname(currentFilePath);
            const parentDirectoryPath = path.resolve(currentDirectoryPath, '..', 'public');
    
            let fullPath = path.join(parentDirectoryPath, filePath);
    
            // Check if the file exists
            let fileExists;
            try {
                await fs.promises.stat(fullPath);
                fileExists = true;
            } catch (error) {
                if (error.code === 'ENOENT') {
                    // File does not exist
                    fileExists = false;
                } else {
                    // Other error occurred
                    throw error;
                }
            }
    
            // Continue with file deletion or other operations based on file existence
            if (fileExists) {
                // Delete the file from the filesystem
                await fs.promises.unlink(fullPath);
    
                // Call model method to update product
                const colorImgDeleteResult = await ProductModel.colorImgDelete(id, index);
    
                // Return response
                return sendResponse(res, STATUS_CODES.OK, 'Color Image Deleted Successfully', colorImgDeleteResult);
            } else {
                throw new Error('File not found.');
            }
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }

    static async restoreProduct(req, res) {
        try {
            let { is_active } = req.body;
            let id = req.query.id;

            let restoreProductResult = await ProductModel.restoreProduct({ id, is_active })

            return sendResponse(res, STATUS_CODES.OK, `successfully`, restoreProductResult);

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

    static async brands(req, res) {
        try {

            // Call model method to update product
            const brandsResult = await ProductModel.brands();

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Product updated successfully', brandsResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async colors(req, res) {
        try {

            // Call model method to update product
            const colorsResult = await ProductModel.colors();

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Product updated successfully', colorsResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async productDetailByID(req, res) {
        try {
            let id = req.query.id;

            const productDetailByIDResult = await ProductModel.productDetailByID(id);

            return sendResponse(res, STATUS_CODES.OK, 'Product updated successfully', productDetailByIDResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async productDelete(req, res) {
        try {
            let id = req.query.id;
            let is_active = req.body.is_active
            const productDeleteResult = await ProductModel.productDelete(id, is_active);

            return sendResponse(res, STATUS_CODES.OK, 'Product updated successfully', productDeleteResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async productList(req, res) {
        try {
            let { brand_id, category_id, sub_category_id, sub_sub_category_id } = req.body;
            // Call model method to update product
            const productListResult = await ProductModel.productList(brand_id, category_id, sub_category_id, sub_sub_category_id);

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Product List Fetched successfully', productListResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async productListShow(req, res) {
        try {
            let { brand_id, category_id, sub_category_id, sub_sub_category_id } = req.body;
            // Call model method to update product
            const productListShowtResult = await ProductModel.productListShow(brand_id, category_id, sub_category_id, sub_sub_category_id);

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Product List Filter Fetched successfully', productListShowtResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async filterProductList(req, res) {
        try {
            let { brand_id, category_id, sub_category_id, sub_sub_category_id } = req.body;
            // Call model method to update product
            const filterProductListResult = await ProductModel.filterProductList({ brand_id, category_id, sub_category_id, sub_sub_category_id });

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Filter Product List Fetched successfully', filterProductListResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async featuredStatusUpdate(req, res) {
        try {
            let id = req.query.id;
            let status = req.body.status;
            // Call model method to update product
            const featuredStatusUpdateResult = await ProductModel.featuredStatusUpdate({ id, status });

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Product Featured Status Updated successfully', featuredStatusUpdateResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }

    static async activeStatusUpdate(req, res) {
        try {
            let id = req.query.id;
            let status = req.body.status;
            // Call model method to update product
            const activeStatusUpdateResult = await ProductModel.activeStatusUpdate({ id, status });

            // Return response
            return sendResponse(res, STATUS_CODES.OK, 'Product Featured Status Updated successfully', activeStatusUpdateResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }
    static async productDetails(req, res) {
        try {
            let id = req.query.id;
            const productDetailsResult = await ProductModel.productDetails({ id });

            return sendResponse(res, STATUS_CODES.OK, 'Product Details Fetched Successfully!', productDetailsResult);
        } catch (error) {
            return new AppError(
                error.message || 'Internal Server Error',
                error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
                error.response || error
            );
        }
    }

    static productlist(req, res, next) {
        // res.render('product/productlist', { url: env.url });
        const fetchCategoryList = fetch(`${env.url}category/categoryList`, {
            method: 'GET'
        }).then(res => res.json());

        const fetchSubCategoryList = fetch(`${env.url}category/subCategoryList`, {
            method: 'GET'
        }).then(res => res.json());

        const fetchSubSubCategoryList = fetch(`${env.url}category/subSubCategoryList`, {
            method: 'GET'
        }).then(res => res.json());

        const fetchProductList = fetch(`${env.url}product/productList`, {
            method: 'GET'
        }).then(res => res.json());
        const fetchDeleteProduct = fetch(`${env.url}product/deleteProductfetch`, {
            method: 'GET'
        }).then(res => res.json());

        Promise.all([fetchCategoryList, fetchSubCategoryList, fetchSubSubCategoryList, fetchProductList, fetchDeleteProduct])
            .then(([categoryResult, subCategoryResult, subSubCategoryResult, productListResult, deleteProductResult]) => {
                const categoryData = categoryResult.data;
                const subCategoryData = subCategoryResult.data;
                const subSubData = subSubCategoryResult.data;
                const productListData = productListResult.data;
                const deleteProductResult1 = deleteProductResult.data;
                // console.log(productListData);
                res.render('product/productlist', { url: env.url, categoryData, subCategoryData, subSubData, productListData, deleteProductResult1 });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('An error occurred while fetching data');
            });
    }

    static addproductRender(req, res, next) {
        fetch(`${env.url}product/units`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((result) => {
                fetch(`${env.url}product/colors`, {
                    method: 'GET'
                })
                    .then(res1 => res1.json())
                    .then((result1) => {
                        fetch(`${env.url}category/categoryList`, {
                            method: 'GET'
                        })
                            .then(res1 => res1.json())
                            .then((result2) => {
                                fetch(`${env.url}product/brands`, {
                                    method: 'GET'
                                })
                                    .then(res1 => res1.json())
                                    .then((result3) => {
                                        let data = result.data;
                                        let colors = result1.data;
                                        let category = result2.data;
                                        let brands = result3.data;
                                        res.render('product/addproduct', { url: env.url, data: data, colors: colors, category: category, brands: brands });
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                                // let data = result.data;
                                // let colors = result1.data;
                                // let category = result2.data;
                                // res.render('product/addproduct', { url: env.url, data: data, colors: colors, category: category });
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    static productlistedit(req, res, next) {
        let id = req.query.id;
        fetch(`${env.url}product/productDetailByID?id=${id}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then((result0) => {
                fetch(`${env.url}product/units`, {
                    method: 'GET'
                })
                    .then(res => res.json())
                    .then((result) => {
                        fetch(`${env.url}product/colors`, {
                            method: 'GET'
                        })
                            .then(res1 => res1.json())
                            .then((result1) => {
                                fetch(`${env.url}category/categoryList`, {
                                    method: 'GET'
                                })
                                    .then(res1 => res1.json())
                                    .then((result2) => {
                                        fetch(`${env.url}product/brands`, {
                                            method: 'GET'
                                        })
                                            .then(res1 => res1.json())
                                            .then((result3) => {
                                                let data0 = result0.data;
                                                let data = result.data;
                                                let colors = result1.data;
                                                let category = result2.data;
                                                let brands = result3.data;
                                                res.render('product/productlistedit', { url: env.url, data0: data0, data: data, colors: colors, category: category, brands: brands });
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    static barcode(req, res, next) {
        let id = req.query.id;
        fetch(`${env.url}product/productDetailByID?id=${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((data) => {
                res.render('product/barcode', { url: env.url, data: data.data });
            })
            .catch((err) => {
                console.log(err)
            })

    }
    static productDetails(req, res, next) {
        let id = req.query.id;
        fetch(`${env.url}product/productDetailByID?id=${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((data) => {

                res.render('product/productDetails', { url: env.url, data: data.data });
            })
            .catch((err) => {
                console.log(err)
            })
    }



    // PRODUCT ATTRIBUTES 

    // static productAttributesRender(req, res) {
    //     try {
    //         res.render('product/product_attributes');
    //     } catch (error) {
    //         return (
    //             new AppError(
    //                 error.message || 'Internal Server Error',
    //                 error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
    //                 error.response || error
    //             )
    //         );
    //     }
    // }
    static limitedStock(req, res) {
        try {
            fetch(`${env.url}product/limitedStockData`, {
                method: "GET"
            })
                .then(res => res.json())
                .then((data) => {
                    let limitedStockData = data.data
                    res.render('product/limitedStock', { url: env.url, limitedStockData: limitedStockData });
                })
                .catch((err) => {
                    console.log(err)
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
    static bulkImport(req, res) {
        try {
            res.render('product/bulk_import');
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