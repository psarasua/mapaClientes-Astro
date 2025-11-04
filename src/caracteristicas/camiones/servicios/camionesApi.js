/**
 * Servicio API para la gestión de camiones
 */

const API_BASE = '/api/camiones';

export class CamionesApi {
  static async obtenerTodos() {
    try {
      const response = await fetch(API_BASE);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al obtener camiones');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en CamionesApi.obtenerTodos:', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    try {
      const response = await fetch(`${API_BASE}/${id}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al obtener camión');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en CamionesApi.obtenerPorId:', error);
      throw error;
    }
  }

  static async crear(datosCamion) {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosCamion)
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al crear camión');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en CamionesApi.crear:', error);
      throw error;
    }
  }

  static async actualizar(id, datosCamion) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosCamion)
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al actualizar camión');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en CamionesApi.actualizar:', error);
      throw error;
    }
  }

  static async eliminar(id) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al eliminar camión');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en CamionesApi.eliminar:', error);
      throw error;
    }
  }
}