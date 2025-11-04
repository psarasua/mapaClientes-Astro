/**
 * Servicio API para autenticación
 */

const API_BASE = '/api/auth';

export class AutenticacionApi {
  static async iniciarSesion(credenciales) {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error en inicio de sesión');
      }
      
      return result;
    } catch (error) {
      console.error('Error en AutenticacionApi.iniciarSesion:', error);
      throw error;
    }
  }

  static async cerrarSesion() {
    try {
      const response = await fetch(`${API_BASE}/logout`, {
        method: 'POST'
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error al cerrar sesión');
      }
      
      return result;
    } catch (error) {
      console.error('Error en AutenticacionApi.cerrarSesion:', error);
      throw error;
    }
  }

  static async verificarSesion() {
    try {
      const response = await fetch(`${API_BASE}/check`);
      const result = await response.json();
      
      return result.authenticated || false;
    } catch (error) {
      console.error('Error en AutenticacionApi.verificarSesion:', error);
      return false;
    }
  }
}