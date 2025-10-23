import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../app/utils/bcrypt.js";

const prisma = new PrismaClient();

// Registrar nuevo usuario
export async function registerUser(data) {
  const { perfil, nombre, apellido, localidad, numeroDeMobil, email, password, direccionComercial, cuit } = data;

  // Verificar si el email ya existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("El email ya está registrado");

  // Encriptar la contraseña
  const hashedPassword = await hashPassword(password);

  // Crear usuario
  const newUser = await prisma.user.create({
    data: {
      perfil,
      nombre,
      apellido,
      localidad,
      numeroDeMobil,
      email,
      password: hashedPassword,
      direccionComercial,
      cuit,
    },
  });

  return newUser;
}

// Login
export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado");

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error("Contraseña incorrecta");

  return user;
}
