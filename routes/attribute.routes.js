import { AttributeController } from '../controllers/attribute.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';
import { ROOT_PATH } from '../helpers/root_path.js';

/**
 * 
 * @param {ROOT_PATH} router 
 * @param {Express} app 
 */

export const attributeRoutes = (router, app)=>{

    app
    .route(router.route("insertAttr"))
    .post(AuthMiddlewares.checkAuth, AttributeController.insertAttr);

    app
    .route(router.route("fetchAttr"))
    .get(AuthMiddlewares.checkAuth, AttributeController.fetchAttr);

    app
    .route(router.route("deleteAttr"))
    .post(AuthMiddlewares.checkAuth, AttributeController.deleteAttr)

    app
    .route(router.route("fetchAttrId"))
    .get(AuthMiddlewares.checkAuth, AttributeController.fetchAttrId)

    app
    .route(router.route("updateAttr"))
    .post(AuthMiddlewares.checkAuth, AttributeController.updateAttr)


    // EJS Routes Start
    app
    .route(router.base_route("product_attributes"))
    .get(AttributeController.productAttributesRender)

   
}