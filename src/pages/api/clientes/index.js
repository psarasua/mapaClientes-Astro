import { query } from '../../../lib/base-datos/conexion.js';

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
    console.error('Database connection error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'No hay conexión a la base de datos',
      message: 'No se puede conectar con la base de datos. Verifica la configuración de conexión.',
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
    const { codigoalte, razonsocial, nombre, direccion, telefono, rut, longitud, latitud } = data;

    if (!razonsocial || !nombre || !direccion) {
      return new Response(JSON.stringify({ error: 'Campos requeridos: razonsocial, nombre, direccion' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    try {
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
      
    } catch (dbError) {
      console.error('Database connection error on create:', dbError);
      
      return new Response(JSON.stringify({
        success: false,
        error: 'No hay conexión a la base de datos',
        message: 'No se puede conectar con la base de datos para crear el cliente.',
        code: 'DB_CONNECTION_ERROR'
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Error creating cliente:', error);
    return new Response(JSON.stringify({ error: 'Error al crear cliente' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}