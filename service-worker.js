// Service Worker para Europa 2025 PWA
const CACHE_NAME = 'europa2025-v1';
const urlsToCache = [
  '/travel-plan/',
  '/travel-plan/index.html',
  '/travel-plan/styles.css',
  '/travel-plan/script.js',
  '/travel-plan/data.js',
  '/travel-plan/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
];

// Instalar el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error al cachear recursos:', error);
      })
  );
  // Forzar activación inmediata
  self.skipWaiting();
});

// Activar el Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tomar control inmediato de todas las páginas
  self.clients.claim();
});

// Interceptar peticiones
self.addEventListener('fetch', event => {
  // Ignorar peticiones de fuentes que no existen
  if (event.request.url.includes('/fonts/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Retornar respuesta vacía para fuentes faltantes
        return new Response('', { status: 200, headers: { 'Content-Type': 'font/woff2' } });
      })
    );
    return;
  }

  // Estrategia: Cache First, Network Fallback
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en cache, devolverlo
        if (response) {
          return response;
        }

        // Si no está en cache, hacer la petición
        return fetch(event.request).then(response => {
          // No cachear si no es una respuesta válida
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }

          // Clonar la respuesta
          const responseToCache = response.clone();

          // Agregar al cache para tiles del mapa
          if (event.request.url.includes('tile.openstreetmap.org') || 
              event.request.url.includes('cartocdn.com')) {
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }

          return response;
        }).catch(() => {
          // Si falla y es una petición de fuente, retornar respuesta vacía
          if (event.request.url.includes('.woff') || event.request.url.includes('.woff2')) {
            return new Response('', { status: 200 });
          }
          throw new Error('Network request failed');
        });
      })
      .catch(() => {
        // Si falla la red y no está en cache, mostrar página offline
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Evento para sincronización en background
self.addEventListener('sync', event => {
  if (event.tag === 'sync-checklist') {
    event.waitUntil(syncChecklist());
  }
});

// Función para sincronizar checklist cuando vuelva la conexión
async function syncChecklist() {
  try {
    const cache = await caches.open(CACHE_NAME);
    // Aquí podrías sincronizar con un servidor si tuvieras backend
    console.log('Checklist sincronizada');
  } catch (error) {
    console.error('Error sincronizando:', error);
  }
}

// Manejar notificaciones push (para recordatorios de check-in)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Recordatorio de viaje',
    icon: '/travel-plan/icons/icon-192x192.png',
    badge: '/travel-plan/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalles',
        icon: '/travel-plan/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/travel-plan/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Europa 2025 - Recordatorio', options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    // Abrir la app al hacer click
    event.waitUntil(
      clients.openWindow('/travel-plan/')
    );
  }
});

// Mensaje para indicar actualización disponible
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});