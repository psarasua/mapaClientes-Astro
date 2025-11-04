/**
 * Servicio API para la gestión de repartos
 */

const API_BASE = '/api/repartos';

export class RepartosApi {
  static async obtenerTodos() {
    try {
      const response = await fetch(API_BASE);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al obtener repartos');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en RepartosApi.obtenerTodos:', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    try {
      const response = await fetch(`${API_BASE}/${id}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al obtener reparto');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en RepartosApi.obtenerPorId:', error);
      throw error;
    }
  }

  static async crear(datosReparto) {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosReparto)
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al crear reparto');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en RepartosApi.crear:', error);
      throw error;
    }
  }

  static async actualizar(id, datosReparto) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosReparto)
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al actualizar reparto');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en RepartosApi.actualizar:', error);
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
        throw new Error(result.message || 'Error al eliminar reparto');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en RepartosApi.eliminar:', error);
      throw error;
    }
  }
}