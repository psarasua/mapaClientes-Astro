import { query } from '../../../lib/database.js';

export async function GET({ request }) {
  try {
    const result = await query('SELECT * FROM camiones ORDER BY nombre ASC');

    return new Response(JSON.stringify({
      success: true,
      data: result.rows
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching camiones:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener camiones' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { nombre } = data;

    if (!nombre) {
      return new Response(JSON.stringify({ error: 'El nombre es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await query(
      'INSERT INTO camiones (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );

    return new Response(JSON.stringify({
      success: true,
      data: result.rows[0]
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating camion:', error);
    return new Response(JSON.stringify({ error: 'Error al crear camión' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}