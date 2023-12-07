import express from "express";
import { Travel } from "../models/travel.js";

const router = express.Router();
const travelModel = new Travel();

router.get("/:id", async (req, res) => {
  /**
    #swagger.summary = 'GET one travel'
    #swagger.description = 'This endpoint is responsible to get ONE travel.'
    #swagger.security = [{
      "apiKeyAuth": []
     }] 
   */
  const { travel, error } = await travelModel.findOneById(req.params.id);
  if (error) return res.status(400).json(error);
  return res.json(travel);
});
router.get("/", async (req, res) => {
  /*
   #swagger.summary = 'GET travels'
   #swagger.description = 'This endpoint is responsible to gel all travels'
    #swagger.parameters['passengerId'] = {
            in: 'query',
            description: 'The passenger ID',
            type: 'string'
   },
   #swagger.parameters['driverId'] = {
            in: 'query',
            description: 'The driver ID',
            type: 'string'
   }
   #swagger.security = [{
    "apiKeyAuth": []
   }]
   */
  const { travel, error } = await travelModel.getAll(req.query);
  if (error) return res.status(400).json(error);
  return res.json(travel);
});

router.post("/", async (req, res) => {
  /**
     #swagger.summary = 'POST travel'
     #swagger.description = 'This endpoint is responsible to create a new travel'  
     #swagger.autoBody = true 
     #swagger.parameters['travel']={
        in:'body',
        description: 'Create New travel'
     }
     #swagger.security = [{
        "apiKeyAuth": []
      }] 
     */
  const {
    origin,
    destination,
    travelTime,
    type,
    status,
    passengersIds,
    driverId,
  } = req.body;
  const { travel, error } = await travelModel.create(
    {
      origin,
      destination,
      travelTime,
      type,
      status,
      driverId,
    },
    passengersIds
  );

  if (error) return res.status(400).json(error);
  return res.json(travel);
});

export default router;
