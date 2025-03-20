
import React, { useState, useEffect, useRef } from 'react';
import { useLove } from '@/lib/LoveContext';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/use-sound';

const DuckChatbot: React.FC = () => {
  const { getDuckMessage } = useLove();
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');
  const [quackProbability, setQuackProbability] = useState(0.3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { playSound } = useSound();

  const toggleActive = () => {
    if (!isActive) {
      // If activating, play sound and get a new message
      playSound('click');
      
      // Determine if we should quack or say something meaningful
      const shouldQuack = Math.random() < quackProbability;
      
      if (shouldQuack) {
        setMessage(getDuckMessage('quack'));
        // Increase quack probability for next time (makes it less likely)
        setQuackProbability(Math.min(quackProbability + 0.1, 0.7));
      } else {
        // Get a random non-quack message
        const types = ['greeting', 'encouragement', 'fun'] as const;
        const randomType = types[Math.floor(Math.random() * types.length)];
        setMessage(getDuckMessage(randomType));
        // Reset quack probability (makes quack more likely next time)
        setQuackProbability(0.3);
      }
    }
    
    setIsActive(!isActive);
    
    // Auto-close after some time
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    if (!isActive) {
      timerRef.current = setTimeout(() => {
        setIsActive(false);
      }, 8000);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className={`duck-container ${isActive ? 'duck-active' : ''} z-50`}>
      <button 
        onClick={toggleActive}
        className="w-full h-full flex items-center justify-center"
        aria-label="Duck chatbot"
      >
        <motion.div
          animate={{ rotate: isActive ? [0, 15, -15, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-3xl" role="img" aria-label="Duck">🦆</span>
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="duck-chat z-50"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DuckChatbot;
