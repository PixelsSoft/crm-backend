"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var UserController_1 = require("../controllers/UserController");
var upload_1 = __importDefault(require("../helpers/upload"));
var AuthMiddleware_1 = require("../middleware/AuthMiddleware");
var Router = express_1.default.Router();
Router.post("/users/create", upload_1.default.single("profileImg"), UserController_1.createUser);
Router.post("/users/login", UserController_1.loginUser);
Router.get("/users", AuthMiddleware_1.isAuthenticated, UserController_1.getAllUsers);
Router.get("/users/profile/:id", AuthMiddleware_1.isAuthenticated, UserController_1.getUserDetails);
Router.patch("/users/edit/:id", AuthMiddleware_1.isAuthenticated, upload_1.default.single("profileImg"), UserController_1.editUser);
Router.delete("/users/delete/:id", AuthMiddleware_1.isAuthenticated, UserController_1.deleteUser);
exports.default = Router;
