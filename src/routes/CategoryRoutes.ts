import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers/CategoryController";
import express from "express";
import { isAuthenticated } from "../middleware/AuthMiddleware";

const Router = express.Router();

Router.get("/categories", isAuthenticated, getAllCategories);
Router.post("/categories/create", isAuthenticated, createCategory);
Router.delete("/categories/delete/:id", isAuthenticated, deleteCategory);

export default Router;
