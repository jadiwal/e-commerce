import { CategoryController } from '../controllers/category.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';
import express from 'express';
const router = express.Router();
// routes responsible for user and blog management

router.get("/get", AuthMiddlewares.checkAuth, CategoryController.getAllCategories)
router.get('/get/:id', AuthMiddlewares.checkAuth, CategoryController.getCategoriesById)
router.post("/create", AuthMiddlewares.checkAuth, CategoryController.createCategory);
router.post('/update/:id', AuthMiddlewares.checkAuth, CategoryController.updateCategory);
router.get("/get_sub_categories", AuthMiddlewares.checkAuth, CategoryController.getAllSubCategories)

export default router;