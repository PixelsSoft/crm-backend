import express from "express";
import { createUser, loginUser } from "../controllers/UserController";
import upload from "../helpers/upload";

const Router = express.Router();

Router.post("/users/create", upload.single("profileImg"), createUser);
Router.post("/users/login", loginUser);

export default Router;
