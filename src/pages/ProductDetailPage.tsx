import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsAPI } from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number | string;
  category: string;
  village: string;
  district: string;
  images: string[];
  userId: { name: string };
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id!);
      setProduct(response.data.data);
    } catch (error: any) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        ← Back
      </Button>

      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {product.images.map((img, i) => (
          <img key={i} src={img} alt={product.title} className="w-full h-64 object-cover rounded-lg" />
        ))}
      </div>
      <p className="mb-2 text-lg font-bold">
        {typeof product.price === 'number' ? `Rs. ${product.price}` : 'Negotiable'}
      </p>
      <p className="mb-2 text-muted-foreground">{product.description}</p>
      <p className="mb-2 text-sm text-muted-foreground">
        📍 {product.village}, {product.district}
      </p>
      <p className="mb-4 text-sm text-muted-foreground">Seller: {product.userId.name}</p>
      <Button>Contact Seller</Button>
    </div>
  );
}
