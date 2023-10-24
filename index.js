import express from "express";
import user from "./src/controllers/user.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json" assert { type: "json" };

export const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => console.log("running"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/user", user);
