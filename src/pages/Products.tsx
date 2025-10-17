import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { productsAPI } from "@/lib/api";
import { toast } from "sonner";
import { Search, Package, Filter } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number | string;
  images: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* --- Header Section --- */}
        <header className="relative overflow-hidden py-14 px-6 text-center bg-gradient-to-br from-[#F57C00]/90 via-[#FB8C00] to-[#FFB300] text-white shadow-sm">
          <div className="absolute inset-0 opacity-10 bg-[url('/img/pattern-light.png')] bg-repeat" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Local Products
            </h1>
            <p className="text-lg opacity-95">
              Discover handcrafted creations and homegrown products from Sri Lankan entrepreneurs.
            </p>
          </div>
        </header>

        {/* --- Search / Filter Bar --- */}
        <div className="max-w-6xl mx-auto px-6 mt-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center w-full sm:w-1/2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-full"
            />
          </div>

          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>

        {/* --- Product Grid --- */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          {loading ? (
              <p className="text-center text-muted-foreground py-10">
                Loading products...
              </p>
          ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground space-y-3">
                <Package className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="text-sm">Try adjusting your search or filters.</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map((product) => (
                    <Link
                        key={product._id}
                        to={`/products/${product._id}`}
                        className="block focus:outline-none group"
                    >
                      <Card
                          className="
                    bg-white dark:bg-gray-900
                    border border-gray-200 dark:border-gray-800
                    rounded-2xl overflow-hidden
                    shadow-sm hover:shadow-xl hover:-translate-y-1
                    transition-all duration-300
                  "
                      >
                        {/* Image Section */}
                        <div className="relative w-full h-48 sm:h-44 md:h-40 overflow-hidden">
                          <img
                              src={product.images?.[0] || "/img/placeholder-product.jpg"}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Subtle overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        {/* Content Section */}
                        <CardContent className="p-5 space-y-2">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-[#F57C00] transition-colors truncate">
                            {product.title}
                          </h3>

                          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                            {product.description ||
                                "A beautifully handcrafted local product."}
                          </p>

                          <div className="flex justify-between items-center pt-1">
                            <p className="text-xl font-bold text-[#F57C00]">
                              {typeof product.price === "number"
                                  ? `Rs. ${product.price.toLocaleString()}`
                                  : "Negotiable"}
                            </p>

                            <span
                                className="
                          opacity-0 group-hover:opacity-100
                          text-xs font-medium
                          px-2.5 py-1 rounded-full
                          bg-[#F57C00]/10 text-[#F57C00]
                          ring-1 ring-[#F57C00]/20
                          transition-opacity
                        "
                            >
                        View
                      </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                ))}
              </div>
          )}
        </section>
      </div>
  );
}
