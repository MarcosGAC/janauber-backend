import express from "express";
import { Auth } from "../auth/auth.js";
import { Passenger } from "../models/passenger.js";

const router = express.Router();
const passengerModel = new Passenger();
const auth = new Auth();

router.post("/login", async (req, res) => {
  /*  
  #swagger.summary = 'POST Log in a User (can be a driver ou a passenger )'
  #swagger.description = 'This endpoint is responsible to Login ALL users.'
  #swagger.parameters['login'] = {
    in: 'body',
    description: 'Login an User',
  } 
  #swagger.security = []
  */
  const { email, password } = req.body; // encrypt password and use JWT

  const { passenger, error } = await passengerModel.findOneByEmail(email);
  // TODO: add login for driver
  const isValidPassword = password === passenger.password;

  if (!isValidPassword) {
    return res.status(401).send();
  }

  const token = auth.encode({ email });

  if (error) return res.status(400).json(error);
  return res.json({
    token,
  });
});
// TODO: register for driver
router.post("/register/passenger", async (req, res) => {
  /*  
  #swagger.summary = 'POST Register Passenger'
  #swagger.description = 'This endpoint is responsible to register a new Passenger.'
  #swagger.parameters['register'] = {
    in: 'body',
    description: 'Login an User',
  } 
  #swagger.security = []
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

  const token = auth.encode({ email });
  return res.json({
    token,
    passenger,
  });
});

export default router;
