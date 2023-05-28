import express from "express";
import cors from "cors";
import pino from "pino";

import RunController from "./controllers/run/run-controller.js";

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

const cors_options = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(cors_options));
app.use(express.json());

RunController(app, logger);

app.listen(process.env.PORT || 4000);
