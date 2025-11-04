import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Intentamos consultar algo simple en la base
    const users = await prisma.user.findMany();
    return NextResponse.json({
      ok: true,
      message: "✅ Conexión a Neon (local) exitosa",
      count: users.length,
    });
  } catch (error) {
    console.error("❌ Error al conectar con la DB local:", error);
    return NextResponse.json({
      ok: false,
      error: error.message,
    });
  }
}
