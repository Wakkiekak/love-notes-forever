
import React, { useState } from 'react';
import { LoveProvider, useLove } from '@/lib/LoveContext';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BookHeart, Save, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const JournalPage = () => {
  const { journalEntries, saveEntry } = useLove();
  const [newEntry, setNewEntry] = useState('');
  
  // Sort entries newest first
  const sortedEntries = [...journalEntries].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  );

  const handleSave = () => {
    if (newEntry.trim()) {
      saveEntry({
        date: new Date(),
        content: newEntry
      });
      setNewEntry('');
      toast.success('Journal entry saved!');
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="text-center mb-8 mt-4">
          <h1 className="text-3xl font-dancing text-love-600 mb-2">Love Journal</h1>
          <p className="text-sm text-gray-600">Capture your thoughts and feelings</p>
        </div>
        
        <Card className="love-card mb-6">
          <CardContent className="p-4">
            <Textarea
              placeholder="Write your thoughts here..."
              className="min-h-32 p-4 focus:ring-love-400 font-quicksand"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
            />
            <div className="flex justify-end mt-3">
              <Button 
                onClick={handleSave}
                className="bg-love-gradient hover:opacity-90"
              >
                <Save size={16} className="mr-2" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-dancing text-purple-600 mb-3">Your Entries</h2>
        
        {sortedEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookHeart size={32} className="mx-auto mb-2 text-gray-300" />
            <p>No entries yet. Start writing!</p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {sortedEntries.map(entry => (
              <Card key={entry.id} className="love-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-gray-500 mb-2">
                      {format(entry.date, 'MMMM d, yyyy • h:mm a')}
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap font-quicksand">{entry.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Journal = () => {
  return (
    <LoveProvider>
      <Layout>
        <JournalPage />
      </Layout>
    </LoveProvider>
  );
};

export default Journal;
