"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CategoryController_1 = require("../controllers/CategoryController");
var express_1 = __importDefault(require("express"));
var AuthMiddleware_1 = require("../middleware/AuthMiddleware");
var Router = express_1.default.Router();
Router.get("/categories", AuthMiddleware_1.isAuthenticated, CategoryController_1.getAllCategories);
Router.post("/categories/create", AuthMiddleware_1.isAuthenticated, CategoryController_1.createCategory);
Router.delete("/categories/delete/:id", AuthMiddleware_1.isAuthenticated, CategoryController_1.deleteCategory);
exports.default = Router;
