// Service Worker for Counselify Push Notifications
self.addEventListener('push', (event) => {
    let data = { title: 'Counselify', body: 'New update available', url: '/news' };
    try {
        data = event.data.json();
    } catch (e) {
        data.body = event.data?.text() || data.body;
    }

    const options = {
        body: data.body,
        icon: data.icon || '/logo.png',
        badge: '/logo.png',
        data: { url: data.url || '/news' },
        vibrate: [100, 50, 100],
        actions: [{ action: 'open', title: 'View' }]
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Counselify Reminder', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url || '/news';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // If a matching window is already open, focus it
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    client.navigate(url);
                    return client.focus();
                }
            }
            // Otherwise open a new window
            return clients.openWindow(url);
        })
    );
});
