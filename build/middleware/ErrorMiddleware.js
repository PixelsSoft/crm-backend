"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = __importDefault(require("../helpers/Logger"));
var errorMiddleware = function (err, req, res, next) {
    Logger_1.default.error(err);
    Logger_1.default.error("STACK: ", err.stack);
    if (err.name === "ValidationError" && err.errors) {
        var error = Object.values(err.errors)[0].properties.message;
        return res.status(400).json({
            success: false,
            error: error,
        });
    }
    if (err.code === 11000 && err.keyPattern) {
        var key = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            success: false,
            error: "".concat(key, " already exists"),
        });
    }
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    });
};
exports.default = errorMiddleware;
