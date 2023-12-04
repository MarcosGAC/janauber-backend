import express from "express";
import { Passenger } from "../models/passenger.js";

const router = express.Router();
const passengerModel = new Passenger();

router.get("/:id", async (req, res) => {
  /*  
  #swagger.summary = 'GET one user'
  #swagger.description = 'This endpoint is responsible to get ONE users.'
  #swagger.security = [{
    "apiKeyAuth": []
  }]
  */
  const { passenger, error } = await passengerModel.findOneById(req.params.id);
  if (error) return res.status(400).json(error);
  return res.json(passenger);
});

router.get("/", async (req, res) => {
  /*  
  #swagger.summary = 'GET users'
  #swagger.description = 'This endpoint is responsible to get ALL users.'
  #swagger.security = [{
    "apiKeyAuth": []
  }]
  */
  const { passenger, error } = await passengerModel.getAll();
  if (error) return res.status(400).json(error);
  return res.json(passenger);
});

router.post("/", async (req, res) => {
  /*  
  #swagger.summary = 'POST user'
  #swagger.description = 'This endpoint is responsible to create a new user.'
  #swagger.autoBody = true
  #swagger.parameters['passenger'] = {
            in: 'body',
            description: 'Create New Passenger',
    }
  #swagger.security = [{
    "apiKeyAuth": []
  }] 
  */
  const { name, email, password, cpf, birthday } = req.body;
  const { passenger, error } = await passengerModel.create({
    name,
    email,
    password,
    cpf,
    birthday,
  });

  if (error) return res.status(400).json(error);

  return res.json(passenger);
});

export default router;
