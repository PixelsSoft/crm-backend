import express from "express";
import {
  createRole,
  getAllRoles,
  deleteRole,
} from "../controllers/RolesController";

const Router = express.Router();

Router.post("/roles/create", createRole);
Router.get("/roles", getAllRoles);
Router.delete("/roles/delete/:id", deleteRole);

export default Router;
