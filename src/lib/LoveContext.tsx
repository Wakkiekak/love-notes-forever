
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  LoveMessage, LoveLetter, JournalEntry, SpecialDate, TimelineEvent, MoodEntry,
  getDailyMessage, getLetters, updateLetters, checkAndUnlockLetters,
  getJournalEntries, saveJournalEntry, specialDates, initializeData,
  getTimelineEvents, saveTimelineEvent, getMoodEntries, saveMoodEntry, 
  themeEmojis, getRandomDuckMessage
} from './data';

interface LoveContextType {
  dailyMessage: LoveMessage;
  letters: LoveLetter[];
  specialDates: SpecialDate[];
  journalEntries: JournalEntry[];
  timelineEvents: TimelineEvent[];
  moodEntries: MoodEntry[];
  saveEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  saveTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => TimelineEvent;
  saveMoodEntry: (entry: Omit<MoodEntry, 'id'>) => MoodEntry;
  refreshDailyMessage: () => void;
  hasNewLetterToday: boolean;
  isDailyMessageOpened: boolean;
  setDailyMessageOpened: (opened: boolean) => void;
  getDuckMessage: (type?: 'greeting' | 'encouragement' | 'fun' | 'quack') => string;
  getEmojisForTheme: (theme: string) => string[];
}

const LoveContext = createContext<LoveContextType | undefined>(undefined);

export const LoveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dailyMessage, setDailyMessage] = useState<LoveMessage>(getDailyMessage());
  const [letters, setLetters] = useState<LoveLetter[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [hasNewLetterToday, setHasNewLetterToday] = useState(false);
  const [isDailyMessageOpened, setDailyMessageOpened] = useState(false);

  // Initialize on first load
  useEffect(() => {
    initializeData();
    refreshData();
    
    // Check if there's a newly unlocked letter today
    const updatedLetters = checkAndUnlockLetters();
    const newlyUnlocked = updatedLetters.some((letter, index) => 
      letter.isUnlocked && letters[index] && !letters[index].isUnlocked
    );
    
    if (newlyUnlocked) {
      setHasNewLetterToday(true);
      updateLetters(updatedLetters);
      setLetters(updatedLetters);
    }
    
    // Reset daily message opened status at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeToMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimer = setTimeout(() => {
      setDailyMessageOpened(false);
      refreshDailyMessage();
    }, timeToMidnight);
    
    return () => clearTimeout(midnightTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshData = () => {
    setDailyMessage(getDailyMessage());
    setLetters(getLetters());
    setJournalEntries(getJournalEntries());
    setTimelineEvents(getTimelineEvents());
    setMoodEntries(getMoodEntries());
  };

  const refreshDailyMessage = () => {
    setDailyMessage(getDailyMessage());
  };

  const saveEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry = saveJournalEntry(entry);
    setJournalEntries([...journalEntries, newEntry]);
  };
  
  const saveTimelineEventHandler = (event: Omit<TimelineEvent, 'id'>) => {
    const newEvent = saveTimelineEvent(event);
    setTimelineEvents([...timelineEvents, newEvent]);
    return newEvent;
  };
  
  const saveMoodEntryHandler = (entry: Omit<MoodEntry, 'id'>) => {
    const newEntry = saveMoodEntry(entry);
    setMoodEntries([...moodEntries, newEntry]);
    return newEntry;
  };
  
  const getDuckMessage = (type?: 'greeting' | 'encouragement' | 'fun' | 'quack') => {
    return getRandomDuckMessage(type).message;
  };
  
  const getEmojisForTheme = (theme: string) => {
    return themeEmojis[theme] || themeEmojis.default;
  };

  return (
    <LoveContext.Provider 
      value={{
        dailyMessage,
        letters,
        specialDates,
        journalEntries,
        timelineEvents,
        moodEntries,
        saveEntry,
        saveTimelineEvent: saveTimelineEventHandler,
        saveMoodEntry: saveMoodEntryHandler,
        refreshDailyMessage,
        hasNewLetterToday,
        isDailyMessageOpened,
        setDailyMessageOpened,
        getDuckMessage,
        getEmojisForTheme
      }}
    >
      {children}
    </LoveContext.Provider>
  );
};

export const useLove = () => {
  const context = useContext(LoveContext);
  if (context === undefined) {
    throw new Error('useLove must be used within a LoveProvider');
  }
  return context;
};
