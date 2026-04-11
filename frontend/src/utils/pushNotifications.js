const API_URL = import.meta.env.VITE_API_URL;

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function isPushSupported() {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

export function getPermissionState() {
    if (!('Notification' in window)) return 'unsupported';
    return Notification.permission;
}

async function getOrCreateSubscription() {
    const reg = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;
    const res = await fetch(`${API_URL}/api/vapid-public-key`);
    const { publicKey } = await res.json();
    if (!publicKey) throw new Error('VAPID key not available');
    let subscription = await reg.pushManager.getSubscription();
    if (!subscription) {
        subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)
        });
    }
    return subscription;
}

// Ensure notification permission is granted. Returns true/false.
export async function ensurePermission() {
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'default') {
        const result = await Notification.requestPermission();
        return result === 'granted';
    }
    return false; // denied
}

// Subscribe to push + star an item with selected reminder types
export async function subscribeToPush(newsItemId, reminderTypes = [], globalVideoAlerts = false) {
    try {
        const subscription = await getOrCreateSubscription();
        const res = await fetch(`${API_URL}/api/push/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subscription: subscription.toJSON(),
                newsItemId: String(newsItemId),
                reminderTypes,
                videoAlerts: globalVideoAlerts
            })
        });
        const data = await res.json();

        // Save to localStorage
        const starred = getStarredItems();
        starred.add(String(newsItemId));
        localStorage.setItem('counselify_starred', JSON.stringify([...starred]));
        localStorage.setItem('counselify_push_endpoint', subscription.endpoint);

        // Save per-item reminder prefs locally
        const prefs = getReminderPrefs();
        prefs[String(newsItemId)] = reminderTypes;
        localStorage.setItem('counselify_reminder_prefs', JSON.stringify(prefs));

        if (globalVideoAlerts) localStorage.setItem('counselify_video_alerts', 'true');

        return { success: true, data };
    } catch (err) {
        console.error('Subscribe error:', err);
        return { success: false, reason: 'error', message: err.message };
    }
}

// Unsubscribe / unstar an item
export async function unsubscribeFromPush(newsItemId) {
    try {
        const endpoint = localStorage.getItem('counselify_push_endpoint');
        if (endpoint) {
            await fetch(`${API_URL}/api/push/unsubscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ endpoint, newsItemId: String(newsItemId) })
            });
        }

        const starred = getStarredItems();
        starred.delete(String(newsItemId));
        localStorage.setItem('counselify_starred', JSON.stringify([...starred]));

        const prefs = getReminderPrefs();
        delete prefs[String(newsItemId)];
        localStorage.setItem('counselify_reminder_prefs', JSON.stringify(prefs));

        return { success: true };
    } catch (err) {
        console.error('Unsubscribe error:', err);
        return { success: false };
    }
}

export function getStarredItems() {
    try {
        const stored = localStorage.getItem('counselify_starred');
        return new Set(stored ? JSON.parse(stored) : []);
    } catch { return new Set(); }
}

export function isItemStarred(newsItemId) {
    return getStarredItems().has(String(newsItemId));
}

export function getReminderPrefs() {
    try {
        const stored = localStorage.getItem('counselify_reminder_prefs');
        return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
}

export function getItemReminderPrefs(newsItemId) {
    return getReminderPrefs()[String(newsItemId)] || [];
}

export function getGlobalVideoAlerts() {
    return localStorage.getItem('counselify_video_alerts') === 'true';
}
