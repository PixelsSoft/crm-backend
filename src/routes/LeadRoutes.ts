import express from "express";
import {
  getAllLeads,
  deleteLead,
  updateLeadStatus,
  editLeadComments,
  createNewLead,
} from "../controllers/LeadsController";

const Router = express.Router();

Router.post("/leads/create", createNewLead);

Router.get("/leads", getAllLeads);
Router.patch("/leads/status/:id", updateLeadStatus);
Router.patch("/leads/comments/:id", editLeadComments);
Router.delete('/leads/delete/:id', deleteLead)

export default Router;
