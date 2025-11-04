/**
 * Utilidades para validación de datos
 */

import { VALIDACIONES } from '../constantes/sistema.js';

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} Es válido
 */
export function validarEmail(email) {
  if (!email) return false;
  return VALIDACIONES.EMAIL_REGEX.test(email);
}

/**
 * Valida un teléfono
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} Es válido
 */
export function validarTelefono(telefono) {
  if (!telefono) return false;
  return VALIDACIONES.TELEFONO_REGEX.test(telefono);
}

/**
 * Valida un nombre
 * @param {string} nombre - Nombre a validar
 * @returns {boolean} Es válido
 */
export function validarNombre(nombre) {
  if (!nombre) return false;
  
  const longitud = nombre.trim().length;
  return longitud >= VALIDACIONES.LONGITUD_MINIMA_NOMBRE && 
         longitud <= VALIDACIONES.LONGITUD_MAXIMA_NOMBRE;
}

/**
 * Valida una dirección
 * @param {string} direccion - Dirección a validar
 * @returns {boolean} Es válida
 */
export function validarDireccion(direccion) {
  if (!direccion) return false;
  
  return direccion.trim().length <= VALIDACIONES.LONGITUD_MAXIMA_DIRECCION;
}

/**
 * Valida datos de cliente
 * @param {Object} cliente - Datos del cliente
 * @returns {Object} Resultado de validación
 */
export function validarCliente(cliente) {
  const errores = [];
  
  if (!validarNombre(cliente.nombre) && !validarNombre(cliente.razonsocial)) {
    errores.push('Nombre o Razón Social es requerido');
  }
  
  if (cliente.email && !validarEmail(cliente.email)) {
    errores.push('Email no es válido');
  }
  
  if (cliente.telefono && !validarTelefono(cliente.telefono)) {
    errores.push('Teléfono no es válido');
  }
  
  if (cliente.direccion && !validarDireccion(cliente.direccion)) {
    errores.push('Dirección es demasiado larga');
  }
  
  return {
    esValido: errores.length === 0,
    errores
  };
}

/**
 * Valida datos de camión
 * @param {Object} camion - Datos del camión
 * @returns {Object} Resultado de validación
 */
export function validarCamion(camion) {
  const errores = [];
  
  if (!validarNombre(camion.nombre)) {
    errores.push('Nombre del camión es requerido');
  }
  
  return {
    esValido: errores.length === 0,
    errores
  };
}

/**
 * Valida datos de reparto
 * @param {Object} reparto - Datos del reparto
 * @returns {Object} Resultado de validación
 */
export function validarReparto(reparto) {
  const errores = [];
  
  if (!reparto.camion_id) {
    errores.push('Camión es requerido');
  }
  
  if (!reparto.ruta_id) {
    errores.push('Ruta es requerida');
  }
  
  return {
    esValido: errores.length === 0,
    errores
  };
}