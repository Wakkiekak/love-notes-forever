
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  LoveMessage, LoveLetter, JournalEntry, SpecialDate, 
  getDailyMessage, getLetters, updateLetters, checkAndUnlockLetters,
  getJournalEntries, saveJournalEntry, specialDates, initializeData
} from './data';

interface LoveContextType {
  dailyMessage: LoveMessage;
  letters: LoveLetter[];
  specialDates: SpecialDate[];
  journalEntries: JournalEntry[];
  saveEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  refreshDailyMessage: () => void;
  hasNewLetterToday: boolean;
}

const LoveContext = createContext<LoveContextType | undefined>(undefined);

export const LoveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dailyMessage, setDailyMessage] = useState<LoveMessage>(getDailyMessage());
  const [letters, setLetters] = useState<LoveLetter[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [hasNewLetterToday, setHasNewLetterToday] = useState(false);

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
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshData = () => {
    setDailyMessage(getDailyMessage());
    setLetters(getLetters());
    setJournalEntries(getJournalEntries());
  };

  const refreshDailyMessage = () => {
    setDailyMessage(getDailyMessage());
  };

  const saveEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry = saveJournalEntry(entry);
    setJournalEntries([...journalEntries, newEntry]);
  };

  return (
    <LoveContext.Provider 
      value={{
        dailyMessage,
        letters,
        specialDates,
        journalEntries,
        saveEntry,
        refreshDailyMessage,
        hasNewLetterToday
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
