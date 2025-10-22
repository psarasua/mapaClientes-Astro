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
    console.error('Error fetching rutas:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener rutas' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}