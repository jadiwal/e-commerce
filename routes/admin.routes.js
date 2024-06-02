import { AdminController } from '../controllers/admin.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

// routes responsible for auth management
export const adminRoutes = (app) => {
  // app
  //   .group("/pos", (router) => {
  //       router
  //         .route("/get-cart-ids")
  //         .get(AdminController.get_cart_ids)
  //   })
  app
    .route("/pos/get-cart-ids")
    .get(AdminController.get_cart_ids)
};
