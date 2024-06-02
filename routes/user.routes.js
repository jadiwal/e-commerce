import { UserController } from '../controllers/user.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

// routes responsible for user and blog management
export const userRoutes = (app) => {
  app
    .route('/blogs')
    .get(UserController.getAllBlogs)
    .post(AuthMiddlewares.checkAuth, UserController.createBlog);

  app
    .route('/blogs/:id')
    .get(UserController.getBlogById)
    .patch(AuthMiddlewares.checkAuth, UserController.updateBlog)
    .delete(AuthMiddlewares.checkAuth, UserController.deleteBlog);

  app
    .route('/users/:id')
    .get(AuthMiddlewares.checkAuth, UserController.getUserById)
    .patch(AuthMiddlewares.checkAuth, UserController.updateUser)
    .delete(AuthMiddlewares.checkAuth, UserController.deleteUser);


  // Added by Deepak J Start
  app.route("/index").get((req, res) => {
    res.render("index")
  });

  app.route("/coupens").get((req, res) => {
    res.render("offers_and_deals/coupens")
  })

  app.route("/salesdetails").get((req, res) => {
    res.render("sales/salesdetails")
  })

  app.route("/categorylist").get((req, res) => {
    res.render("category/categorylist");
  });

  app.route("/categorylistedit").get((req, res) => {
    res.render("category/categorylistedit");
  });

  app.route("/addcategory").get((req, res) => {
    res.render("category/addcategory");
  });

  app.route("/order_invoice").get((req, res) => {
    res.render("order_invoice");
  });
};