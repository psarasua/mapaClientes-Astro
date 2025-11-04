/**
 * Utilidades para formato y presentación de datos
 */

/**
 * Formatea un número de teléfono
 * @param {string} telefono - Número de teléfono sin formato
 * @returns {string} Teléfono formateado
 */
export function formatearTelefono(telefono) {
  if (!telefono) return '';
  
  // Remover todo excepto números
  const numeros = telefono.replace(/\D/g, '');
  
  // Formatear según la longitud
  if (numeros.length === 9) {
    return `${numeros.slice(0, 3)}-${numeros.slice(3, 6)}-${numeros.slice(6)}`;
  } else if (numeros.length === 8) {
    return `${numeros.slice(0, 4)}-${numeros.slice(4)}`;
  }
  
  return telefono;
}

/**
 * Formatea una fecha para mostrar
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export function formatearFecha(fecha) {
  if (!fecha) return '';
  
  const fechaObj = new Date(fecha);
  
  if (isNaN(fechaObj.getTime())) return '';
  
  return fechaObj.toLocaleDateString('es-UY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formatea una fecha y hora para mostrar
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha y hora formateada
 */
export function formatearFechaHora(fecha) {
  if (!fecha) return '';
  
  const fechaObj = new Date(fecha);
  
  if (isNaN(fechaObj.getTime())) return '';
  
  return fechaObj.toLocaleString('es-UY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} texto - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export function capitalizarTexto(texto) {
  if (!texto) return '';
  
  return texto
    .toLowerCase()
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
}

/**
 * Trunca un texto a una longitud específica
 * @param {string} texto - Texto a truncar
 * @param {number} longitud - Longitud máxima
 * @returns {string} Texto truncado
 */
export function truncarTexto(texto, longitud = 50) {
  if (!texto) return '';
  
  if (texto.length <= longitud) return texto;
  
  return texto.substring(0, longitud) + '...';
}

/**
 * Genera iniciales de un nombre
 * @param {string} nombre - Nombre completo
 * @returns {string} Iniciales
 */
export function generarIniciales(nombre) {
  if (!nombre) return '';
  
  return nombre
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}