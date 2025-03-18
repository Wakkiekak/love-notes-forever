
import React, { useEffect } from 'react';
import { LoveProvider } from '@/lib/LoveContext';
import Layout from '@/components/Layout';
import DailyMessage from '@/components/DailyMessage';
import CountdownTimer from '@/components/CountdownTimer';
import SurpriseButton from '@/components/SurpriseButton';
import { Card, CardContent } from '@/components/ui/card';
import { Hearts } from 'lucide-react';

const HomePage = () => {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-dancing text-love-600 mb-2">Mars & Pim</h1>
          <p className="text-sm text-gray-600">A love app just for you ❤️</p>
        </div>
        
        <DailyMessage />
        <CountdownTimer />
        <SurpriseButton />
        
        <div className="text-center mt-10 mb-6">
          <div className="inline-flex items-center text-gray-500 text-sm">
            <Hearts size={16} className="mr-1 text-love-400" />
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
        <HomePage />
      </Layout>
    </LoveProvider>
  );
};

export default Index;
