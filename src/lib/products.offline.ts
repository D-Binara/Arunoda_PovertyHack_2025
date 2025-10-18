import { db } from './db';
import type { Product } from './types';
import { isReallyOnline } from './net';
import { toast } from 'sonner';
import { syncOutbox } from './db';

export type Product = {
    id: string;
    userId: string;
    category: string;
    district: string;
    status: 'active' | 'inactive';
    syncStatus: 'synced' | 'pending' | 'failed';
    title: string;
    description?: string;
    price?: number;
    images: string[];

    // make these optional if not always present
    village?: string;
    createdAt?: string; // ISO string
};

// 🧪 Dummy fallback for demo
// 🧪 Dummy fallback for demo
export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 'dummy-1',
        userId: 'demo',
        category: 'craft',
        district: 'Kegalle',
        status: 'active',
        syncStatus: 'synced',
        title: 'Handmade Pottery',
        description: 'Beautiful clay work from local artisans.',
        price: 800,
        images: ['/img/placeholder-product.jpg'],
        createdAt: new Date().toISOString(),
    } satisfies Product,
    {
        id: 'dummy-2',
        userId: 'demo',
        category: 'tea',
        district: 'Badulla',
        status: 'active',
        syncStatus: 'synced',
        title: 'Organic Tea Pack',
        description: 'Fresh leaves from Uva hills.',
        price: 1500,
        images: ['/img/placeholder-product.jpg'],
        createdAt: new Date().toISOString(),
    } satisfies Product,
];


// Map server → local (if server uses _id)
export function mapServerProduct(p: any): Product {
    // adjust this mapping to match your API shape exactly
    return {
        id: p.id ?? p._id,                 // important: your local key is 'id'
        userId: p.userId ?? 'unknown',
        category: p.category ?? 'general',
        district: p.district ?? 'unknown',
        status: p.status ?? 'active',
        syncStatus: 'synced',
        title: p.title,
        description: p.description,
        price: p.price,
        images: p.images ?? [],
    } as Product;
}

// 1) Load saved products or dummy
export async function loadOfflineOrDummyProducts(): Promise<Product[]> {
    const saved = await db.products.toArray();
    if (saved.length) return saved;
    return DUMMY_PRODUCTS;
}

// 2) Pull from server (when online), update IndexedDB
export async function pullProductsFromServer(
    getAll: () => Promise<any /* your API response */>
): Promise<Product[]> {
    const res = await getAll();
    const list = (res?.data?.data ?? []).map(mapServerProduct) as Product[];

    await db.products.clear();
    if (list.length) {
        await db.products.bulkAdd(list);
    }
    return list;
}

// 3) Main smart fetch: choose online vs offline
export async function fetchProductsSmart(getAll: () => Promise<any>): Promise<{
    products: Product[];
    source: 'server' | 'indexeddb' | 'dummy';
}> {
    const online = await isReallyOnline().catch(() => false);

    if (!online) {
        toast.warning('You are offline — showing saved/dummy data');
        const offline = await loadOfflineOrDummyProducts();
        return { products: offline, source: offline === DUMMY_PRODUCTS ? 'dummy' : 'indexeddb' };
    }

    try {
        const fresh = await pullProductsFromServer(getAll);
        return { products: fresh, source: 'server' };
    } catch (e) {
        console.error('Fetch from server failed, fallback to saved/dummy:', e);
        toast.error('Failed to load from server — showing saved/dummy data');
        const offline = await loadOfflineOrDummyProducts();
        return { products: offline, source: offline === DUMMY_PRODUCTS ? 'dummy' : 'indexeddb' };
    }
}

// 4) Online sync routine (flush outbox → pull fresh)
export async function syncOnline(getAll: () => Promise<any>): Promise<Product[]> {
    // first push any queued writes
    await syncOutbox();
    // then pull fresh
    const fresh = await pullProductsFromServer(getAll);
    toast.success('Synced successfully');
    return fresh;
}
