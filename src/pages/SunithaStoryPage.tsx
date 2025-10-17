import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Play } from 'lucide-react';
import { OfflineBadge } from '@/components/OfflineBadge';
import { useNavigate } from 'react-router-dom';

export default function SunithaStoryPage() {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const storyTitle = "Sunitha's Food Stall Success";
  const storyText = `
The first rays of sunlight hadn't yet broken through the morning mist when Sunitha lit the kerosene stove in her tiny corner of the marketplace. In her hands, she clutched everything she had: a crumpled bundle of five thousand rupees, saved painstakingly over months from her husband's modest income.

She could still hear her mother-in-law's skeptical words: "Who will buy food from a nobody?" But Sunitha had tasted her own cooking, poured her grandmother's secret recipes into battered notebooks, and felt something stir within her a quiet, unshakeable knowing that she had something worth sharing.

That first morning, she laid out steel plates with trembling hands. The aroma of freshly ground masala and slow-cooked lentils began to dance through the narrow streets. Three customers came. Just three. But they came back the next day, and they brought friends.

Sunitha learned each customer's name, remembered their preferences, extra chili for Mr. Rao, less salt for Mrs. Patel's diabetes, a warm smile for the lonely elderly man who ate in silence. Her food wasn't just sustenance; it was wrapped in the kind of care that can't be taught, only felt.

Word spread like the scent of her cooking through tea shop conversations, across clotheslines where neighbors gossiped, in the school pickup lines where mothers compared lunch plans. "Have you tried Sunitha's stall? It tastes like home."

Months turned into years. The handful of faithful customers became a morning ritual for fifty souls. Sunitha upgraded from borrowed vessels to her own gleaming pots, from a makeshift tarp to a proper canopy that bore her name painted in bold, hopeful letters.

But something more extraordinary happened. Young women from her neighborhood began appearing at her stall not just to eat, but to ask questions. "How did you start?" "What gave you courage?" "Could I do this too?"

Sunitha's stall became more than a business. It became a beacon proof that dreams don't require capital, just courage, consistency, and a willingness to serve others with everything you have.

Today, when the morning mist rolls in, five new food stalls dot the marketplace, each run by women who once stood nervously at Sunitha's side, asking, "Could I?" And she always answers the same way: "If I could with five thousand rupees and a borrowed stove, imagine what you can do."

Her success wasn't measured in rupees alone though those came. It was measured in every person who tasted possibility in her food, in every dream she helped kindle, in every morning she proved that small beginnings can cast long shadows.
`;


  const speakStory = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(storyText);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 max-w-screen-md mx-auto space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate(-1)}>← Back</Button>

      <div className="space-y-4">
        <img
          src="https://images.stockcake.com/public/a/d/e/ade4a3ff-194c-4f13-912b-49c45972fec3_large/vibrant-food-stall-stockcake.jpg"
          alt="Sunitha"
          className="w-full sm:w-48 h-48 object-cover rounded-lg mx-auto sm:mx-0 float-left sm:mr-4 mb-4"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold">{storyTitle}</h1>
          <OfflineBadge />
          <p className="text-sm text-muted-foreground whitespace-pre-line">{storyText}</p>
          <Button size="sm" variant="default" onClick={speakStory}>
            <Play className="h-4 w-4 mr-1" />
            {isSpeaking ? 'Stop' : 'Listen'}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Sunitha's Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"
              alt="Food Product"
              className="w-full h-32 object-cover"
            />
            <div className="p-2">
              <h3 className="font-semibold">Fresh Homemade Meals</h3>
              <p className="text-primary font-bold">Rs. 200/plate</p>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=400&h=300&fit=crop"
              alt="Snack Product"
              className="w-full h-32 object-cover"
            />
            <div className="p-2">
              <h3 className="font-semibold">Handmade Snacks</h3>
              <p className="text-primary font-bold">Rs. 50/pack</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
