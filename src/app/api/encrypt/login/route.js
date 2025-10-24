import prisma from "../../../../../utils/db'";
import { verificarPassword } from '../../../../../utils/bcrypt';
import { generarToken } from '../../../../../utils/jwt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const valid = await verificarPassword(password, user.password);
    if (!valid) {
      return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    const token = generarToken({ id: user.id, email: user.email });

    return Response.json({ success: true, token });
  } catch (err) {
    console.error("❌ Error en login:", err);
    return Response.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
