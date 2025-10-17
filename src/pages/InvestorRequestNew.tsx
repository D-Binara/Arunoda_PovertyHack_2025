import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db, addToOutbox } from '@/lib/db';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { InvestorRequest } from '@/lib/types';

const requestSchema = z.object({
  amount: z.string().min(1, 'Amount is required'),
  category: z.enum(['food', 'crafts', 'services']),
  purpose: z.string().min(10, 'Purpose must be at least 10 characters').max(500, 'Purpose too long'),
  roiDescription: z.string().min(10, 'ROI description must be at least 10 characters').max(500, 'ROI description too long'),
  timeline: z.string().min(1, 'Timeline is required').max(100, 'Timeline too long'),
});

type FormData = z.infer<typeof requestSchema>;

export default function InvestorRequestNew() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      amount: '',
      category: 'food',
      purpose: '',
      roiDescription: '',
      timeline: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Mock profile data
      const profile = {
        id: 'user_1',
        name: 'Amara Silva',
        village: 'Moratuwa',
        district: 'Colombo',
      };

      const newRequest: InvestorRequest = {
        id: `inv_${Date.now()}`,
        userId: profile.id,
        userName: profile.name,
        village: profile.village,
        district: profile.district,
        category: data.category,
        amount: parseFloat(data.amount),
        purpose: data.purpose,
        roiDescription: data.roiDescription,
        timeline: data.timeline,
        status: 'active',
        createdAt: new Date(),
        bookmarkedBy: [],
        syncStatus: 'pending',
      };

      await db.investorRequests.add(newRequest);
      await addToOutbox('product', newRequest);

      toast({
        title: t('Request Submitted'),
        description: t('Your investor request has been submitted successfully'),
      });

      navigate('/investor-connect');
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: t('Error'),
        description: t('Failed to submit request. Please try again.'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground p-4 shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/investor-connect')}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{t('Submit Request')}</h1>
            <p className="text-sm opacity-90">{t('Seek investment for your business')}</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-lg font-semibold">{t('Investment Request')}</h2>
              <p className="text-sm text-muted-foreground">
                {t('Share your business opportunity with potential investors')}
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Amount Needed (LKR)')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100000"
                        {...field}
                        className="text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Business Category')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="food">{t('Food & Agriculture')}</SelectItem>
                        <SelectItem value="crafts">{t('Crafts & Manufacturing')}</SelectItem>
                        <SelectItem value="services">{t('Services')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('What will you use the money for?')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('Describe your business plan and how you will use the investment...')}
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roiDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('How will investors profit?')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('Explain the returns: profit share, repayment plan, timeline...')}
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Repayment Timeline')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('e.g., 12 months, 18 months, 2 years')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('Submitting...') : t('Submit Request')}
                </Button>
              </div>
            </form>
          </Form>
        </Card>

        <Card className="p-4 bg-muted/50">
          <h3 className="font-medium mb-2">{t('Tips for Success')}</h3>
          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
            <li>{t('Be clear about how you will use the money')}</li>
            <li>{t('Explain realistic returns for investors')}</li>
            <li>{t('Show your business experience and skills')}</li>
            <li>{t('Be honest about timeline and risks')}</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
