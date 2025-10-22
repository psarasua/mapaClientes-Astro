import { Client } from 'pg';

let client = null;

export async function getDbClient() {
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL || import.meta.env.DATABASE_URL,
    });
    await client.connect();
  }
  return client;
}

export async function closeDbConnection() {
  if (client) {
    await client.end();
    client = null;
  }
}

// Funciones helper para consultas comunes
export async function query(text, params) {
  const dbClient = await getDbClient();
  try {
    const result = await dbClient.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}