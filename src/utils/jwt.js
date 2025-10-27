

// utils/jwt.js
import jwt from "jsonwebtoken";


const SECRET_KEY = process.env.JWT_SECRET || 'clave_super_secreta';



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



