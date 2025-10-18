import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Card, CardContent} from '@/components/ui/card';
import {productsAPI} from '@/lib/api';
import {toast} from 'sonner';


interface Product {
    _id: string;
    title: string;
    description: string;
    price: number | string;
    images: string[];
}

interface ProductPreviewProps {
    limit?: number;
}

export default function ProductList({limit}: ProductPreviewProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);


    const fetchProducts = async () => {
        try {


            setLoading(true);
            const response = await productsAPI.getAll(); // fetch all, limit handled in frontend
            setProducts(response.data.data);
        } catch (error: any) {
            console.error('Error fetching products:', error);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <p>Loading products...</p>;

    const displayedProducts = limit ? products.slice(0, limit) : products;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayedProducts.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`} className="block">
                    <Card
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Image Section */}
                        <div className="relative w-full h-44 sm:h-40 md:h-36 overflow-hidden">
                            <img
                                src={product.images?.[0] || "/img/placeholder-product.jpg"}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Subtle gradient overlay */}
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        </div>

                        {/* Content Section */}
                        <CardContent className="p-5 space-y-2">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-[#F57C00] transition-colors truncate">
                                {product.title}
                            </h3>

                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                {product.description || "A beautifully handcrafted local product."}
                            </p>


                            <p className="text-xl font-bold text-[#F57C00]">
                                {typeof product.price === "number" ? `Rs. ${product.price.toLocaleString()}` : "Negotiable"}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            ))}


        </div>
    );
}