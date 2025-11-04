// testDB.js
import prisma from "./src/utils/db.js";

async function testDB() {
  try {
    const users = await prisma.user.findMany(); // Cambia 'user' por el modelo que tengas
    console.log("✅ Conexión exitosa. Usuarios encontrados:", users.length);
  } catch (err) {
    console.error("❌ Error al conectar con la base de datos:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDB();
