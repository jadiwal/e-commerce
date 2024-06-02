import { OrderController } from '../controllers/order.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

export const orderRoutes = (router, app) => {

    app
        .route(router.route('orderCount'))
        .get(AuthMiddlewares.checkAuth, OrderController.orderCount)

    app
        .route(router.route('orderList/:status'))
        .get(AuthMiddlewares.checkAuth, OrderController.orderList)

    app
        .route(router.route('orderDetails/:order_id'))
        .get(AuthMiddlewares.checkAuth, OrderController.orderDetails)

    app
        .route(router.route('orderInvoice/:order_id'))
        .get(AuthMiddlewares.checkAuth, OrderController.orderInvoice)


    // EJS Render File Start

    app
        .route(router.base_route("saleslist_all"))
        .get(OrderController.saleslist_all)

    app
        .route(router.base_route("saleslist_pending"))
        .get(OrderController.saleslist_pending)

    app
        .route(router.base_route("saleslist_confirmed"))
        .get(OrderController.saleslist_confirmed)

    app
        .route(router.base_route("saleslist_packaging"))
        .get(OrderController.saleslist_packaging)

    app
        .route(router.base_route("saleslist_out_of_delivery"))
        .get(OrderController.saleslist_out_of_delivery)

    app
        .route(router.base_route("saleslist_delivered"))
        .get(OrderController.saleslist_delivered)

    app
        .route(router.base_route("saleslist_returned"))
        .get(OrderController.saleslist_returned)

    app
        .route(router.base_route("saleslist_failed"))
        .get(OrderController.saleslist_failed)

    app
        .route(router.base_route("saleslist_canceled"))
        .get(OrderController.saleslist_canceled)

    app
        .route(router.base_route("salesdetails"))
        .get(OrderController.sales_details)

    // EJS Render File End
}