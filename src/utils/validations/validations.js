// src/utils/validations/validations.js

// Validación para nombres en español (mínimo 3 caracteres)
export const validateName = (nombre) => {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{3,50}$/;
  return regex.test(nombre);
};

// Validación para apellidos en español (mínimo 3 caracteres)
export const validateApellido = (apellido) => {
  if (!apellido) return false; // no nulo ni vacío
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{3,50}$/;
  return regex.test(apellido.trim());
};

// Validación CUIT argentino estricto (XX-XXXXXXXX-X)
export const validateCuit = (cuit) => {
  return /^[0-9]{2}-[0-9]{8}-[0-9]{1}$/.test(cuit);
};

// Validación email mejorada
export const validateEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

// Validación teléfono argentino (móviles y fijos)
export const validatePhone = (phone) => {
  return /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(phone);
};

// Validación contraseña segura (8+ chars, 1 mayúscula, 1 número, 1 especial)
export const validatePassword = (password) => {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,17}$/.test(password);

};

// ✅ Función agrupadora para validaciones generales
export function validarCampos(data) {
  const errores = {};

  if (data.nombre && !validateName(data.nombre))
    errores.nombre = "Nombre inválido o demasiado corto";

  if (data.apellido && !validateApellido(data.apellido))
    errores.apellido = "Apellido inválido o demasiado corto";

  if (data.email && !validateEmail(data.email))
    errores.email = "Correo electrónico inválido";

  if (data.password && !validatePassword(data.password))
    errores.password =
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo";

  if (data.cuit && !validateCuit(data.cuit))
    errores.cuit = "CUIT inválido (formato esperado XX-XXXXXXXX-X)";

  if (data.phone && !validatePhone(data.phone))
    errores.phone = "Teléfono inválido";

  // Retorna null si no hay errores, o el objeto con mensajes
  return Object.keys(errores).length > 0 ? errores : null;
}
