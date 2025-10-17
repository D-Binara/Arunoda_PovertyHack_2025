import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { productsAPI } from '@/lib/api';
import { toast } from 'sonner';

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

export default function ProductPreview({ limit }: ProductPreviewProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
          <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="relative w-full h-48 sm:h-40 md:h-36">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>

            <CardContent className="p-3 space-y-1 text-center sm:text-left">
              <h3 className="font-semibold text-base sm:text-sm truncate">
                {product.title}
              </h3>
              <p className="text-primary font-bold text-sm sm:text-xs">
                {typeof product.price === 'number' ? `Rs. ${product.price}` : 'Negotiable'}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
