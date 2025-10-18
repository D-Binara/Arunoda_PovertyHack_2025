import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { productsAPI } from '@/lib/api';
import { toast } from 'sonner';
import type { Product } from '@/lib/types';
import { fetchProductsSmart, syncOnline } from '@/lib/products.offline';

export default function ProductList({ limit }: { limit?: number }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    const navigate = useNavigate();

    useEffect(() => {
        const onOnline = async () => {
            setIsOnline(true);
            toast.success('Back online! Syncing latest data…');
            try {
                setLoading(true);
                const fresh = await syncOnline(productsAPI.getAll);
                setProducts(fresh);
            } catch (e) {
                console.error('Sync error:', e);
                toast.error('Sync failed — using saved/dummy data');
            } finally {
                setLoading(false);
            }
        };

        const onOffline = () => {
            setIsOnline(false);
            toast.warning('You are offline — showing saved/dummy data');
        };

        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);

        // initial load
        (async () => {
            setLoading(true);
            const { products: list } = await fetchProductsSmart(productsAPI.getAll);
            setProducts(list);
            setLoading(false);
        })();

        return () => {
            window.removeEventListener('online', onOnline);
            window.removeEventListener('offline', onOffline);
        };
    }, []);

    if (loading) return <p>Loading products...</p>;

    const displayed = limit ? products.slice(0, limit) : products;

    return (
        <div>
            {!isOnline && (
                <div className="mb-3 rounded-md bg-yellow-100 text-yellow-800 p-2 text-center text-sm font-medium">
                    ⚠️ You are offline — showing saved data
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {displayed.map((product) => (
                    <Link key={product.id} to={`/products/${product.id}`} className="block">
                        <Card
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative w-full h-44 sm:h-40 md:h-36 overflow-hidden">
                                <img
                                    src={(product as any).images?.[0] || '/img/placeholder-product.jpg'}
                                    alt={(product as any).title ?? 'Product'}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Content */}
                            <CardContent className="p-5 space-y-2">
                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-[#F57C00] transition-colors truncate">
                                    {(product as any).title}
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                    {(product as any).description ?? 'A beautifully handcrafted local product.'}
                                </p>
                                {'price' in product && (
                                    <p className="text-xl font-bold text-[#F57C00]">
                                        {typeof (product as any).price === 'number'
                                            ? `Rs. ${(product as any).price.toLocaleString()}`
                                            : 'Negotiable'}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
