import { Lightbulb, Play, Volume2 } from 'lucide-react';

interface DailyTipCardProps {
    tip: string;
    onPlayTip?: () => void;
}

export default function DailyTipCard({
                                         tip = "Save 10% of every income before spending. Small savings grow big!",
                                         onPlayTip
                                     }: DailyTipCardProps) {
    return (
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Daily Tip</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                {tip}
            </p>

            <button
                onClick={onPlayTip}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-lg text-sm font-medium text-amber-700 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
                <Volume2 className="h-4 w-4" />
                Listen to Tip
            </button>
        </div>
    );
}