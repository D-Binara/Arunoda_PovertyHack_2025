import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function StoryCard({ storyTitle, isSpeaking, speakStory }) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100">
      {/* Image Section */}
      <div className="relative">
        <img
          src="/img/Home/story.png"
          alt="Featured story"
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

        {/* title overlay (optional) */}
        <div className="absolute bottom-2 left-3 text-white drop-shadow-md">
          <h3 className="text-lg font-semibold">{storyTitle}</h3>
          <p className="text-xs opacity-90">
            From Rs. 5,000 to 50+ daily customers
          </p>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="default"
              onClick={speakStory}
              className="bg-[#F57C00] hover:bg-[#EF6C00] text-white"
            >
              <Play className="h-4 w-4 mr-1" />
              {isSpeaking ? "Stop" : "Listen"}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate("/stories/sunitha")}
              className="border-[#F57C00] text-[#F57C00] hover:bg-orange-50"
            >
              View Story
            </Button>
          </div>

          {/* <OfflineBadge /> */}
        </div>
      </CardContent>
    </Card>
  );
}
