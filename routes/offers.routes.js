// import { AdminAuthController } from '../controllers/adminAuth.controller.js';
import { OffersController } from '../controllers/offers.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';
import FileUploader from '../helpers/multer.js';
import { ROOT_PATH } from '../helpers/root_path.js';

const fileUploader = new FileUploader();

/**
 * 
 * @param {ROOT_PATH} router 
 * @param {Express} app 
 */
export const offersRoutes = (router, app) => {

    app
        .route(router.route("coupon"))
        .post(AuthMiddlewares.checkAuth, OffersController.addCoupon);

    app
        .route(router.route("couponList/:coupon_type"))
        .get(AuthMiddlewares.checkAuth, OffersController.couponList);

    app
        .route(router.route("flashDeal"))
        .post(AuthMiddlewares.checkAuth, fileUploader.upload.any(), OffersController.flashDeal);

    app
        .route(router.route("flashDealUpdate/:id"))
        .post(AuthMiddlewares.checkAuth, fileUploader.upload.any(), OffersController.flasDealUpdate);

    app
        .route(router.route("flashDealTable"))
        .get(AuthMiddlewares.checkAuth, OffersController.flashDealTable);

    app
        .route(router.route("flashDealUpdateData"))
        .get(AuthMiddlewares.checkAuth, OffersController.flashDealUpdateData);

    app
        .route(router.route("flashDealTableUpdate/:id"))
        .post(AuthMiddlewares.checkAuth, OffersController.flashDealTableUpdate);

    app
        .route(router.route("flashDealAddProduct"))
        .post(AuthMiddlewares.checkAuth, OffersController.flashDealAddProduct);

    app
        .route(router.route("flashDealProductTable/:id"))
        .get(AuthMiddlewares.checkAuth, OffersController.flashDealProductTable);

    app
        .route(router.route("dealOfTheDay"))
        .post(AuthMiddlewares.checkAuth, OffersController.dealOfTheDay);

    app
        .route(router.route("dealOfTheDayTable"))
        .get(AuthMiddlewares.checkAuth, OffersController.dealOfTheDayTable);

    app
        .route(router.route("dealOfTheDayTableUpdate/:id"))
        .post(AuthMiddlewares.checkAuth, OffersController.dealOfTheDayTableUpdate);

    app
        .route(router.route("dealOfTheDayUpdate/:id"))
        .post(AuthMiddlewares.checkAuth, OffersController.dealOfTheDayUpdate);

    app
        .route(router.base_route("coupon"))
        .get(AuthMiddlewares.checkAuth, OffersController.couponRender)

    app
        .route(router.base_route("flash"))
        .get(OffersController.flashRender)

    app
        .route(router.base_route("dealoftheday"))
        .get(OffersController.dealOfTheDayRender)

    app
        .route(router.base_route("flashedit"))
        .get(OffersController.flasheditRender)

    app
        .route(router.base_route("flashproduct"))
        .get(OffersController.flashaddproductRender)

}