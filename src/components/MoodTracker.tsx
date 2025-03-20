
import React, { useState } from 'react';
import { useLove } from '@/lib/LoveContext';
import { Smile, MessageCircle, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useSound } from '@/hooks/use-sound';

const MoodTracker: React.FC = () => {
  const { moodEntries, saveMoodEntry } = useLove();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    mood: 'neutral' as 'happy' | 'excited' | 'loved' | 'sad' | 'stressed' | 'neutral',
    note: ''
  });
  const { playSound } = useSound();
  
  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊' },
    { id: 'excited', label: 'Excited', emoji: '🤩' },
    { id: 'loved', label: 'Loved', emoji: '❤️' },
    { id: 'sad', label: 'Sad', emoji: '😢' },
    { id: 'stressed', label: 'Stressed', emoji: '😓' },
    { id: 'neutral', label: 'Neutral', emoji: '😐' }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newEntry.mood) {
      saveMoodEntry({
        date: new Date(),
        mood: newEntry.mood,
        note: newEntry.note
      });
      
      playSound('success');
      
      // Reset form
      setNewEntry({
        mood: 'neutral',
        note: ''
      });
      
      // Close dialog
      setIsDialogOpen(false);
    }
  };
  
  const sortedEntries = [...moodEntries].sort((a, b) => b.date.getTime() - a.date.getTime());
  
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-dancing text-primary">Mood Tracker</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" onClick={() => playSound('click')}>
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How are you feeling?</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Select your mood
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.id}
                      type="button"
                      className={`p-3 rounded-md flex flex-col items-center gap-1 transition-all ${
                        newEntry.mood === mood.id 
                          ? 'bg-primary/20 shadow-sm' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setNewEntry({...newEntry, mood: mood.id as any})}
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-xs">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="note" className="text-sm font-medium">
                  Add a note (optional)
                </label>
                <Textarea
                  id="note"
                  value={newEntry.note}
                  onChange={(e) => setNewEntry({...newEntry, note: e.target.value})}
                  placeholder="What's on your mind?"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline" type="button">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {sortedEntries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No mood entries yet. Share how you're feeling!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedEntries.slice(0, 5).map((entry) => {
              const mood = moods.find(m => m.id === entry.mood);
              
              return (
                <div key={entry.id} className={`mood-card mood-${entry.mood}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{mood?.emoji}</span>
                    <h3 className="font-medium">{mood?.label}</h3>
                    <div className="ml-auto flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {format(entry.date, 'MMM d, h:mm a')}
                    </div>
                  </div>
                  
                  {entry.note && (
                    <div className="flex gap-2 items-start mt-2 text-sm">
                      <MessageCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <p>{entry.note}</p>
                    </div>
                  )}
                </div>
              );
            })}
            
            {sortedEntries.length > 5 && (
              <div className="text-center pt-2">
                <Button variant="ghost" size="sm">
                  View all {sortedEntries.length} entries
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
