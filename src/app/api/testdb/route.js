// src/app/api/testdb/route.js
import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET() {
  try {
    const result = await prisma.user.findMany(); // o tu tabla
    return NextResponse.json({ ok: true, count: result.length });
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    return NextResponse.json({ ok: false, error: error.message });
  }
}
