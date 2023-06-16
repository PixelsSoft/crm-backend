import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

//DB
import connectDb from "./config/db";

//middlewares
import errorMiddleware from "./middleware/ErrorMiddleware";

//Routes
import CategoryRoutes from "./routes/CategoryRoutes";
import UsersRoutes from "./routes/UserRoutes";
import RolesRoutes from "./routes/RolesRoute";
import CustomerRoutes from "./routes/CustomerRoutes";
import InvoiceRoutes from "./routes/InvoiceRoutes";

//Configuration
dotenv.config();
const app: Application = express();
const PORT: number = 8001 || process.env.PORT;

app.use(express.json());
app.use(cors());
connectDb();

//Routes
app.use("/api/v1/", CategoryRoutes);
app.use("/api/v1", UsersRoutes);
app.use("/api/v1", RolesRoutes);
app.use("/api/v1", InvoiceRoutes);
app.use("/api/v1", CustomerRoutes);

app.use("/uploads", express.static("uploads"));

//Error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
