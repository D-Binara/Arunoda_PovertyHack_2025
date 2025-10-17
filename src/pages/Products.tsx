import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/BottomNav';
import { mockProducts } from '@/lib/mock-data';

export default function ProductsPage() {
  const [category, setCategory] = useState<'all' | 'food' | 'crafts' | 'services'>('all');

  const filteredProducts = category === 'all' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🛍️ Local Products</h1>
            <p className="text-muted-foreground">Buy and sell in your community</p>
          </div>
          <Link to="/products/new">
            <Button size="lg" className="btn-hero">
              <Plus className="h-5 w-5 mr-2" />
              Post Product
            </Button>
          </Link>
        </div>

        {/* Category Filter */}
        <Tabs value={category} onValueChange={(v) => setCategory(v as any)}>
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="crafts">Crafts</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <Card key={product.id} className="card-elevated overflow-hidden group">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-semibold line-clamp-1">{product.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">
                    {typeof product.price === 'number' 
                      ? `Rs. ${product.price}` 
                      : 'Negotiable'}
                  </p>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>

                <p className="text-xs text-muted-foreground">
                  📍 {product.village}, {product.district}
                </p>

                {product.audioDescription && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Hear Description
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="flex-1">
                    Contact Seller
                  </Button>
                </div>

                {product.syncStatus === 'pending' && (
                  <Badge variant="outline" className="w-full justify-center">
                    ⏳ Pending Sync
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No products found in this category.
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
