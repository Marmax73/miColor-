import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDB() {
  try {
    const users = await prisma.user.findMany();
    console.log("✅ Conectado con éxito. Usuarios encontrados:", users);
  } catch (error) {
    console.error("❌ Error de conexión:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDB();
