import { Auth } from "../auth/auth";
import { Passenger } from "../models/passenger";

const auth = new Auth();
const passenger = new Passenger();
export default async (req, res, next) => {
  try {
    const token = req.headers["api-key"];
    const payload = await auth.decode(token);
    const { exists } = await passenger.existsByEmail(payload.email);
    if (exists) return next();
  } catch (err) {
    console.error(err);
  }
  return res.status(401).send();
};
