import { clearTokenCookie } from '../../../lib/utilidades/autenticacion.js';

export async function POST({ request }) {
  const response = new Response(JSON.stringify({ success: true, message: 'Sesión cerrada correctamente' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });

  clearTokenCookie(response);
  return response;
}