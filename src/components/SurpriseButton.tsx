
import React, { useState } from 'react';
import { getRandomContent } from '@/lib/data';
import { Heart, PawPrint } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';

const SurpriseButton: React.FC = () => {
  const [content, setContent] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTap = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setContent(getRandomContent());
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleTap}
          className={`paw-print-button ${isAnimating ? 'animate-wiggle' : ''}`}
          disabled={isAnimating}
        >
          <PawPrint size={28} className="text-purple-600" />
          <span className="absolute inset-0 bg-purple-gradient opacity-0 hover:opacity-20 rounded-full transition-opacity"></span>
        </button>
      </div>
      
      <div className="text-center mb-2">
        <h2 className="text-xl font-dancing text-purple-600">Tap for Love</h2>
        <p className="text-sm text-gray-600">A surprise just for you</p>
      </div>
      
      {content && (
        <Card className="love-card animate-slide-up">
          <CardContent className="p-6">
            <div className="relative overflow-hidden rounded-lg p-4 bg-love-50 border border-love-100">
              <div className="absolute top-0 right-0 opacity-10">
                <Heart size={60} fill="#F46BA8" className="transform -rotate-12" />
              </div>
              
              {content.type === 'message' && (
                <p className="text-lg font-dancing relative z-10">{content.content.content}</p>
              )}
              
              {content.type === 'fact' && (
                <div className="relative z-10">
                  <h3 className="font-medium mb-1 text-purple-600">{content.content.animal} Fact:</h3>
                  <p className="text-lg font-dancing">{content.content.fact}</p>
                </div>
              )}
              
              {content.type === 'memory' && (
                <div className="relative z-10">
                  <h3 className="font-medium mb-1 text-love-600">Memory ✨</h3>
                  <p className="text-lg font-dancing">{content.content.content}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SurpriseButton;
