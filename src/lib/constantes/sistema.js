/**
 * Constantes del sistema
 */

// Estados de los clientes
export const ESTADOS_CLIENTE = {
  ACTIVO: 'Activo',
  INACTIVO: 'Inactivo'
};

// Estados de los repartos
export const ESTADOS_REPARTO = {
  PENDIENTE: 'Pendiente',
  EN_PROGRESO: 'En Progreso',
  COMPLETADO: 'Completado',
  CANCELADO: 'Cancelado'
};

// Configuración de paginación
export const PAGINACION = {
  ITEMS_POR_PAGINA: 20,
  ITEMS_POR_PAGINA_OPCIONES: [10, 20, 50, 100]
};

// Configuración de mensajes
export const MENSAJES = {
  ERROR: {
    CONEXION_BD: 'No hay conexión a la base de datos',
    CONEXION_RED: 'Error de conexión de red',
    DATOS_INVALIDOS: 'Los datos proporcionados no son válidos',
    NO_AUTORIZADO: 'No tiene permisos para realizar esta acción',
    RECURSO_NO_ENCONTRADO: 'El recurso solicitado no existe'
  },
  EXITO: {
    GUARDADO: 'Los datos se han guardado exitosamente',
    ELIMINADO: 'El elemento se ha eliminado correctamente',
    ACTUALIZADO: 'Los datos se han actualizado correctamente'
  }
};

// Configuración de validaciones
export const VALIDACIONES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  TELEFONO_REGEX: /^[0-9\-\+\s\(\)]+$/,
  LONGITUD_MINIMA_NOMBRE: 2,
  LONGITUD_MAXIMA_NOMBRE: 100,
  LONGITUD_MAXIMA_DIRECCION: 255
};

// Configuración de UI
export const UI = {
  TIEMPO_LOADING_MINIMO: 1000, // ms
  TIEMPO_AUTOGUARDADO: 30000, // ms
  TIEMPO_DEBOUNCE_BUSQUEDA: 300 // ms
};

// Rutas de la aplicación
export const RUTAS = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CLIENTES: '/clientes',
  CAMIONES: '/camiones',
  REPARTOS: '/repartos',
  MAPA: '/mapa'
};