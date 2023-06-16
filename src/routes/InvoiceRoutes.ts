import express from "express";
import {
  generateInvoiceShareLink,
  getAllInvoices,
  getInvoiceDetails,
  deleteInvoice,
  createInvoice,
  getInvoiceNumber,
} from "../controllers/InvoiceController";

const Router = express.Router();

Router.post("/invoices/create", createInvoice);
Router.post("invoices/generate-link/:id", generateInvoiceShareLink);
Router.delete("/invoices/delete/:id", deleteInvoice);
Router.get("/invoices", getAllInvoices);
Router.get("/invoices/details/:id", getInvoiceDetails);
Router.get("/invoices/generate-number", getInvoiceNumber);

export default Router;
