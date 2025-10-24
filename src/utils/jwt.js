import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_super_secreta';

// 🔹 Generar token
export function generarToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

// 🔹 Verificar token
export function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
