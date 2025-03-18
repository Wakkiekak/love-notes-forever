
import React, { useState } from 'react';
import { useLove } from '@/lib/LoveContext';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const DailyMessage: React.FC = () => {
  const { dailyMessage, refreshDailyMessage } = useLove();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => {
      refreshDailyMessage();
      setIsAnimating(false);
    }, 500);
  };

  return (
    <Card className="love-card mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-dancing text-love-600">Today's Love Note</h2>
          <button 
            onClick={handleRefresh}
            className={`text-love-500 p-2 rounded-full transition-all ${isAnimating ? 'rotate-180' : ''}`}
            disabled={isAnimating}
          >
            <Heart className={`${isAnimating ? 'animate-pulse-heart' : ''}`} size={20} fill="#F46BA8" />
          </button>
        </div>
        
        <div className="relative overflow-hidden rounded-lg p-4 bg-love-50 border border-love-100">
          <div className="absolute top-0 right-0 opacity-10">
            <Heart size={80} fill="#F46BA8" className="transform -rotate-12" />
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
