
import React from 'react';
import { LoveProvider, useLove } from '@/lib/LoveContext';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { format, isAfter, isBefore, formatDistance } from 'date-fns';
import { CalendarHeart, CalendarClock } from 'lucide-react';

const CalendarPage = () => {
  const { specialDates } = useLove();
  
  // Sort dates from soonest to furthest
  const sortedDates = [...specialDates].sort((a, b) => {
    const now = new Date();
    const aDiff = Math.abs(a.date.getTime() - now.getTime());
    const bDiff = Math.abs(b.date.getTime() - now.getTime());
    return aDiff - bDiff;
  });

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="text-center mb-8 mt-4">
          <h1 className="text-3xl font-dancing text-love-600 mb-2">Special Dates</h1>
          <p className="text-sm text-gray-600">Our important moments</p>
        </div>
        
        <div className="space-y-4 mb-8">
          {sortedDates.map(date => {
            const isPast = isBefore(date.date, new Date());
            
            return (
              <Card key={date.id} className="love-card overflow-hidden">
                <div className="bg-purple-gradient text-white p-3">
                  <h2 className="font-dancing text-xl">{date.name}</h2>
                  <p className="text-sm opacity-90">{format(date.date, 'MMMM d, yyyy')}</p>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {isPast ? (
                      <CalendarHeart size={24} className="text-love-500 mt-1" />
                    ) : (
                      <CalendarClock size={24} className="text-purple-500 mt-1" />
                    )}
                    
                    <div>
                      <p className="text-gray-700">{date.description}</p>
                      
                      <p className="text-sm text-gray-500 mt-2">
                        {isPast ? (
                          <>
                            <span className="font-medium text-love-600">
                              {formatDistance(date.date, new Date(), { addSuffix: true })}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="font-medium text-purple-600">
                              {formatDistance(date.date, new Date(), { addSuffix: false })}
                            </span> from now
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const Calendar = () => {
  return (
    <LoveProvider>
      <Layout>
        <CalendarPage />
      </Layout>
    </LoveProvider>
  );
};

export default Calendar;
