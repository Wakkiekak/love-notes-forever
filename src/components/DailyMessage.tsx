
import React, { useState, useEffect } from 'react';
import { useLove } from '@/lib/LoveContext';
import { useTheme } from '@/lib/ThemeContext';
import { Heart, Gift, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/use-sound';

const DailyMessage: React.FC = () => {
  const { dailyMessage, isDailyMessageOpened, setDailyMessageOpened } = useLove();
  const { theme, previewTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const activeTheme = previewTheme || theme;
  const { playSound } = useSound();
  
  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleOpenGift = () => {
    if (!isDailyMessageOpened) {
      playSound('success');
      setDailyMessageOpened(true);
    }
  };

  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'mars':
        return {
          heartColor: '#DC2626',
          bgColor: 'bg-mars-50',
          borderColor: 'border-mars-200',
          giftPrimary: 'from-mars-500 to-mars-400',
          giftSecondary: 'from-mars-700 to-mars-600',
          ribbonColor: 'bg-mars-300'
        };
      case 'ocean':
        return {
          heartColor: '#3B82F6',
          bgColor: 'bg-ocean-50',
          borderColor: 'border-ocean-200',
          giftPrimary: 'from-ocean-500 to-ocean-400',
          giftSecondary: 'from-ocean-700 to-ocean-600',
          ribbonColor: 'bg-ocean-300'
        };
      case 'forest':
        return {
          heartColor: '#22C55E',
          bgColor: 'bg-forest-50',
          borderColor: 'border-forest-200',
          giftPrimary: 'from-forest-500 to-forest-400',
          giftSecondary: 'from-forest-700 to-forest-600',
          ribbonColor: 'bg-forest-300'
        };
      case 'sunset':
        return {
          heartColor: '#F97316',
          bgColor: 'bg-sunset-100',
          borderColor: 'border-sunset-200',
          giftPrimary: 'from-sunset-500 to-sunset-400',
          giftSecondary: 'from-sunset-700 to-sunset-600',
          ribbonColor: 'bg-sunset-300'
        };
      case 'midnight':
        return {
          heartColor: '#6366F1',
          bgColor: 'bg-midnight-900',
          borderColor: 'border-midnight-700 text-white',
          giftPrimary: 'from-midnight-500 to-midnight-400',
          giftSecondary: 'from-midnight-700 to-midnight-600',
          ribbonColor: 'bg-midnight-300'
        };
      case 'retro':
        return {
          heartColor: '#9B6A56',
          bgColor: 'bg-retro-200',
          borderColor: 'border-retro-300',
          giftPrimary: 'from-retro-500 to-retro-400',
          giftSecondary: 'from-retro-700 to-retro-600',
          ribbonColor: 'bg-retro-300'
        };
      default:
        return {
          heartColor: '#F46BA8',
          bgColor: 'bg-love-50',
          borderColor: 'border-love-100',
          giftPrimary: 'from-love-500 to-love-400',
          giftSecondary: 'from-love-700 to-love-600',
          ribbonColor: 'bg-love-300'
        };
    }
  };

  const { heartColor, bgColor, borderColor, giftPrimary, giftSecondary, ribbonColor } = getThemeStyles();

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
        
        <div className={`relative ${isDailyMessageOpened ? '' : 'h-48'}`}>
          {!isDailyMessageOpened ? (
            <div 
              className={`gift-wrap ${isDailyMessageOpened ? 'gift-open' : ''} max-w-[200px] h-[160px]`}
              onClick={handleOpenGift}
            >
              <div className={`gift-lid bg-gradient-to-b ${giftPrimary}`}></div>
              <div className={`gift-box bg-gradient-to-t ${giftSecondary}`}>
                <Gift className="text-white w-8 h-8 z-10" />
              </div>
              <div className={`gift-ribbon ${ribbonColor}`}></div>
              <motion.div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Sparkles className="text-white/80 w-6 h-6" />
              </motion.div>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`relative overflow-hidden rounded-lg p-4 ${bgColor} border ${borderColor}`}
              >
                <div className="absolute top-0 right-0 opacity-10">
                  <Heart size={80} fill={heartColor} className="transform -rotate-12" />
                </div>
                
                <p className="text-lg font-dancing relative z-10">
                  {dailyMessage.content}
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyMessage;
