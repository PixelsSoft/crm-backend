import express from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
  editUser,
  deleteUser,
  getUserDetails,
} from "../controllers/UserController";
import upload from "../helpers/upload";
import { isAuthenticated } from "../middleware/AuthMiddleware";

const Router = express.Router();

Router.post("/users/create", upload.single("profileImg"), createUser);
Router.post("/users/login", loginUser);

Router.get("/users", isAuthenticated, getAllUsers);
Router.get("/users/profile/:id", isAuthenticated, getUserDetails);

Router.patch(
  "/users/edit/:id",
  isAuthenticated,
  upload.single("profileImg"),
  editUser
);
Router.delete("/users/delete/:id", isAuthenticated, deleteUser);

export default Router;
