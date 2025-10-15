import { PrismaClient } from '@prisma/client';
import { decryptData } from '../../utils/jwt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;
    const data = decryptData(token);
    if (!data) return res.status(400).json({ error: 'Token inválido' });

    try {
      const user = await prisma.user.create({
        data: {
          perfil: 'userTienda',
          nombre: data.nombre,
          apellido: data.apellido,
          localidad: data.localidad,
          numeroDeMobil: data.numeroDeMobil,
          direccionComercial: data.direccionComercial,
          cuit: data.cuit,
        },
      });
      res.status(200).json({ success: true, userId: user.id });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
