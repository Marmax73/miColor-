import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_super_secreta';

export function encryptData(data) {
  return jwt.sign(data, SECRET_KEY);
}

export function decryptData(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return null;
  }
}
