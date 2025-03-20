
import React, { useState } from 'react';
import { useLove } from '@/lib/LoveContext';
import { useTheme } from '@/lib/ThemeContext';
import { Calendar as CalendarIcon, Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useSound } from '@/hooks/use-sound';

const Timeline: React.FC = () => {
  const { timelineEvents, saveTimelineEvent } = useLove();
  const { theme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    emoji: '❤️'
  });
  const { playSound } = useSound();
  
  const emojiOptions = ['❤️', '💑', '💍', '🎁', '🎂', '🎉', '📅', '✨', '💕', '🥂', '🍰', '🎭', '🎨', '🚗', '✈️', '🏠', '📝', '🎵', '📸', '🎬'];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newEvent.title.trim() && newEvent.date) {
      saveTimelineEvent({
        date: new Date(newEvent.date),
        title: newEvent.title,
        description: newEvent.description,
        emoji: newEvent.emoji
      });
      
      playSound('success');
      
      // Reset form
      setNewEvent({
        title: '',
        description: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        emoji: '❤️'
      });
      
      // Close dialog
      setIsDialogOpen(false);
    }
  };
  
  const sortedEvents = [...timelineEvents].sort((a, b) => b.date.getTime() - a.date.getTime());
  
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-dancing text-primary">Our Relationship Timeline</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" onClick={() => playSound('click')}>
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Special Moment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Select an Emoji
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className={`p-2 rounded-md text-xl ${newEvent.emoji === emoji ? 'bg-primary/20' : 'hover:bg-muted'}`}
                      onClick={() => setNewEvent({...newEvent, emoji})}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
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
        {sortedEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No special moments yet. Add your first memory!</p>
          </div>
        ) : (
          <div className="relative pl-8">
            {sortedEvents.map((event, index) => (
              <div key={event.id} className="timeline-card">
                {index < sortedEvents.length - 1 && <div className="timeline-connector" />}
                <div className="absolute left-[-20px] top-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span role="img" aria-label="Event emoji">
                    {event.emoji || '❤️'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {format(event.date, 'MMMM d, yyyy')}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Timeline;
