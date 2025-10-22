import { query } from '../../../lib/database.js';

export async function GET({ request }) {
  try {
    const result = await query(
      'SELECT * FROM clientes ORDER BY razonsocial ASC'
    );

    return new Response(JSON.stringify({
      success: true,
      data: result.rows
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching clientes:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener clientes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { codigoalte, razonsocial, nombre, direccion, telefono, rut, longitud, latitud } = data;

    if (!razonsocial || !nombre || !direccion) {
      return new Response(JSON.stringify({ error: 'Campos requeridos: razonsocial, nombre, direccion' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await query(
      `INSERT INTO clientes (codigoalte, razonsocial, nombre, direccion, telefono, rut, longitud, latitud, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Activo')
       RETURNING *`,
      [codigoalte, razonsocial, nombre, direccion, telefono, rut, longitud, latitud]
    );

    return new Response(JSON.stringify({
      success: true,
      data: result.rows[0]
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating cliente:', error);
    return new Response(JSON.stringify({ error: 'Error al crear cliente' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}