import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsAPI } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowLeft, User, Phone } from "lucide-react";

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
            console.error("Error fetching product:", error);
            toast.error("Failed to load product");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-screen-md mx-auto p-6 text-center text-muted-foreground">
                Loading product...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-screen-md mx-auto p-6 text-center text-muted-foreground">
                Product not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* --- Back Button --- */}
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#F57C00] transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </Button>

                {/* --- Product Header Image --- */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <img
                        src={product.images?.[0] || "/img/placeholder-product.jpg"}
                        alt={product.title}
                        className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                            {product.title}
                        </h1>
                        <p className="text-lg text-orange-300 font-semibold mt-2">
                            {typeof product.price === "number"
                                ? `Rs. ${product.price.toLocaleString()}`
                                : "Negotiable"}
                        </p>
                    </div>
                </div>

                {/* --- Main Content Area --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- Left Column: Details --- */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                                Product Description
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {product.description || "No detailed description available."}
                            </p>
                        </div>

                        {/* Additional Images */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {product.images.slice(1).map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`${product.title} - ${i + 1}`}
                                        className="w-full h-40 object-cover rounded-lg border border-gray-100 dark:border-gray-800 hover:scale-105 transition-transform duration-300"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- Right Column: Seller Info --- */}
                    <aside className="space-y-4">
                        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-800 sticky top-6">
                            <CardContent className="p-6 space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <User className="h-5 w-5 text-[#F57C00]" />
                                    Seller Information
                                </h3>
                                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <p className="font-medium">{product.userId?.name || "Unknown Seller"}</p>
                                    <p className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4 text-[#F57C00]" />{" "}
                                        {product.village}, {product.district}
                                    </p>
                                    <p className="capitalize text-xs text-gray-500">
                                        Category: {product.category || "General"}
                                    </p>
                                </div>
                                <Button
                                    className="w-full bg-[#F57C00] hover:bg-[#E65100] text-white"
                                    onClick={() => toast.info("Contacting seller...")}
                                >
                                    <Phone className="h-4 w-4 mr-2" />
                                    Contact Seller
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Related CTA */}
                        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-orange-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 text-center shadow-sm">
                            <CardContent className="p-5 space-y-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    Explore More Local Products
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Discover crafts and creations from rural artisans across Sri Lanka.
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-[#F57C00] text-[#F57C00] hover:bg-[#F57C00] hover:text-white"
                                    onClick={() => navigate("/products")}
                                >
                                    Browse Products
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
