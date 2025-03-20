
import React, { useEffect } from 'react';
import { LoveProvider } from '@/lib/LoveContext';
import Layout from '@/components/Layout';
import DailyMessage from '@/components/DailyMessage';
import CountdownTimer from '@/components/CountdownTimer';
import SurpriseButton from '@/components/SurpriseButton';
import Timeline from '@/components/Timeline';
import MoodTracker from '@/components/MoodTracker';
import DuckChatbot from '@/components/DuckChatbot';
import FloatingEmojis from '@/components/FloatingEmojis';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

const HomePage = () => {
  return (
    <Card className="border-none shadow-none bg-transparent relative z-10">
      <CardContent className="p-0">
        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-fredoka text-love-600 mb-2">Mars & Pim</h1>
          <p className="text-sm text-gray-600">A love app just for you ❤️</p>
        </div>
        
        <DailyMessage />
        <CountdownTimer />
        <SurpriseButton />
        <Timeline />
        <MoodTracker />
        
        <div className="text-center mt-10 mb-6">
          <div className="inline-flex items-center text-gray-500 text-sm">
            <Heart size={16} className="mr-1 text-love-400" />
            <span>Made with love by Pim</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <LoveProvider>
      <Layout>
        <FloatingEmojis />
        <HomePage />
        <DuckChatbot />
      </Layout>
    </LoveProvider>
  );
};

export default Index;
