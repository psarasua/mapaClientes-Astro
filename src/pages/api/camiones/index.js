import { query } from '../../../lib/base-datos/conexion.js';

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
    console.error('Database connection error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'No hay conexión a la base de datos',
      message: 'No se puede conectar con la base de datos para obtener los camiones.',
      code: 'DB_CONNECTION_ERROR'
    }), {
      status: 503,
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
    console.error('Database connection error on create:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'No hay conexión a la base de datos',
      message: 'No se puede conectar con la base de datos para crear el camión.',
      code: 'DB_CONNECTION_ERROR'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}