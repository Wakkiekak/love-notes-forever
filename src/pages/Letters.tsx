
import React, { useEffect, useState } from 'react';
import { LoveProvider, useLove } from '@/lib/LoveContext';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircleHeart, LockKeyhole, HeartHandshake } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';

const LettersPage = () => {
  const { letters } = useLove();
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  
  const openLetter = (id: number) => {
    setSelectedLetter(id);
  };
  
  const closeLetter = () => {
    setSelectedLetter(null);
  };
  
  const currentLetter = letters.find(letter => letter.id === selectedLetter);

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="text-center mb-8 mt-4">
          <h1 className="text-3xl font-dancing text-love-600 mb-2">Love Letters</h1>
          <p className="text-sm text-gray-600">Special notes just for you</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          {letters.map(letter => (
            <Card 
              key={letter.id}
              className={`transition-all duration-300 ${
                letter.isUnlocked 
                  ? 'love-card cursor-pointer hover:shadow-lg hover:scale-[1.02]' 
                  : 'bg-gray-100 border border-gray-200'
              }`}
              onClick={() => letter.isUnlocked && openLetter(letter.id)}
            >
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h2 className={`text-xl ${letter.isUnlocked ? 'font-dancing text-purple-600' : 'text-gray-400'}`}>
                    {letter.title}
                  </h2>
                  
                  {letter.isUnlocked ? (
                    <p className="text-xs text-gray-500 mt-1">
                      Tap to read
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Unlocks on {format(letter.unlockDate, 'MMMM d, yyyy')}
                    </p>
                  )}
                </div>
                
                {letter.isUnlocked ? (
                  <MessageCircleHeart size={24} className="text-love-500" />
                ) : (
                  <LockKeyhole size={24} className="text-gray-400" />
                )}
              </CardContent>
            </Card>
          ))}
          
          {letters.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <HeartHandshake size={40} className="mx-auto mb-2 text-gray-300" />
              <p>Letters will appear here as they are unlocked</p>
            </div>
          )}
        </div>
        
        <Dialog open={selectedLetter !== null} onOpenChange={closeLetter}>
          <DialogContent className="bg-white p-0 max-w-md">
            <DialogHeader className="bg-love-gradient text-white p-4 rounded-t-lg">
              <DialogTitle className="font-dancing text-2xl">
                {currentLetter?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="p-6">
              {currentLetter?.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4 font-quicksand leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const Letters = () => {
  return (
    <LoveProvider>
      <Layout>
        <LettersPage />
      </Layout>
    </LoveProvider>
  );
};

export default Letters;
