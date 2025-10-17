import { Award, TrendingUp, DollarSign, Wrench } from 'lucide-react';

interface ProgressCardProps {
    percentage: number;
    completedStories: number;
    badges: Array<{ label: string; icon: 'money' | 'skill' }>;
}

export default function ProgressCard({
                                         percentage = 60,
                                         completedStories = 3,
                                         badges = [
                                             { label: 'Smart Saver', icon: 'money' },
                                             { label: 'Skill Builder', icon: 'skill' }
                                         ]
                                     }: ProgressCardProps) {
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference * (1 - percentage / 100);

    const getBadgeIcon = (type: 'money' | 'skill') => {
        return type === 'money' ? DollarSign : Wrench;
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Award className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">My Progress</h2>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 96 96">
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="#f1f5f9"
                            strokeWidth="6"
                            fill="none"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="url(#progressGradient)"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-700 ease-out"
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#1d4ed8" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-600">
              {completedStories} stories completed
            </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {badges.map((badge, index) => {
                            const IconComponent = getBadgeIcon(badge.icon);
                            return (
                                <div
                                    key={index}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <IconComponent className="h-3 w-3" />
                                    {badge.label}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}