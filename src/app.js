import express from "express";
import passenger from "./controllers/passenger.js";
import account from "./controllers/account.js";
import driver from "./controllers/driver.js";
import privateRoute from "./middleware/privateRoute.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/passenger",  passenger);
app.use("/account", account);
app.use("/driver",driver);

// Errors request - Put in a middleware
app.use((req, res, next) => {
  res.status(404).send();
});

app.use((req, res, next) => {
  res.status(err.status || 500).send();
});
