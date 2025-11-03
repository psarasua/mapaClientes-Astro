// Service Worker para PWA - Sistema de Gestión de Repartos
const CACHE_NAME = 'repartos-app-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Recursos críticos para cachear inmediatamente
const CRITICAL_RESOURCES = [
  '/',
  '/dashboard',
  '/clientes',
  '/camiones',
  '/repartos',
  '/mapa',
  '/offline.html',
  '/manifest.json'
];

// Recursos estáticos para cachear
const STATIC_RESOURCES = [
  // CSS y JS críticos se cargan automáticamente
];

// Recursos API que se pueden cachear temporalmente
const API_CACHE_PATTERNS = [
  /^\/api\/dashboard\/stats$/,
  /^\/api\/clientes$/,
  /^\/api\/camiones$/,
  /^\/api\/repartos$/
];

// Install event - cachear recursos críticos
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
  );
});

// Activate event - limpiar caches antiguos
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - estrategias de caching
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }
  
  // Estrategia según el tipo de recurso
  if (request.destination === 'document') {
    // Páginas HTML - Network First con fallback
    event.respondWith(handleDocumentRequest(request));
  } else if (url.pathname.startsWith('/api/')) {
    // API requests - Network First con cache temporal
    event.respondWith(handleAPIRequest(request));
  } else {
    // Recursos estáticos - Cache First
    event.respondWith(handleStaticRequest(request));
  }
});

// Manejar requests de documentos HTML
async function handleDocumentRequest(request) {
  try {
    // Intentar red primero
    const response = await fetch(request);
    
    // Cachear la respuesta si es exitosa
    if (response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed for document, trying cache:', request.url);
    
    // Intentar cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback a página offline
    return caches.match(OFFLINE_URL);
  }
}

// Manejar requests de API
async function handleAPIRequest(request) {
  const url = new URL(request.url);
  const shouldCache = API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
  
  try {
    // Intentar red primero
    const response = await fetch(request);
    
    // Cachear solo responses exitosas de endpoints específicos
    if (response.status === 200 && shouldCache && request.method === 'GET') {
      const cache = await caches.open(CACHE_NAME);
      // Cachear por 5 minutos
      const responseToCache = response.clone();
      responseToCache.headers.set('sw-cache-timestamp', Date.now().toString());
      cache.put(request, responseToCache);
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed for API, trying cache:', request.url);
    
    // Solo para GET requests, intentar cache
    if (request.method === 'GET') {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        // Verificar si el cache no es muy antiguo (5 minutos)
        const cacheTimestamp = cachedResponse.headers.get('sw-cache-timestamp');
        if (cacheTimestamp) {
          const age = Date.now() - parseInt(cacheTimestamp);
          if (age < 5 * 60 * 1000) { // 5 minutos
            return cachedResponse;
          }
        } else {
          return cachedResponse;
        }
      }
    }
    
    // Fallback para API - respuesta offline
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Sin conexión - datos no disponibles',
        offline: true
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Manejar recursos estáticos
async function handleStaticRequest(request) {
  // Cache First para recursos estáticos
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    
    // Cachear recursos estáticos exitosos
    if (response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Failed to fetch static resource:', request.url);
    
    // Para recursos críticos, intentar un fallback
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="#9ca3af">Imagen no disponible</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    
    throw error;
  }
}

// Background Sync para requests offline
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(syncOfflineData());
  }
});

// Sincronizar datos offline
async function syncOfflineData() {
  try {
    // Obtener datos pendientes del IndexedDB o localStorage
    const pendingData = await getPendingData();
    
    for (const data of pendingData) {
      try {
        await fetch(data.url, {
          method: data.method,
          headers: data.headers,
          body: data.body
        });
        
        // Marcar como sincronizado
        await markAsSynced(data.id);
        console.log('[SW] Synced data:', data.id);
      } catch (error) {
        console.log('[SW] Failed to sync data:', data.id, error);
      }
    }
  } catch (error) {
    console.log('[SW] Background sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización disponible',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver',
        icon: '/icons/action-view.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icons/action-close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Sistema de Repartos', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Placeholder functions para datos offline
async function getPendingData() {
  // Implementar lógica para obtener datos pendientes
  return [];
}

async function markAsSynced(id) {
  // Implementar lógica para marcar datos como sincronizados
  console.log('Marked as synced:', id);
}

// Message handling para comunicación con la app
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    
    case 'CACHE_URLS':
      event.waitUntil(cacheUrls(payload.urls));
      break;
    
    case 'CLEAR_CACHE':
      event.waitUntil(clearCache());
      break;
    
    default:
      console.log('[SW] Unknown message type:', type);
  }
});

// Cachear URLs específicas
async function cacheUrls(urls) {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(urls);
}

// Limpiar cache
async function clearCache() {
  return caches.delete(CACHE_NAME);
}

console.log('[SW] Service Worker loaded');