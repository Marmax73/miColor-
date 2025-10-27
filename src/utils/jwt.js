
// utils/jwt.js
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("❌ JWT_SECRET no está definido en las variables de entorno");
}

const jwtUtils = {
  encryptData(data) {
    return jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });
  },

  decryptData(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return null;
    }
  },
};

export default jwtUtils;


