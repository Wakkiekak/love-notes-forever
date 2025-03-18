
import { format, differenceInDays, addDays, isAfter, isBefore, isToday } from 'date-fns';

// Types
export interface LoveMessage {
  id: number;
  content: string;
  type: 'daily' | 'surprise' | 'special';
}

export interface LoveLetter {
  id: number;
  title: string;
  content: string;
  unlockDate: Date;
  isUnlocked: boolean;
}

export interface SpecialDate {
  id: number;
  name: string;
  date: Date;
  description: string;
}

export interface JournalEntry {
  id: number;
  date: Date;
  content: string;
}

export interface AnimalFact {
  id: number;
  fact: string;
  animal: string;
}

// First meeting date - Mars & Pim
export const FIRST_DATE = new Date(2024, 2, 17); // March 17, 2024
export const ANNIVERSARY_DATE = new Date(2025, 2, 17); // March 17, 2025

// Daily messages
export const dailyMessages: LoveMessage[] = [
  { 
    id: 1, 
    content: "Hey beautiful, I hope your day is as amazing as you! 💖", 
    type: 'daily' 
  },
  { 
    id: 2, 
    content: `It's been ${differenceInDays(new Date(), FIRST_DATE)} days since we started dating, and I love you more every single day!`, 
    type: 'daily' 
  },
  { 
    id: 3, 
    content: "If you're reading this, imagine me giving you a big hug right now! 🤗", 
    type: 'daily' 
  },
  { 
    id: 4, 
    content: "Your smile makes my heart skip a beat every time! 💓", 
    type: 'daily' 
  },
  { 
    id: 5, 
    content: "I feel so lucky to have you in my life. You make everything better! ✨", 
    type: 'daily' 
  },
  { 
    id: 6, 
    content: "Just wanted to remind you how absolutely amazing you are! 💫", 
    type: 'daily' 
  },
  { 
    id: 7, 
    content: "Sending you a virtual kiss! 💋 Miss you lots when we're apart!", 
    type: 'daily' 
  },
  { 
    id: 8, 
    content: "You're my favorite person to talk to, laugh with, and just be around. 💕", 
    type: 'daily' 
  },
  { 
    id: 9, 
    content: "You make my heart so happy. Thank you for being you! 💖", 
    type: 'daily' 
  },
  { 
    id: 10, 
    content: "I love watching you do the things you're passionate about. Your enthusiasm is contagious! 💫", 
    type: 'daily' 
  },
];

// Surprise messages
export const surpriseMessages: LoveMessage[] = [
  { 
    id: 101, 
    content: "I love you, Mars! Tap me again if you need more love today! 💕", 
    type: 'surprise' 
  },
  { 
    id: 102, 
    content: "Did you know otters hold hands while sleeping? Just like I wish I could with you! 🦦❤️", 
    type: 'surprise' 
  },
  { 
    id: 103, 
    content: "You're cuter than a basket of puppies! And that's saying something! 🐶", 
    type: 'surprise' 
  },
  { 
    id: 104, 
    content: "If I had a star for every time you made me smile, I'd have an entire galaxy! ✨", 
    type: 'surprise' 
  },
  { 
    id: 105, 
    content: "Just thinking about you makes my day brighter! You're my sunshine! ☀️", 
    type: 'surprise' 
  },
  { 
    id: 106, 
    content: "Being with you feels like home, no matter where we are. 🏡💓", 
    type: 'surprise' 
  },
  { 
    id: 107, 
    content: "Remember when we first met? I knew you were special right away! 💫", 
    type: 'surprise' 
  },
  { 
    id: 108, 
    content: "You have the most beautiful soul. I'm so grateful for your kindness! 💝", 
    type: 'surprise' 
  },
];

// Special messages
export const specialMessages: LoveMessage[] = [
  { 
    id: 201, 
    content: "Happy Anniversary, my love! One year of us, and countless more to come! 💍", 
    type: 'special' 
  },
  { 
    id: 202, 
    content: "Happy Birthday to the most wonderful person in my life! I hope your day is as special as you are! 🎂🎉", 
    type: 'special' 
  },
];

// Love letters
export const loveLetters: LoveLetter[] = [
  {
    id: 1,
    title: "When We First Met",
    content: `My dearest Mars,

When I first saw you, something inside me just knew. It was like the universe whispered your name to my heart before we even spoke. Your smile lit up the room, and I couldn't look away.

Every moment we've shared since then has only made me fall deeper. The way you laugh, the way your eyes crinkle when you're happy, the way you care so deeply about everything and everyone around you.

You're my favorite person, my best friend, and the love of my life.

Forever yours,
Pim 💖`,
    unlockDate: new Date(2024, 0, 1), // Already unlocked
    isUnlocked: true
  },
  {
    id: 2,
    title: "For Our Anniversary",
    content: `My beautiful Mars,

One year together, and it feels both like forever and just the beginning. Every day with you is a gift that I cherish.

I love the life we're building together, the memories we're creating, and all our little inside jokes that make us laugh until we can't breathe.

I promise to always be there for you, to hold your hand through good times and bad, to love you with all my heart.

Here's to many, many more anniversaries together.

All my love,
Pim 💖`,
    unlockDate: ANNIVERSARY_DATE,
    isUnlocked: false
  },
  {
    id: 3,
    title: "Just Because I Love You",
    content: `My sweet Mars,

Sometimes I just need to tell you how much you mean to me. There's no special occasion, no particular reason - just me, overwhelmed by how much I love you.

You make ordinary days extraordinary. You turn simple moments into memories I'll treasure forever. Your kindness, your strength, your beautiful heart - everything about you amazes me.

I'm so lucky to call you mine.

All my heart,
Pim 💖`,
    unlockDate: addDays(new Date(), 7), // Unlocks in 7 days
    isUnlocked: false
  },
  {
    id: 4,
    title: "A Surprise Just For You",
    content: `My darling Mars,

Surprise! You've unlocked this letter just by being your wonderful self!

I wanted to remind you today that you are so incredibly loved. Your smile brightens my world. Your laughter is my favorite sound. Your touch makes my heart race.

You are everything I've ever dreamed of and more than I ever knew to wish for.

Loving you always,
Pim 💖`,
    unlockDate: addDays(new Date(), 30), // Unlocks in 30 days
    isUnlocked: false
  },
];

