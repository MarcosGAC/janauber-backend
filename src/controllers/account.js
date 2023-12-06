import express from "express";
import { Auth } from "../auth/auth.js";
import { Passenger } from "../models/passenger.js";
import { Driver } from "../models/driver.js";

const router = express.Router();
const auth = new Auth();
const passengerModel = new Passenger();
const driverModel = new Driver();

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

  if (!password || !email)
    return res.status(400).json({ message: "Password or Email is missing" });

  const { passenger } = await passengerModel.findOneByEmail(email);
  const { driver } = await driverModel.findOneByEmail(email);
  // TODO: add login for driver
  const isValidPassword =
    password === passenger?.password || driver?.password === password;

  if (!isValidPassword) {
    return res.status(401).send();
  }

  const token = auth.encode({ email });

  delete passenger?.password;
  delete driver?.password;
  return res.json({
    token,
    passenger,
    driver,
  });
});

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

router.post("/register/driver", async (req, res) => {
  /*  
  #swagger.summary = 'POST Register Driver'
  #swagger.description = 'This endpoint is responsible to register a new Driver.'
  #swagger.parameters['register'] = {
    in: 'body',
    description: 'Register a New Driver',
  } 
  #swagger.security = []
  */
  const {
    name,
    email,
    password,
    cpf,
    birthday,
    capacity,
    color,
    plate,
    model,
  } = req.body;
  const { driver, error } = await driverModel.create({
    name,
    email,
    password,
    cpf,
    birthday,
    capacity,
    color,
    plate,
    model,
  });

  if (error) return res.status(400).json(error);

  const token = auth.encode({ email });
  return res.json({
    token,
    driver,
  });
});

export default router;
