import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AudioRecorder } from '@/components/AudioRecorder';
import { productsAPI } from '@/lib/api';
import { toast } from 'sonner';

const DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Moneragala', 'Ratnapura', 'Kegalle'
];

export default function ProductNewPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [priceType, setPriceType] = useState<'fixed' | 'negotiable'>('fixed');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const productData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        price: priceType === 'negotiable' 
          ? 'negotiable' 
          : Number(formData.get('price')),
        category: formData.get('category') as string,
        village: formData.get('village') as string,
        district: formData.get('district') as string,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'], // Default image
        status: 'active',
      };

      await productsAPI.create(productData);

      toast.success('Product posted successfully! 🎉');
      navigate('/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to post product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Post a Product</h1>
          <p className="text-muted-foreground">Share what you're selling or offering</p>
        </div>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="E.g., Fresh Vegetables" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Tell buyers about your product..."
                  rows={4}
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="crafts">Crafts</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Price Type *</Label>
                  <Select value={priceType} onValueChange={(v) => setPriceType(v as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Price</SelectItem>
                      <SelectItem value="negotiable">Negotiable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {priceType === 'fixed' && (
                <div className="space-y-2">
                  <Label htmlFor="price">Price (Rs.) *</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number" 
                    placeholder="Enter price"
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="village">Village *</Label>
                  <Input 
                    id="village" 
                    name="village" 
                    placeholder="Your village"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Select name="district" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {DISTRICTS.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Image upload coming soon
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Audio Description (optional)</Label>
                <p className="text-xs text-muted-foreground mb-3">
                  Record up to 30 seconds describing your product
                </p>
                <AudioRecorder
                  maxDuration={30}
                  onRecordingComplete={setAudioBlob}
                />
                {audioBlob && (
                  <p className="text-sm text-secondary">✓ Audio recorded</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 btn-hero">
                  {loading ? 'Posting...' : 'Post Product'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
