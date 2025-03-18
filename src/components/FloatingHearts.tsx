
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartProps {
  size: number;
  left: string;
  delay: number;
  duration: number;
}

const FloatingHearts: React.FC<{ count: number }> = ({ count }) => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }).map((_, i) => ({
      size: Math.floor(Math.random() * 15) + 10,
      left: `${Math.floor(Math.random() * 90) + 5}%`,
      delay: Math.floor(Math.random() * 10),
      duration: Math.floor(Math.random() * 10) + 15,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart, index) => (
        <div
          key={index}
          className="absolute bottom-0 opacity-30"
          style={{
            left: heart.left,
            animation: `float ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
            transform: 'translateY(100vh)',
          }}
        >
          <Heart 
            fill="#F46BA8" 
            size={heart.size} 
            className="text-love-500" 
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
