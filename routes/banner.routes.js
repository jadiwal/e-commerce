import { BannerController } from '../controllers/banner.controller.js';
import { ROOT_PATH } from '../helpers/root_path.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

/**
 * 
 * @param {ROOT_PATH} router 
 * @param {Express} app 
 */
export const bannerRoutes = (router,app) => {    
    app
        .route(router.route('get'))
        .get(AuthMiddlewares.checkAuth, BannerController.getAllBanners);

    app
        .route(router.route('get/:id'))
        .get(AuthMiddlewares.checkAuth, BannerController.getBannerById);

    app
        .route(router.route('create'))
        .post(AuthMiddlewares.checkAuth, BannerController.createBanner);

    app
        .route(router.route('update/:id'))

    // router.get(`${route}get`, AuthMiddlewares.checkAuth, BannerController.getAllBanners)
    // router.get('/get/:id', AuthMiddlewares.checkAuth, BannerController.getBannerById)
    // router.post("/create", AuthMiddlewares.checkAuth, BannerController.createBanner);
    // router.post('/update/:id', AuthMiddlewares.checkAuth, BannerController.updateBanner);
}

export default router;