// Special dates
export const specialDates: SpecialDate[] = [
  {
    id: 1,
    name: "Our Anniversary",
    date: ANNIVERSARY_DATE,
    description: "One year of us! 💍"
  },
  {
    id: 2,
    name: "Mars's Birthday",
    date: new Date(2025, 3, 15), // Example - April 15, 2025
    description: "Happy Birthday to my love! 🎂"
  },
  {
    id: 3,
    name: "First Date",
    date: FIRST_DATE,
    description: "The day it all began! 💕"
  },
];

// Animal facts
export const animalFacts: AnimalFact[] = [
  {
    id: 1,
    animal: "Otter",
    fact: "Sea otters hold hands (paws) while sleeping so they don't drift apart in the water."
  },
  {
    id: 2,
    animal: "Penguin",
    fact: "Penguins mate for life, and some species even propose with a pebble!"
  },
  {
    id: 3,
    animal: "Elephant",
    fact: "Elephants can recognize themselves in mirrors and show empathy for other elephants."
  },
  {
    id: 4,
    animal: "Wolf",
    fact: "Wolves mate for life and are incredibly loyal to their partners."
  },
  {
    id: 5,
    animal: "Dolphin",
    fact: "Dolphins give each other names and call to each other specifically."
  },
  {
    id: 6,
    animal: "Cat",
    fact: "Cats purr at a frequency that can help heal bones and muscle tissue."
  },
  {
    id: 7,
    animal: "Dog",
    fact: "Dogs can understand up to 250 words and gestures, and can count up to five."
  },
  {
    id: 8,
    animal: "Rabbit",
    fact: "When rabbits are happy, they do a little jump and twist in the air called a 'binky'."
  },
];

// Helper functions
export function getDailyMessage(): LoveMessage {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % dailyMessages.length;
  return dailyMessages[index];
}

export function getRandomSurpriseMessage(): LoveMessage {
  const index = Math.floor(Math.random() * surpriseMessages.length);
  return surpriseMessages[index];
}

export function getRandomAnimalFact(): AnimalFact {
  const index = Math.floor(Math.random() * animalFacts.length);
  return animalFacts[index];
}

export function getDaysToAnniversary(): number {
  return differenceInDays(ANNIVERSARY_DATE, new Date());
}

export function checkAndUnlockLetters(): LoveLetter[] {
  const today = new Date();
  
  return loveLetters.map(letter => {
    // Check if letter should be unlocked
    if (!letter.isUnlocked && (isToday(letter.unlockDate) || isBefore(letter.unlockDate, today))) {
      return { ...letter, isUnlocked: true };
    }
    return letter;
  });
}

// Storage functions (using localStorage for demo purposes)
export function saveJournalEntry(entry: Omit<JournalEntry, 'id'>): JournalEntry {
  const entries = getJournalEntries();
  const newEntry = {
    id: entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1,
    ...entry
  };
  
  localStorage.setItem('journal', JSON.stringify([...entries, newEntry]));
  return newEntry;
}

export function getJournalEntries(): JournalEntry[] {
  const entries = localStorage.getItem('journal');
  if (!entries) return [];
  
  return JSON.parse(entries).map((entry: any) => ({
    ...entry,
    date: new Date(entry.date)
  }));
}

// Initialize data
export function initializeData() {
  const initialized = localStorage.getItem('initialized');
  if (!initialized) {
    localStorage.setItem('letters', JSON.stringify(loveLetters));
    localStorage.setItem('initialized', 'true');
  }
}

export function getLetters(): LoveLetter[] {
  const letters = localStorage.getItem('letters');
  if (!letters) return checkAndUnlockLetters();
  
  return JSON.parse(letters).map((letter: any) => ({
    ...letter,
    unlockDate: new Date(letter.unlockDate)
  }));
}

export function updateLetters(letters: LoveLetter[]) {
  localStorage.setItem('letters', JSON.stringify(letters));
}

// Generate random content for surprise button
export function getRandomContent(): { type: string; content: string | LoveMessage | AnimalFact } {
  const types = ['message', 'fact', 'memory'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  switch(type) {
    case 'message':
      return { type, content: getRandomSurpriseMessage() };
    case 'fact':
      return { type, content: getRandomAnimalFact() };
    case 'memory':
      return { 
        type, 
        content: {
          id: 301,
          content: "Remember that time we laughed so hard we couldn't breathe? That's one of my favorite memories! 💭",
          type: 'surprise'
        }
      };
    default:
      return { type: 'message', content: getRandomSurpriseMessage() };
  }
}
