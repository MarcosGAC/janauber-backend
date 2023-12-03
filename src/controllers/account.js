import express from "express";
import { Passenger } from "../models/passenger.js";

const router = express.Router();
const passenger = new Passenger();

router.post("/login", async (req, res) => {
  /*  
  #swagger.summary = 'LOGIN a User (can be a driver ou a passenger )'
  #swagger.description = 'This endpoint is responsible to Login ALL users.'
  */
  const { email, password } = req.body; // encrypt password and use JWT
  const { data, error } = await passenger.findOneByEmail(email);
  console.log("data ->", data);

  if (error) return res.status(400).json(error);
  return res.json(data);
});

export default router;
