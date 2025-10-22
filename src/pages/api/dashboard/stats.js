import { query } from '../../../lib/database.js';

export async function GET({ request }) {
  try {
    const stats = {};

    // Total de clientes
    const clientesResult = await query('SELECT COUNT(*) as total FROM clientes WHERE estado = $1', ['Activo']);
    stats.totalClientes = parseInt(clientesResult.rows[0].total);

    // Total de camiones
    const camionesResult = await query('SELECT COUNT(*) as total FROM camiones');
    stats.totalCamiones = parseInt(camionesResult.rows[0].total);

    // Total de rutas
    const rutasResult = await query('SELECT COUNT(*) as total FROM rutas');
    stats.totalRutas = parseInt(rutasResult.rows[0].total);

    // Total de repartos
    const repartosResult = await query('SELECT COUNT(*) as total FROM repartos');
    stats.totalRepartos = parseInt(repartosResult.rows[0].total);

    // Repartos por ruta
    const repartosPorRutaResult = await query(`
      SELECT 
        ru.nombre as ruta,
        COUNT(r.id) as total_repartos
      FROM rutas ru
      LEFT JOIN repartos r ON ru.id = r.ruta_id
      GROUP BY ru.id, ru.nombre
      ORDER BY ru.id
    `);
    stats.repartosPorRuta = repartosPorRutaResult.rows;

    // Clientes por estado
    const clientesPorEstadoResult = await query(`
      SELECT 
        estado,
        COUNT(*) as total
      FROM clientes
      GROUP BY estado
    `);
    stats.clientesPorEstado = clientesPorEstadoResult.rows;

    return new Response(JSON.stringify({
      success: true,
      data: stats
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener estadísticas' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}