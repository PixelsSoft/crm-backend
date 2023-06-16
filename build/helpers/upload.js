"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + "-" + (0, uuid_1.v4)();
        cb(null, uniqueSuffix + "-" + file.originalname.replace(" ", "-"));
    },
});
var upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
