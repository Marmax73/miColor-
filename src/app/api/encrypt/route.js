import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_super_secreta';

export async function POST(req) {
  try {
    const data = await req.json();
    const token = jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });

    return Response.json({ token });
  } catch (err) {
    console.error('❌ Error encriptando:', err);
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), { status: 500 });
  }
}
