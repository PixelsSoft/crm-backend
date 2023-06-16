"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var InvoiceController_1 = require("../controllers/InvoiceController");
var Router = express_1.default.Router();
Router.post("/invoices/create", InvoiceController_1.createInvoice);
Router.post("invoices/generate-link/:id", InvoiceController_1.generateInvoiceShareLink);
Router.delete("/invoices/delete/:id", InvoiceController_1.deleteInvoice);
Router.get("/invoices", InvoiceController_1.getAllInvoices);
Router.get("/invoices/details/:id", InvoiceController_1.getInvoiceDetails);
Router.get("/invoices/generate-number", InvoiceController_1.getInvoiceNumber);
exports.default = Router;
