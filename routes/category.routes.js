import { AuthMiddlewares } from '../middlewares/auth.middleware.js';
import FileUploader from '../helpers/multer.js';
import { ROOT_PATH } from '../helpers/root_path.js';
import { categoryController } from '../controllers/category.contoller.js';

const fileUploader = new FileUploader();

/**
 * 
 * @param {ROOT_PATH} router 
 * @param {Express} app 
 */
export const categoryRoutes = (router, app) => {

    app
        .route(router.route("categoryList"))
        .get(AuthMiddlewares.checkAuth, categoryController.categoryList);

    app
        .route(router.route("subCategoryList"))
        .get(AuthMiddlewares.checkAuth, categoryController.subCategoryList);

    app
        .route(router.route("subSubCategoryList"))
        .get(AuthMiddlewares.checkAuth, categoryController.subSubCategoryList);

    app
        .route(router.route("categoryAdd"))
        .post(AuthMiddlewares.checkAuth,fileUploader.upload.any(), categoryController.categoryAdd);

    app
        .route(router.route("categoryEditData"))
        .get(AuthMiddlewares.checkAuth, categoryController.categoryEditData);

    app
        .route(router.route("categoryHomeStatusUpdate"))
        .post(AuthMiddlewares.checkAuth, categoryController.categoryHomeStatusUpdate);

    app
        .route(router.route("categoryUpdate"))
        .post(AuthMiddlewares.checkAuth,fileUploader.upload.any(), categoryController.categoryUpdate);

    app
        .route(router.route("subCategoryUpdate"))
        .post(AuthMiddlewares.checkAuth, categoryController.subCategoryUpdate);

    app
        .route(router.route("subSubCategoryUpdate"))
        .post(AuthMiddlewares.checkAuth, categoryController.subSubCategoryUpdate);

    app
        .route(router.route("subCategory"))
        .post(AuthMiddlewares.checkAuth, categoryController.subCategory);

    app
        .route(router.route("subSubCategory"))
        .post(AuthMiddlewares.checkAuth, categoryController.subSubCategory);

    app
        .route(router.route("categoryDropdown"))
        .get(AuthMiddlewares.checkAuth, categoryController.categoryDropdown);

    app
        .route(router.route("categoryDelete"))
        .post(AuthMiddlewares.checkAuth, categoryController.categoryDelete);

    app
        .route(router.route("restoreCategoryList"))
        .get(AuthMiddlewares.checkAuth, categoryController.restoreCategoryList);
    app
        .route(router.route("categoryDefault"))
        .get(AuthMiddlewares.checkAuth, categoryController.categoryDefault);

        






    // EJS Routes Start
    app
        .route(router.base_route("addcategory"))
        .get(categoryController.categoryListRender)

    app
        .route(router.base_route("categoryedit"))
        .get(categoryController.categoryListEditRender)

    app
        .route(router.base_route("subcategory"))
        .get(categoryController.subCategoryRender)

    app
        .route(router.base_route("subsubcategory"))
        .get(categoryController.subsubCategoryRender)

    app
        .route(router.base_route("subcategoryedit"))
        .get(categoryController.subcategoryEditRender)

    app
        .route(router.base_route("subsubcategoryedit"))
        .get(categoryController.subsubcategoryEditRender)
        
}