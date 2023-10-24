import express from "express";

import { db } from "../../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  /*  
  #swagger.summary = 'POST user'
  #swagger.description = 'This endpoint is responsible to get ALL users.'
  */
  const { data, error } = await db.from("user").select();

  if (error) return res.status(400).json(error);

  return res.json(data);
});

router.post("/", async (req, res) => {
  /*  
  #swagger.autoBody= true
  #swagger.summary = 'POST user'
  #swagger.description = 'This endpoint is responsible to create a new user.'
  #swagger.parameters['obj'] = {
        in: 'body,
        description: "Create an user",
        required: 'true',
        schema: { $ref: '#/definitions/User' }
  */
  const { name, phone } = req.body;

  const { data, error } = await db
    .from("user")
    .insert({ name, phone })
    .select()
    .limit(1);

  if (error) return res.status(400).json(error);

  return res.json(data);
});

export default router;
