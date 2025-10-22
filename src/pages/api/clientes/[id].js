import { query } from '../../../lib/database.js';

export async function GET({ params }) {
  try {
    const { id } = params;
    const result = await query('SELECT * FROM clientes WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Cliente no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: result.rows[0]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching cliente:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener cliente' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT({ params, request }) {
  try {
    const { id } = params;
    const data = await request.json();
    const { codigoalte, razonsocial, nombre, direccion, telefono, rut, longitud, latitud, estado } = data;

    const result = await query(
      `UPDATE clientes 
       SET codigoalte = $1, razonsocial = $2, nombre = $3, direccion = $4, 
           telefono = $5, rut = $6, longitud = $7, latitud = $8, estado = $9
       WHERE id = $10 
       RETURNING *`,
      [codigoalte, razonsocial, nombre, direccion, telefono, rut, longitud, latitud, estado, id]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Cliente no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: result.rows[0]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error updating cliente:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar cliente' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE({ params }) {
  try {
    const { id } = params;
    
    // Soft delete - cambiar estado a 'Inactivo'
    const result = await query(
      'UPDATE clientes SET estado = $1 WHERE id = $2 RETURNING *',
      ['Inactivo', id]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Cliente no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Cliente desactivado correctamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error deleting cliente:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar cliente' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}