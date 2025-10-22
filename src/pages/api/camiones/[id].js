import { query } from '../../../lib/database.js';

export async function GET({ params }) {
  try {
    const { id } = params;
    const result = await query('SELECT * FROM camiones WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Camión no encontrado' }), {
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
    console.error('Error fetching camion:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener camión' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT({ params, request }) {
  try {
    const { id } = params;
    const data = await request.json();
    const { nombre } = data;

    if (!nombre) {
      return new Response(JSON.stringify({ error: 'El nombre es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await query(
      'UPDATE camiones SET nombre = $1 WHERE id = $2 RETURNING *',
      [nombre, id]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Camión no encontrado' }), {
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
    console.error('Error updating camion:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar camión' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE({ params }) {
  try {
    const { id } = params;
    
    // Check if camion is being used in repartos
    const checkResult = await query(
      'SELECT COUNT(*) as count FROM repartos WHERE camion_id = $1',
      [id]
    );

    if (parseInt(checkResult.rows[0].count) > 0) {
      return new Response(JSON.stringify({ 
        error: 'No se puede eliminar el camión porque tiene repartos asignados' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await query(
      'DELETE FROM camiones WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Camión no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Camión eliminado correctamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error deleting camion:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar camión' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}