import prisma from '@/utils/db';
import { generarToken } from '@/utils/jwt';
import bcrypt from '@/utils/bcrypt';


export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Buscar usuario en DB
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    // Verificar contraseña
    const valid = await bcrypt.compare(password, user.password); // ✅ default export
    if (!valid) {
      return new Response(
        JSON.stringify({ error: "Contraseña incorrecta" }),
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = generarToken({ id: user.id, email: user.email });

    return new Response(
      JSON.stringify({ success: true, token }),
      { status: 200 }
    );

  } catch (err) {
    console.error("❌ Error en login:", err);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500 }
    );
  }
}
