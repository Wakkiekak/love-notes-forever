
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
export const FIRST_DATE = new Date(2025, 2, 17); // March 17, 2024
export const ANNIVERSARY_DATE = new Date(2026, 2, 17); // March 17, 2025

// Daily messages
export const dailyMessages: LoveMessage[] = [
  { 
    id: 1, 
    content: "Hey mars, I hope your day is amazing today! 💖", 
    type: 'daily' 
  },
  { 
    id: 2, 
    content: `It's been ${differenceInDays(new Date(), FIRST_DATE)} days since we started dating, and I love you more every single day!`, 
    type: 'daily' 
  },
  { 
    id: 3, 
    content: "If you're reading this, im probably thinking about you 💓", 
    type: 'daily' 
  },
  { 
    id: 4, 
    content: "You make my life so much funnier!", 
    type: 'daily' 
  },
  { 
    id: 5, 
    content: "You make everything better! ✨", 
    type: 'daily' 
  },
  { 
    id: 6, 
    content: "Just wanted to remind you how amazing you are!", 
    type: 'daily' 
  },
  { 
    id: 7, 
    content: "I miss you lots when we're apart!", 
    type: 'daily' 
  },
  { 
    id: 8, 
    content: "You're my favorite person to talk to!", 
    type: 'daily' 
  },
  { 
    id: 9, 
    content: "You make me so happy. Thank you for being you! 💖", 
    type: 'daily' 
  },
  { 
    id: 10, 
    content: "I love watching you do the things you're passionate about. Your happines is contagious!", 
    type: 'daily' 
  },
];

// Surprise messages
export const surpriseMessages: LoveMessage[] = [
  { 
    id: 101, 
    content: "I love you, Mars!", 
    type: 'surprise' 
  },
  { 
    id: 102, 
    content: "I really miss you ngl 😭", 
    type: 'surprise' 
  },
  { 
    id: 103, 
    content: "You're glasses suit you really well!", 
    type: 'surprise' 
  },
  { 
    id: 104, 
    content: "If I had a star for every time you made me smile, I would have the milkey way.", 
    type: 'surprise' 
  },
  { 
    id: 105, 
    content: "Just thinking about you makes my day better!", 
    type: 'surprise' 
  },
  { 
    id: 106, 
    content: "Being with you feels so right.", 
    type: 'surprise' 
  },
  { 
    id: 107, 
    content: "de9eb2", 
    type: 'surprise' 
  },
  { 
    id: 108, 
    content: "You are so nice bro 😭", 
    type: 'surprise' 
  },
];

// Special messages
export const specialMessages: LoveMessage[] = [
  { 
    id: 201, 
    content: "Happy Anniversary!", 
    type: 'special' 
  },
  { 
    id: 202, 
    content: "Happy Birthday to the most wonderful person in my life!", 
    type: 'special' 
  },
];

