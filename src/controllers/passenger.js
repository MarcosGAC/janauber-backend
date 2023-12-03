import express from "express";
import { Passenger } from "../models/passenger.js";

const router = express.Router();
const passenger = new Passenger();

router.get("/:id", async (req, res) => {
  /*  
  #swagger.summary = 'POST user'
  #swagger.description = 'This endpoint is responsible to get ALL users.'
  */
  const { data, error } = await passenger.findOneByEmail(req.params.id);
  if (error) return res.status(400).json(error);
  return res.json(data);
});

router.post("/", async (req, res) => {
  /*  
  #swagger.summary = 'POST user'
  #swagger.description = 'This endpoint is responsible to create a new user.'
  */
  const { name, email, password, cpf, birthday } = req.body;
  const { data, error } = await passenger.createOne({
    name,
    email,
    password,
    cpf,
    birthday,
  });

  if (error) return res.status(400).json(error);

  return res.json(data);
});

export default router;
