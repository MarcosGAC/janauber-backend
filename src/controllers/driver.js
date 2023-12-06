import express from "express";
import { Driver } from "../models/driver.js";

const router = express.Router();
const driverModel = new Driver();

router.get("/:id", async (req, res) => {
  /**
    #swagger.summary = 'GET one driver'
    #swagger.description = 'This endpoint is responsible to get ONE driver.'
    #swagger.security = [{
      "apiKeyAuth": []
     }] 
   */
  const { driver, error } = await driverModel.findOneById(req.params.id);
  if (error) return res.status(400).json(error);
  return res.json(driver);
});
router.get("/", async (req, res) => {
  /**
   #swagger.summary = 'GET drivers'
   #swagger.description = 'This endpoint is responsible to gel all drivers'
   #swagger.security = [{
    "apiKeyAuth": []
   }]  
   */
  const { driver, error } = await driverModel.getAll();
  if (error) return res.status(400).json(error);
  return res.json(driver);
});

router.post("/", async (req, res) => {
  /**
     #swagger.summary = 'POST driver'
     #swagger.description = 'This endpoint is responsible to create a new driver'  
     #swagger.autoBody = true 
     #swagger.parameters['driver']={
        in:'body',
        description: 'Create New Driver'
     }
     #swagger.security = [{
        "apiKeyAuth": []
      }] 
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
  return res.json(driver);
});

export default router;
