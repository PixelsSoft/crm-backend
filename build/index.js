"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
//DB
var db_1 = __importDefault(require("./config/db"));
//middlewares
var ErrorMiddleware_1 = __importDefault(require("./middleware/ErrorMiddleware"));
//Routes
var CategoryRoutes_1 = __importDefault(require("./routes/CategoryRoutes"));
var UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
var RolesRoute_1 = __importDefault(require("./routes/RolesRoute"));
var CustomerRoutes_1 = __importDefault(require("./routes/CustomerRoutes"));
var InvoiceRoutes_1 = __importDefault(require("./routes/InvoiceRoutes"));
//Configuration
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = 8001 || process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.default)();
//Routes
app.use("/api/v1/", CategoryRoutes_1.default);
app.use("/api/v1", UserRoutes_1.default);
app.use("/api/v1", RolesRoute_1.default);
app.use("/api/v1", InvoiceRoutes_1.default);
app.use("/api/v1", CustomerRoutes_1.default);
app.use("/uploads", express_1.default.static("uploads"));
//Error middleware
app.use(ErrorMiddleware_1.default);
app.listen(PORT, function () {
    console.log("Server running on port: ".concat(PORT));
});
