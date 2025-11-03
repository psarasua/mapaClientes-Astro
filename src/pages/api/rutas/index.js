import { query } from '../../../lib/database.js';

export async function GET({ request }) {
  try {
    const result = await query('SELECT * FROM rutas ORDER BY id ASC');

    return new Response(JSON.stringify({
      success: true,
      data: result.rows
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Database connection error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'No hay conexión a la base de datos',
      message: 'No se puede conectar con la base de datos para obtener las rutas.',
      code: 'DB_CONNECTION_ERROR'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}