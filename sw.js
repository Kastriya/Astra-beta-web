// ASTRA Service Worker for Performance Optimization
const CACHE_NAME = 'astra-v1.0.0';
const STATIC_CACHE = 'astra-static-v1';
const DYNAMIC_CACHE = 'astra-dynamic-v1';

// Critical resources to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/performance-optimizations.js',
    '/manifest.json'
];

// Network-first resources (for real-time data)
const NETWORK_FIRST = [
    '/api/',
    '/chat/',
    '/analytics/'
];

// Cache-first resources (static assets)
const CACHE_FIRST = [
    '.js',
    '.css',
    '.woff2',
    '.woff',
    '.ttf',
    '.ico',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
    '.webp'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
    console.log('🚀 ASTRA Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('📦 Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('✅ Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Failed to cache static assets:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('⚡ ASTRA Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Cache cleanup complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    
    // Skip non-HTTP requests
    if (!event.request.url.startsWith('http')) {
        return;
    }

    // Skip Chrome extension requests
    if (requestUrl.protocol === 'chrome-extension:') {
        return;
    }

    // Network-first strategy for API calls
    if (NETWORK_FIRST.some(pattern => event.request.url.includes(pattern))) {
        event.respondWith(networkFirst(event.request));
        return;
    }

    // Cache-first strategy for static assets
    if (CACHE_FIRST.some(ext => event.request.url.includes(ext))) {
        event.respondWith(cacheFirst(event.request));
        return;
    }

    // Stale-while-revalidate for HTML pages
    if (event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(staleWhileRevalidate(event.request));
        return;
    }

    // Default to network with cache fallback
    event.respondWith(networkWithCacheFallback(event.request));
});

// Network-first strategy
async function networkFirst(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    
    try {
        console.log('🌐 Network-first:', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('📦 Network failed, trying cache:', request.url);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page or error response
        return new Response('Offline - Please check your connection', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Cache-first strategy
async function cacheFirst(request) {
    console.log('📦 Cache-first:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('❌ Failed to fetch:', request.url, error);
        
        // Return placeholder for failed image requests
        if (request.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            return new Response('', {
                status: 200,
                headers: { 'Content-Type': 'image/svg+xml' }
            });
        }
        
        throw error;
    }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
    console.log('🔄 Stale-while-revalidate:', request.url);
    
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    // Return cached response immediately if available
    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => {
        // Network failed, but we might have cache
        return cachedResponse;
    });
    
    return cachedResponse || fetchPromise;
}

// Network with cache fallback
async function networkWithCacheFallback(request) {
    try {
        console.log('🌐 Network with fallback:', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('📦 Network failed, trying cache:', request.url);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('🔄 Background sync:', event.tag);
    
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    // Handle offline form submissions
    const forms = await getStoredForms();
    
    for (const formData of forms) {
        try {
            await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            // Remove from storage after successful sync
            await removeStoredForm(formData.id);
            console.log('✅ Form synced successfully');
        } catch (error) {
            console.error('❌ Failed to sync form:', error);
        }
    }
}

// Push notifications
self.addEventListener('push', (event) => {
    console.log('📨 Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update from ASTRA!',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            url: '/'
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/icon-explore.png'
            },
            {
                action: 'dismiss',
                title: 'Dismiss',
                icon: '/icon-dismiss.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('ASTRA Update', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    console.log('👆 Notification clicked:', event.action);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});

// Periodic background sync (for updating cache)
self.addEventListener('periodicsync', (event) => {
    console.log('🔄 Periodic sync:', event.tag);
    
    if (event.tag === 'cache-update') {
        event.waitUntil(updateCache());
    }
});

async function updateCache() {
    console.log('🔄 Updating cache...');
    
    const cache = await caches.open(STATIC_CACHE);
    
    try {
        await cache.addAll(STATIC_ASSETS);
        console.log('✅ Cache updated successfully');
    } catch (error) {
        console.error('❌ Failed to update cache:', error);
    }
}

// Helper functions for IndexedDB operations
async function getStoredForms() {
    // Simplified - in production, use IndexedDB
    return [];
}

async function removeStoredForm(id) {
    // Simplified - in production, use IndexedDB
    console.log('Removing stored form:', id);
}

// Error handling
self.addEventListener('error', (event) => {
    console.error('🚨 Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Service Worker unhandled rejection:', event.reason);
});

console.log('🚀 ASTRA Service Worker loaded successfully!');
