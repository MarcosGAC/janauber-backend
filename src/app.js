import express from "express";
import serverless from "serverless-http";
import user from "./controllers/passenger.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

export const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/user", user);

app.use((req, res, next) => {
  res.status(404).send();
});

app.use((req, res, next) => {
  res.status(err.status || 500).send();
});

export const handler = serverless(app);
