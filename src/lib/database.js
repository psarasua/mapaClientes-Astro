import { Client, Pool } from 'pg';

// Usar Pool en lugar de Client único para mejor gestión de conexiones
let pool = null;

export async function getDbPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL || import.meta.env.DATABASE_URL,
      max: 10, // máximo 10 conexiones
      idleTimeoutMillis: 30000, // cerrar conexiones inactivas después de 30s
      connectionTimeoutMillis: 2000, // timeout de conexión 2s
    });
    
    // Manejar errores de conexión
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }
  return pool;
}

export async function closeDbConnection() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// Funciones helper para consultas comunes
export async function query(text, params) {
  const dbPool = await getDbPool();
  let client;
  
  try {
    client = await dbPool.connect();
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    if (client) {
      client.release(); // Liberar la conexión de vuelta al pool
    }
  }
}