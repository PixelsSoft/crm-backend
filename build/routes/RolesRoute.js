"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RolesController_1 = require("../controllers/RolesController");
var Router = express_1.default.Router();
Router.post("/roles/create", RolesController_1.createRole);
Router.get("/roles", RolesController_1.getAllRoles);
Router.delete("/roles/delete/:id", RolesController_1.deleteRole);
exports.default = Router;
