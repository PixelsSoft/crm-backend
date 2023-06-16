import express from "express";
import {
  getCustomerDetails,
  createCustomer,
  deleteCustomer,
  editCustomer,
  getAllCustomers,
} from "../controllers/CustomerController";

const Router = express.Router();

Router.post("/customers/create", createCustomer);
Router.patch("/customers/edit/:id", editCustomer);
Router.delete("/customers/delete/:id", deleteCustomer);
Router.get("/customers/profile/:id", getCustomerDetails);
Router.get("/customers", getAllCustomers);
export default Router;
