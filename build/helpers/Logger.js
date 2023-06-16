"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, printf = winston_1.format.printf;
require("winston-daily-rotate-file");
var customFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
    return "".concat(timestamp, " ").concat(level, ": ").concat(message);
});
var fileRotateTransport = new winston_1.transports.DailyRotateFile({
    filename: "src/logs/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: 5,
});
var logger = (0, winston_1.createLogger)({
    level: "debug",
    format: combine(timestamp(), customFormat),
    transports: [fileRotateTransport, new winston_1.transports.Console()],
});
exports.default = logger;
