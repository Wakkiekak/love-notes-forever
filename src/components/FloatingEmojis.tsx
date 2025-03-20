
import React, { useEffect, useState, useRef } from 'react';
import { useLove } from '@/lib/LoveContext';
import { useTheme } from '@/lib/ThemeContext';
import { Heart, Bird } from 'lucide-react';

interface EmojiPosition {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  speed: number;
  rotation: number;
  isIcon?: boolean;
  iconType?: 'heart' | 'bird';
}

const FloatingEmojis: React.FC = () => {
  const { getEmojisForTheme } = useLove();
  const { theme } = useTheme();
  const [emojis, setEmojis] = useState<EmojiPosition[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set up initial emojis
  useEffect(() => {
    const themeEmojis = getEmojisForTheme(theme);
    const newEmojis: EmojiPosition[] = [];
    
    // Create 15-20 random emojis
    const count = Math.floor(Math.random() * 6) + 15; // 15-20 emojis
    
    for (let i = 0; i < count; i++) {
      // Determine if this should be a Lucide icon or an emoji
      const useIcon = Math.random() > 0.5;
      const iconType = Math.random() > 0.5 ? 'heart' : 'bird';
      
      newEmojis.push({
        id: i,
        x: Math.random() * 100, // random position as percentage of container
        y: Math.random() * 100,
        emoji: useIcon ? '' : themeEmojis[Math.floor(Math.random() * themeEmojis.length)],
        size: Math.random() * 2 + 1, // 1-3rem
        speed: Math.random() * 0.2 + 0.1, // movement speed
        rotation: Math.random() * 360, // initial rotation
        isIcon: useIcon,
        iconType: useIcon ? iconType : undefined
      });
    }
    
    setEmojis(newEmojis);
  }, [theme, getEmojisForTheme]);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Helper to get theme-specific colors
  const getThemeColor = () => {
    switch (theme) {
      case 'mars': return '#DC2626';
      case 'ocean': return '#3B82F6';
      case 'forest': return '#22C55E';
      case 'sunset': return '#F97316';
      case 'midnight': return '#6366F1';
      case 'retro': return '#9B6A56';
      default: return '#F46BA8';
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {emojis.map((emoji) => {
        // Calculate parallax effect based on distance from mouse
        const parallaxX = (emoji.x - mousePosition.x) * (emoji.speed * -0.1);
        const parallaxY = (emoji.y - mousePosition.y) * (emoji.speed * -0.1);
        
        return (
          <div
            key={emoji.id}
            className="floating-emoji"
            style={{
              left: `${emoji.x}%`,
              top: `${emoji.y}%`,
              fontSize: `${emoji.size}rem`,
              transform: `translate(${parallaxX}px, ${parallaxY}px) rotate(${emoji.rotation}deg)`,
              transition: 'transform 0.5s ease-out'
            }}
          >
            {emoji.isIcon ? (
              emoji.iconType === 'heart' ? (
                <Heart size={emoji.size * 16} fill={getThemeColor()} className="opacity-40" />
              ) : (
                <Bird size={emoji.size * 16} fill={getThemeColor()} className="opacity-40" />
              )
            ) : (
              emoji.emoji
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingEmojis;
