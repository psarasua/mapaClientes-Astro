import { query } from '../../../lib/base-datos/conexion.js';
import { comparePassword, generateToken, setTokenCookie } from '../../../lib/utilidades/autenticacion.js';

export async function POST({ request }) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username y password son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Buscar usuario en la base de datos
    const result = await query(
      'SELECT * FROM usuarios WHERE username = $1 OR email = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user = result.rows[0];

    // Verificar password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generar token JWT
    const token = generateToken(user);

    // Crear respuesta exitosa
    const response = new Response(JSON.stringify({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        nombre_completo: user.nombre_completo
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    // Establecer cookie con token
    setTokenCookie(response, token);

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}