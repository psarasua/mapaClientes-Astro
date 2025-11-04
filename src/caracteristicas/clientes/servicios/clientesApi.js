/**
 * Servicio API para la gestión de clientes
 * Centraliza todas las operaciones CRUD de clientes
 */

const API_BASE = '/api/clientes';

export class ClientesApi {
  /**
   * Obtener todos los clientes
   */
  static async obtenerTodos() {
    try {
      const response = await fetch(API_BASE);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al obtener clientes');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en ClientesApi.obtenerTodos:', error);
      throw error;
    }
  }

  /**
   * Obtener un cliente por ID
   */
  static async obtenerPorId(id) {
    try {
      const response = await fetch(`${API_BASE}/${id}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al obtener cliente');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en ClientesApi.obtenerPorId:', error);
      throw error;
    }
  }

  /**
   * Crear nuevo cliente
   */
  static async crear(datosCliente) {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosCliente)
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al crear cliente');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en ClientesApi.crear:', error);
      throw error;
    }
  }

  /**
   * Actualizar cliente existente
   */
  static async actualizar(id, datosCliente) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosCliente)
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al actualizar cliente');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en ClientesApi.actualizar:', error);
      throw error;
    }
  }

  /**
   * Eliminar cliente
   */
  static async eliminar(id) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al eliminar cliente');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en ClientesApi.eliminar:', error);
      throw error;
    }
  }

  /**
   * Buscar clientes por término
   */
  static async buscar(termino, filtros = {}) {
    try {
      const params = new URLSearchParams();
      if (termino) params.append('q', termino);
      
      Object.entries(filtros).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const url = `${API_BASE}?${params.toString()}`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error en búsqueda');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error en ClientesApi.buscar:', error);
      throw error;
    }
  }
}