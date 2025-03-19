
import React, { useState } from 'react';
import { useLove } from '@/lib/LoveContext';
import { useTheme } from '@/lib/ThemeContext';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const DailyMessage: React.FC = () => {
  const { dailyMessage, refreshDailyMessage } = useLove();
  const { theme, previewTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const activeTheme = previewTheme || theme;

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => {
      refreshDailyMessage();
      setIsAnimating(false);
    }, 500);
  };

  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'mars':
        return {
          heartColor: '#DC2626',
          bgColor: 'bg-mars-50',
          borderColor: 'border-mars-200'
        };
      case 'ocean':
        return {
          heartColor: '#3B82F6',
          bgColor: 'bg-ocean-50',
          borderColor: 'border-ocean-200'
        };
      case 'forest':
        return {
          heartColor: '#22C55E',
          bgColor: 'bg-forest-50',
          borderColor: 'border-forest-200'
        };
      case 'sunset':
        return {
          heartColor: '#F97316',
          bgColor: 'bg-sunset-100',
          borderColor: 'border-sunset-200'
        };
      case 'midnight':
        return {
          heartColor: '#6366F1',
          bgColor: 'bg-midnight-900',
          borderColor: 'border-midnight-700 text-white'
        };
      case 'retro':
        return {
          heartColor: '#9B6A56',
          bgColor: 'bg-retro-200',
          borderColor: 'border-retro-300'
        };
      default:
        return {
          heartColor: '#F46BA8',
          bgColor: 'bg-love-50',
          borderColor: 'border-love-100'
        };
    }
  };

  const { heartColor, bgColor, borderColor } = getThemeStyles();

  return (
    <Card className="love-card mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-dancing text-primary">Today's Love Note</h2>
          <button 
            onClick={handleRefresh}
            className={`text-primary p-2 rounded-full transition-all ${isAnimating ? 'rotate-180' : ''}`}
            disabled={isAnimating}
          >
            <Heart className={`${isAnimating ? 'animate-pulse-heart' : ''}`} size={20} fill={heartColor} />
          </button>
        </div>
        
        <div className={`relative overflow-hidden rounded-lg p-4 ${bgColor} border ${borderColor}`}>
          <div className="absolute top-0 right-0 opacity-10">
            <Heart size={80} fill={heartColor} className="transform -rotate-12" />
          </div>
          
          <p className="text-lg font-dancing relative z-10">
            {dailyMessage.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyMessage;
