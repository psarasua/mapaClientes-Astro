import { query } from '../../../lib/database.js';

export async function GET({ params }) {
  try {
    const { id } = params;
    
    const result = await query(`
      SELECT 
        r.id,
        r.camion_id,
        c.nombre as camion_nombre,
        r.ruta_id,
        ru.nombre as ruta_nombre,
        array_agg(
          json_build_object(
            'cliente_id', cl.id,
            'nombre', cl.nombre,
            'razonsocial', cl.razonsocial,
            'direccion', cl.direccion,
            'telefono', cl.telefono,
            'longitud', cl.longitud,
            'latitud', cl.latitud
          )
        ) FILTER (WHERE cl.id IS NOT NULL) as clientes
      FROM repartos r
      LEFT JOIN camiones c ON r.camion_id = c.id
      LEFT JOIN rutas ru ON r.ruta_id = ru.id
      LEFT JOIN reparto_cliente rc ON r.id = rc.reparto_id
      LEFT JOIN clientes cl ON rc.cliente_id = cl.id
      WHERE r.id = $1
      GROUP BY r.id, r.camion_id, c.nombre, r.ruta_id, ru.nombre
    `, [id]);
    
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Reparto no encontrado' }), {
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
    console.error('Error fetching reparto:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener reparto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT({ params, request }) {
  try {
    const { id } = params;
    const data = await request.json();
    const { camion_id, ruta_id, cliente_ids } = data;

    if (!camion_id || !ruta_id) {
      return new Response(JSON.stringify({ error: 'Camión y ruta son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update reparto
    const repartoResult = await query(
      'UPDATE repartos SET camion_id = $1, ruta_id = $2 WHERE id = $3 RETURNING *',
      [camion_id, ruta_id, id]
    );

    if (repartoResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Reparto no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update cliente associations
    await query('DELETE FROM reparto_cliente WHERE reparto_id = $1', [id]);

    if (cliente_ids && cliente_ids.length > 0) {
      for (const cliente_id of cliente_ids) {
        await query(
          'INSERT INTO reparto_cliente (reparto_id, cliente_id) VALUES ($1, $2)',
          [id, cliente_id]
        );
      }
    }

    return new Response(JSON.stringify({
      success: true,
      data: repartoResult.rows[0]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error updating reparto:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar reparto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE({ params }) {
  try {
    const { id } = params;
    
    // Delete cliente associations first
    await query('DELETE FROM reparto_cliente WHERE reparto_id = $1', [id]);
    
    // Delete reparto
    const result = await query('DELETE FROM repartos WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Reparto no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Reparto eliminado correctamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error deleting reparto:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar reparto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}