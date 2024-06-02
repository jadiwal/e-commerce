// import { AdminAuthController } from '../controllers/adminAuth.controller.js';
import FileUploader from '../helpers/multer.js';
import { ProductController } from '../controllers/product.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';
import { ROOT_PATH } from '../helpers/root_path.js';

const fileUploader = new FileUploader();

/**
 * 
 * @param {ROOT_PATH} router 
 * @param {Express} app 
 */
export const productRoutes = (router, app) => {

    // New Start
    app
    .route(router.route("productList"))
    .get(AuthMiddlewares.checkAuth, ProductController.productList);

    app
    .route(router.route("productListShow"))
    .post(AuthMiddlewares.checkAuth, ProductController.productListShow);

    app
    .route(router.route("filterProductList"))
    .post(AuthMiddlewares.checkAuth, ProductController.filterProductList);

    app
    .route(router.route("featuredStatusUpdate"))
    .post(AuthMiddlewares.checkAuth, ProductController.featuredStatusUpdate);

    app
    .route(router.route("activeStatusUpdate"))
    .post(AuthMiddlewares.checkAuth, ProductController.activeStatusUpdate);

    app
    .route(router.route("productDetails"))
    .get(AuthMiddlewares.checkAuth, ProductController.productDetails);

    app
        .route(router.route("addProduct"))
        .post(AuthMiddlewares.checkAuth, fileUploader.upload.fields([
            { name: 'color_image', maxCount: 20 }, 
            { name: 'images', maxCount: 20 }, 
            { name: 'thumbnail', maxCount: 20 },
            { name: 'meta_image', maxCount: 20 }
            // Add more fields as needed
        ]), ProductController.addProduct);

    app
        .route(router.route("brands"))
        .get(AuthMiddlewares.checkAuth, ProductController.brands);

    app
        .route(router.route("colors"))
        .get(AuthMiddlewares.checkAuth, ProductController.colors);

    app
        .route(router.route("productDetailByID"))
        .get(AuthMiddlewares.checkAuth, ProductController.productDetailByID);

    app
        .route(router.route("productDelete"))
        .post(AuthMiddlewares.checkAuth, ProductController.productDelete);
    // New End
    app
        .route(router.route("addProductbkp"))
        .post(AuthMiddlewares.checkAuth, fileUploader.upload.array('color_image', 5), ProductController.addProductbkp);
    
    
    app
        .route(router.route("updateProduct"))
        .post(AuthMiddlewares.checkAuth, fileUploader.upload.fields([
            { name: 'UpdatecolorImage', maxCount: 20 }, 
            { name: 'Updateimages', maxCount: 20 }, 
            { name: 'Updatethumbnail', maxCount: 20 },
            { name: 'Updatemeta_image', maxCount: 20 }
        ]), ProductController.updateProduct);
    
    app
        .route(router.route("units"))
        .get(AuthMiddlewares.checkAuth, ProductController.units);

    app
        .route(router.route("deleteProductfetch"))
        .get(AuthMiddlewares.checkAuth, ProductController.deleteProductfetch);

    app
        .route(router.route("limitedStockData"))
        .get(AuthMiddlewares.checkAuth, ProductController.limitedStockData);

    app
        .route(router.route("limitedStockDataByID"))
        .get(AuthMiddlewares.checkAuth, ProductController.limitedStockDataByID);

    app
        .route(router.route("limitedStockDataUpdate"))
        .post(AuthMiddlewares.checkAuth, ProductController.limitedStockDataUpdate);

    app
        .route(router.route("colorImgDelete"))
        .post(AuthMiddlewares.checkAuth, ProductController.colorImgDelete);

    // app
    //     .route(router.route("restoreProduct"))
    //     .post(AuthMiddlewares.checkAuth, ProductController.restoreProduct);

        
    app
    .route(router.base_route("productlist"))
    .get(ProductController.productlist)

    app
    .route(router.base_route("addproduct"))
    .get(ProductController.addproductRender)

    app
    .route(router.base_route("productlistedit"))
    .get(ProductController.productlistedit)

    app
    .route(router.base_route("productDetails"))
    .get(ProductController.productDetails)

    app
    .route(router.base_route("barcode"))
    .get(ProductController.barcode)



    // Product Attributes

    

    app
    .route(router.base_route("limited_stock"))
    .get(ProductController.limitedStock)

    app
    .route(router.base_route("bulk_import"))
    .get(ProductController.bulkImport)
}