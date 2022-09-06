import express from "express";
import usersRoutes from "./routes/users.routes";
import "reflect-metadata";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.use(errorMiddleware);

export default app;
