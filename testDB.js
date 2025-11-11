// testDB.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testDB() {
  try {
    const users = await prisma.user.findMany();
    console.log("✅ Conexión OK. Usuarios:", users);
  } catch (err) {
    console.error("❌ Error conexión:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDB();
