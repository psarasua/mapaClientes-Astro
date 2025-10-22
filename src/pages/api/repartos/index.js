import { query } from '../../../lib/database.js';

export async function GET({ request }) {
  try {
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
            'longitud', cl.longitud,
            'latitud', cl.latitud
          )
        ) as clientes
      FROM repartos r
      LEFT JOIN camiones c ON r.camion_id = c.id
      LEFT JOIN rutas ru ON r.ruta_id = ru.id
      LEFT JOIN reparto_cliente rc ON r.id = rc.reparto_id
      LEFT JOIN clientes cl ON rc.cliente_id = cl.id
      GROUP BY r.id, r.camion_id, c.nombre, r.ruta_id, ru.nombre
      ORDER BY r.id DESC
    `);

    return new Response(JSON.stringify({
      success: true,
      data: result.rows
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching repartos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener repartos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { camion_id, ruta_id, cliente_ids } = data;

    if (!camion_id || !ruta_id) {
      return new Response(JSON.stringify({ error: 'Camión y ruta son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Crear el reparto
    const repartoResult = await query(
      'INSERT INTO repartos (camion_id, ruta_id) VALUES ($1, $2) RETURNING *',
      [camion_id, ruta_id]
    );

    const reparto = repartoResult.rows[0];

    // Asociar clientes si se proporcionaron
    if (cliente_ids && cliente_ids.length > 0) {
      for (const cliente_id of cliente_ids) {
        await query(
          'INSERT INTO reparto_cliente (reparto_id, cliente_id) VALUES ($1, $2)',
          [reparto.id, cliente_id]
        );
      }
    }

    return new Response(JSON.stringify({
      success: true,
      data: reparto
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating reparto:', error);
    return new Response(JSON.stringify({ error: 'Error al crear reparto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}