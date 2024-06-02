// import { AdminAuthController } from '../controllers/adminAuth.controller.js';
import FileUploader from '../helpers/multer.js';
import { VendorController } from '../controllers/vendor.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';
import { ROOT_PATH } from '../helpers/root_path.js';

const fileUploader = new FileUploader();

/**
 * 
 * @param {ROOT_PATH} router 
 * @param {Express} app 
 */
export const vendorRoutes = (router, app) => {
 
    app
    .route(router.base_route('vendorAdd'))
    .get(VendorController.vendorAdd)
        
    app
    .route(router.base_route('vendorList'))
    .get(VendorController.vendorList)
        
}