import { CustomersController } from '../controllers/customers.contoller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';




export const customersRoutes = (router,app) => {

    app
    .route(router.route('customersList'))
    .get(AuthMiddlewares.checkAuth, CustomersController.customersList)

    app
    .route(router.route('customersDetails'))
    .get(AuthMiddlewares.checkAuth, CustomersController.customersDetails)

    app
    .route(router.route('customerStatus'))
    .post(AuthMiddlewares.checkAuth, CustomersController.customerStatus)

    app
    .route(router.route('customersReviews'))
    .get(AuthMiddlewares.checkAuth, CustomersController.customersReviews)

    app
    .route(router.route('customerReviewStatusUpdate'))
    .post(AuthMiddlewares.checkAuth, CustomersController.customerReviewStatusUpdate)

    app
    .route(router.route('walletTable'))
    .get(AuthMiddlewares.checkAuth, CustomersController.walletTable)

    app
    .route(router.route('customerDelete'))
    .post(AuthMiddlewares.checkAuth, CustomersController.customerDelete)

    // EJS Render File Start

    app
    .route(router.base_route("customer-list"))
    .get(CustomersController.customerList)

    app
    .route(router.base_route("customer-view"))
    .get(CustomersController.customerView)

    app
    .route(router.base_route("customerreview"))
    .get(CustomersController.customerReviewRender)

    // EJS Render File End
}