// Love letters
export const loveLetters: LoveLetter[] = [
  {
    id: 1,
    title: "When we first",
    content: `My best Mars,

When you told me you liked me and ghosted me for like 5 minutes 😭, I knew you were nervous, but thats what I like about you. Somehow you still mustered up the courage to ask me. Proud of you ♥

Oh and simon with his panic, it was so cute! So happy you asked (I would be to nervous myself). 

I hope we keep talking every day and night. I hope this lasts...

Pim 💖`,
    unlockDate: new Date(2025, 0, 1), // Already unlocked
    isUnlocked: true
  },
  {
    id: 2,
    title: "For Our Anniversary",
    content: `My beautiful Mars,

One year together, and it feels both like forever and just the beginning. Every day with you is a gift that I cherish.

I love the life we're building together, the memories we're creating, and all our little inside jokes that make us laugh until we can't breathe.

I promise to always be there for you, through good times and bad, to love you with all my heart.

Here's to many, many more anniversaries together.

All my love,
Pim 💖`,
    unlockDate: ANNIVERSARY_DATE,
    isUnlocked: false
  },
  {
    id: 3,
    title: "Just Because I Love You",
    content: `Mars,

I just wanted to say how much I apprieciate you ❤❤

Our simple chats mean so much to me. I hope they do the same to you. Your the best.

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


Hey mars! Just wanted to say how much I apriecate you! you've always been nice to me. 💞

I just wanted to tall you how much I love you, whenever I think about you my hearts just starts pacing so fast 😭🙏 

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
    description: "One year already, damn mars! One whole orbit 💓"
  },
  {
    id: 2,
    name: "Mars's Birthday",
    date: new Date(2025, 10, 19), // Example - April 15, 2025
    description: "Happy Birthday, Mars made another orbit 💞"
  },
  {
    id: 3,
    name: "First Date",
    date: FIRST_DATE,
    description: "The day it all began! 💕"
  },
];

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
  // New 20 animal facts
  {
    id: 9,
    animal: "Koala",
    fact: "Koalas sleep up to 18-22 hours a day, mainly because their diet of eucalyptus leaves doesn't provide much energy."
  },
  {
    id: 10,
    animal: "Sloth",
    fact: "Sloths can hold their breath for up to 40 minutes while underwater."
  },
  {
    id: 11,
    animal: "Giraffe",
    fact: "Giraffes have a tongue that is 18-20 inches long and is blue to protect it from sunburn."
  },
  {
    id: 12,
    animal: "Kangaroo",
    fact: "Kangaroos can't walk backward, they can only hop forward."
  },
  {
    id: 13,
    animal: "Octopus",
    fact: "Octopuses have three hearts, and their blood is blue due to copper-based hemocyanin."
  },
  {
    id: 14,
    animal: "Turtle",
    fact: "Some species of turtles can live to be over 100 years old."
  },
  {
    id: 15,
    animal: "Horse",
    fact: "Horses can sleep both lying down and standing up."
  },
  {
    id: 16,
    animal: "Cheetah",
    fact: "Cheetahs can go from 0 to 60 mph in just a few seconds, making them the fastest land animal."
  },
  {
    id: 17,
    animal: "Flamingo",
    fact: "Flamingos are not born with pink feathers. They get their color from eating shrimp and algae."
  },
  {
    id: 18,
    animal: "Panda",
    fact: "Pandas spend up to 12 hours a day eating bamboo, which makes up almost their entire diet."
  },
  {
    id: 19,
    animal: "Hummingbird",
    fact: "Hummingbirds are the only birds that can fly backwards."
  },
  {
    id: 20,
    animal: "Whale",
    fact: "Blue whales are the largest animals ever known to have lived on Earth, growing up to 100 feet long."
  },
  {
    id: 21,
    animal: "Bat",
    fact: "Bats are the only mammals capable of sustained flight, and they can eat up to 1,200 mosquitoes in an hour."
  },
  {
    id: 22,
    animal: "Lynx",
    fact: "The lynx has tufted ears and incredibly sharp vision, able to spot prey from a mile away."
  },
  {
    id: 23,
    animal: "Sea Lion",
    fact: "Sea lions can walk on land using their front flippers, unlike seals who have to wriggle on their bellies."
  },
  {
    id: 24,
    animal: "Mantis Shrimp",
    fact: "Mantis shrimp have the most complex eyes in the animal kingdom, capable of seeing ultraviolet light."
  },
  {
    id: 25,
    animal: "Chameleon",
    fact: "Chameleons can change their color to communicate, regulate temperature, and blend into their environment."
  },
  {
    id: 26,
    animal: "Meerkat",
    fact: "Meerkats live in highly social groups and always have a 'sentry' standing guard to warn of predators."
  },
  {
    id: 27,
    animal: "Bison",
    fact: "Bison can run up to 35 miles per hour and jump over 6 feet high."
  },
  {
    id: 28,
    animal: "Penguin",
    fact: "Some species of penguins can 'fly' underwater, using their wings as flippers to propel themselves."
  },
  {
    id: 29,
    animal: "Zebra",
    fact: "Zebras' stripes are unique, much like human fingerprints. No two zebras have the same pattern."
  }
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
          content: "When you asked me out you were so nervous, it was so cute 😊",
          type: 'surprise'
        }
      };
    default:
      return { type: 'message', content: getRandomSurpriseMessage() };
  }
}
