import { NextResponse } from "next/server";
import bcrypt from '@/utils/bcrypt';
import prisma from '@/utils/db';


export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, apellido, telefono, localidad, direccion, cuit, email, password, perfil } = body;

    // 🔹 Validar que el perfil sea válido
    if (!perfil || !['userCliente', 'userTienda'].includes(perfil)) {
      return NextResponse.json(
        { message: 'Perfil inválido. Debe ser userCliente o userTienda.' },
        { status: 400 }
      );
    }

    // 🔹 Validar campos básicos comunes
    if (!nombre || !apellido || !telefono || !localidad || !email || !password) {
      return NextResponse.json(
        { message: 'Faltan campos obligatorios básicos.' },
        { status: 400 }
      );
    }

    // 🔹 Validar campos específicos según el perfil
    if (perfil === 'userTienda') {
      if (!direccion || !cuit) {
        return NextResponse.json(
          { message: 'Faltan campos obligatorios para Tienda.' },
          { status: 400 }
        );
      }
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "El usuario ya existe" }, { status: 400 });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // ✅ default export

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        perfil: perfil || "userTienda",
        nombre,
        apellido,
        telefono,
        localidad,
        direccionComercial: direccion,
        cuit,
        email,
        password: hashedPassword,
      },
    });

    console.log("Datos que se van a insertar en DB:", newUser);

    return NextResponse.json({
      message: "Usuario creado exitosamente",
      user: { id: newUser.id, email: newUser.email },
    });

  } catch (error) {
    console.error('❌ Error en /api/register:', error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
