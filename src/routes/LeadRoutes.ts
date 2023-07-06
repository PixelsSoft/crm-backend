import express from "express";
import {
  getAllLeads,
  deleteLead,
  updateLeadStatus,
  editLeadComments,
  createNewLead,
} from "../controllers/LeadsController";
import { isAuthenticated } from "../middleware/AuthMiddleware";

const Router = express.Router();

Router.post("/leads/create", isAuthenticated, createNewLead);
Router.get("/leads", isAuthenticated, getAllLeads);
Router.patch("/leads/status/:id", isAuthenticated, updateLeadStatus);
Router.patch("/leads/comments/:id", isAuthenticated, editLeadComments);
Router.delete("/leads/delete/:id", isAuthenticated, deleteLead);

export default Router;
