import express from "express";
import passenger from "./controllers/passenger.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

export const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/passenger", passenger);

// Errors request - Put in a middleware
app.use((req, res, next) => {
  res.status(404).send();
});

app.use((req, res, next) => {
  res.status(err.status || 500).send();
});
