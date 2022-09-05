import express from "express";
import usersRoutes from "./routes/users.routes";
import "reflect-metadata"
import "express-async-errors"

const app = express();

app.use(express.json());

app.use("/user", usersRoutes);

export default app;
