import "dotenv/config";
import jwt from "jsonwebtoken";

export class Auth {
  /**
   * Create token JWT
   * @param { Object } payload
   * @param { string } payload.email
   * @return { Promise<string> } token
   */
  encode(payload) {
    return jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: "1h" });
  }
  /**
   * Decode token JWT
   * @param { string } token
   * @return { Promise<Object> } payload
   * @return { string } payload.email
   */
  async decode(token) {
    return await jwt.verify(token, process.env.SECRET_JWT_KEY);
  }
}
