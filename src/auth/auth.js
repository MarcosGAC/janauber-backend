import "dotenv/config";
import jwt from "jsonwebtoken";

class Auth {
  /**
   * Create token JWT
   * @param { Promise } payload
   * @param { string } payload.email
   * @return { string } token
   */
  encode(payload) {
    jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: "1h" });
  }
  /**
   * Decode token JWT
   * @param { string } token
   * @return { Object } payload
   * @return { string } payload.email
   */
  async decode(token) {
    return await jwt.verify(token);
  }
}
