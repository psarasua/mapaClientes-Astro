import { query } from '../../../lib/database.js';

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const tipo = url.searchParams.get('tipo') || 'general';
    const fechaInicio = url.searchParams.get('fechaInicio');
    const fechaFin = url.searchParams.get('fechaFin');

    let reportData = {};

    switch (tipo) {
      case 'general':
        reportData = await getGeneralReport();
        break;
      case 'repartos':
        reportData = await getRepartosReport(fechaInicio, fechaFin);
        break;
      case 'clientes':
        reportData = await getClientesReport();
        break;
      case 'rutas':
        reportData = await getRutasReport();
        break;
      case 'eficiencia':
        reportData = await getEficienciaReport();
        break;
      default:
        reportData = await getGeneralReport();
    }

    return new Response(JSON.stringify({
      success: true,
      data: reportData
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error generating report:', error);
    return new Response(JSON.stringify({ error: 'Error al generar reporte' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function getGeneralReport() {
  const stats = {};

  // Totales generales
  const totales = await query(`
    SELECT 
      (SELECT COUNT(*) FROM clientes WHERE estado = 'Activo') as total_clientes_activos,
      (SELECT COUNT(*) FROM clientes WHERE estado = 'Inactivo') as total_clientes_inactivos,
      (SELECT COUNT(*) FROM camiones) as total_camiones,
      (SELECT COUNT(*) FROM rutas) as total_rutas,
      (SELECT COUNT(*) FROM repartos) as total_repartos
  `);
  stats.totales = totales.rows[0];

  // Clientes por ruta
  const clientesPorRuta = await query(`
    SELECT 
      ru.nombre as ruta,
      COUNT(DISTINCT rc.cliente_id) as total_clientes
    FROM rutas ru
    LEFT JOIN repartos r ON ru.id = r.ruta_id
    LEFT JOIN reparto_cliente rc ON r.id = rc.reparto_id
    GROUP BY ru.id, ru.nombre
    ORDER BY total_clientes DESC
  `);
  stats.clientesPorRuta = clientesPorRuta.rows;

  // Utilización de camiones
  const utilizacionCamiones = await query(`
    SELECT 
      c.nombre as camion,
      COUNT(r.id) as total_repartos,
      COUNT(DISTINCT r.ruta_id) as rutas_diferentes
    FROM camiones c
    LEFT JOIN repartos r ON c.id = r.camion_id
    GROUP BY c.id, c.nombre
    ORDER BY total_repartos DESC
  `);
  stats.utilizacionCamiones = utilizacionCamiones.rows;

  return stats;
}

async function getRepartosReport(fechaInicio, fechaFin) {
  const stats = {};

  // Repartos activos
  const repartosActivos = await query(`
    SELECT 
      r.id,
      ru.nombre as ruta,
      c.nombre as camion,
      COUNT(rc.cliente_id) as total_clientes
    FROM repartos r
    LEFT JOIN rutas ru ON r.ruta_id = ru.id
    LEFT JOIN camiones c ON r.camion_id = c.id
    LEFT JOIN reparto_cliente rc ON r.id = rc.reparto_id
    GROUP BY r.id, ru.nombre, c.nombre
    ORDER BY total_clientes DESC
  `);
  stats.repartosActivos = repartosActivos.rows;

  // Distribución por ruta
  const distribucionRutas = await query(`
    SELECT 
      ru.nombre as ruta,
      COUNT(r.id) as total_repartos,
      AVG(cliente_counts.total_clientes) as promedio_clientes
    FROM rutas ru
    LEFT JOIN repartos r ON ru.id = r.ruta_id
    LEFT JOIN (
      SELECT reparto_id, COUNT(cliente_id) as total_clientes
      FROM reparto_cliente
      GROUP BY reparto_id
    ) cliente_counts ON r.id = cliente_counts.reparto_id
    GROUP BY ru.id, ru.nombre
    ORDER BY total_repartos DESC
  `);
  stats.distribucionRutas = distribucionRutas.rows;

  return stats;
}

async function getClientesReport() {
  const stats = {};

  // Distribución por estado
  const estadoDistribucion = await query(`
    SELECT 
      estado,
      COUNT(*) as total,
      ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM clientes), 2) as porcentaje
    FROM clientes
    GROUP BY estado
  `);
  stats.estadoDistribucion = estadoDistribucion.rows;

  // Clientes con coordenadas GPS
  const coordenadasStats = await query(`
    SELECT 
      CASE 
        WHEN latitud IS NOT NULL AND longitud IS NOT NULL THEN 'Con GPS'
        ELSE 'Sin GPS'
      END as tipo_coordenadas,
      COUNT(*) as total
    FROM clientes
    WHERE estado = 'Activo'
    GROUP BY tipo_coordenadas
  `);
  stats.coordenadasStats = coordenadasStats.rows;

  // Top clientes por frecuencia en repartos
  const topClientes = await query(`
    SELECT 
      c.nombre,
      c.razonsocial,
      COUNT(rc.reparto_id) as total_repartos
    FROM clientes c
    LEFT JOIN reparto_cliente rc ON c.id = rc.cliente_id
    WHERE c.estado = 'Activo'
    GROUP BY c.id, c.nombre, c.razonsocial
    ORDER BY total_repartos DESC
    LIMIT 10
  `);
  stats.topClientes = topClientes.rows;

  return stats;
}

async function getRutasReport() {
  const stats = {};

  // Análisis de rutas
  const analisisRutas = await query(`
    SELECT 
      ru.nombre as ruta,
      COUNT(DISTINCT r.id) as total_repartos,
      COUNT(DISTINCT r.camion_id) as camiones_diferentes,
      COUNT(DISTINCT rc.cliente_id) as clientes_unicos,
      AVG(cliente_counts.total_clientes) as promedio_clientes_por_reparto
    FROM rutas ru
    LEFT JOIN repartos r ON ru.id = r.ruta_id
    LEFT JOIN reparto_cliente rc ON r.id = rc.reparto_id
    LEFT JOIN (
      SELECT reparto_id, COUNT(cliente_id) as total_clientes
      FROM reparto_cliente
      GROUP BY reparto_id
    ) cliente_counts ON r.id = cliente_counts.reparto_id
    GROUP BY ru.id, ru.nombre
    ORDER BY total_repartos DESC
  `);
  stats.analisisRutas = analisisRutas.rows;

  return stats;
}

async function getEficienciaReport() {
  const stats = {};

  // Eficiencia de camiones
  const eficienciaCamiones = await query(`
    SELECT 
      c.nombre as camion,
      COUNT(r.id) as total_repartos,
      COUNT(DISTINCT r.ruta_id) as rutas_cubiertas,
      COALESCE(SUM(cliente_counts.total_clientes), 0) as total_clientes_servidos,
      CASE 
        WHEN COUNT(r.id) > 0 THEN ROUND(COALESCE(SUM(cliente_counts.total_clientes), 0)::numeric / COUNT(r.id), 2)
        ELSE 0
      END as promedio_clientes_por_reparto
    FROM camiones c
    LEFT JOIN repartos r ON c.id = r.camion_id
    LEFT JOIN (
      SELECT reparto_id, COUNT(cliente_id) as total_clientes
      FROM reparto_cliente
      GROUP BY reparto_id
    ) cliente_counts ON r.id = cliente_counts.reparto_id
    GROUP BY c.id, c.nombre
    ORDER BY total_clientes_servidos DESC
  `);
  stats.eficienciaCamiones = eficienciaCamiones.rows;

  // KPIs generales
  const kpis = await query(`
    SELECT 
      ROUND(AVG(cliente_counts.total_clientes), 2) as promedio_clientes_por_reparto,
      COUNT(DISTINCT r.camion_id) as camiones_activos,
      COUNT(DISTINCT r.ruta_id) as rutas_activas,
      COUNT(DISTINCT rc.cliente_id) as clientes_en_repartos
    FROM repartos r
    LEFT JOIN reparto_cliente rc ON r.id = rc.reparto_id
    LEFT JOIN (
      SELECT reparto_id, COUNT(cliente_id) as total_clientes
      FROM reparto_cliente
      GROUP BY reparto_id
    ) cliente_counts ON r.id = cliente_counts.reparto_id
  `);
  stats.kpis = kpis.rows[0];

  return stats;
}