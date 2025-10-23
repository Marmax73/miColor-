import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("❌ JWT_SECRET no está definido en las variables de entorno");
}

export function encryptData(data) {
  return jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });
}

export function decryptData(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

