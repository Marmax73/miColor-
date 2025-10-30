import { NextResponse } from "next/server";
import db from "@/utils/db";
import jwtUtils from "@/utils/jwt";
import bcryptUtils from "@/utils/bcrypt";
import { validarCampos } from "@/utils/validations/validations";


export async function POST(req) {
  try {
    const data = await req.json();

    // Validar campos
    const errores = validarCampos(data);
    if (errores.length > 0) {
      return NextResponse.json({ error: errores.join(", ") }, { status: 400 });
    }

    // Buscar usuario
    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Validar contraseña
    const passwordValido = await bcryptUtils.comparePasswords(
      data.password,
      user.password
    );

    if (!passwordValido) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    // Generar token JWT
    const token = jwtUtils.encryptData({ id: user.id, email: user.email });

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("❌ Error en login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
