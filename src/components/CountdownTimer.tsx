
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ANNIVERSARY_DATE } from '@/lib/data';
import { CalendarHeart } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';

const CountdownTimer: React.FC = () => {
  const [daysLeft, setDaysLeft] = useState(differenceInDays(ANNIVERSARY_DATE, new Date()));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft(differenceInDays(ANNIVERSARY_DATE, new Date()));
    }, 1000 * 60 * 60); // Update every hour
    
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="love-card mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-dancing text-love-600">Countdown to Anniversary</h2>
          <CalendarHeart size={22} className="text-love-500" />
        </div>
        
        <div className="flex flex-col items-center justify-center py-4 space-y-2">
          <div className="text-4xl font-bold text-purple-600">{daysLeft}</div>
          <div className="text-sm text-gray-600">days until</div>
          <div className="text-lg font-dancing text-love-500">
            {format(ANNIVERSARY_DATE, "MMMM d, yyyy")}
          </div>
          <div className="mt-2 text-sm text-center text-gray-500">
            Your first anniversary! 💍
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
