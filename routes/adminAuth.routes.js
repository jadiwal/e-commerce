import { AdminAuthController } from '../controllers/adminAuth.contoller.js';
import { ROOT_PATH } from '../helpers/root_path.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

export const adminAuthRoutes = (router, app) => {

    app
        .route(router.route("/"))
        .get(AdminAuthController.indexRedirect)

    app
        .route(router.route("login"))
        .get(AdminAuthController.login)
        .post(AdminAuthController.logInAdmin);

    app
        .route(router.route("index"))
        .get(AdminAuthController.index)
}
