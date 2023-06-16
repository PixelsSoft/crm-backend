"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CustomerController_1 = require("../controllers/CustomerController");
var Router = express_1.default.Router();
Router.post("/customers/create", CustomerController_1.createCustomer);
Router.patch("/customers/edit/:id", CustomerController_1.editCustomer);
Router.delete("/customers/delete/:id", CustomerController_1.deleteCustomer);
Router.get("/customers/profile/:id", CustomerController_1.getCustomerDetails);
Router.get("/customers", CustomerController_1.getAllCustomers);
exports.default = Router;
