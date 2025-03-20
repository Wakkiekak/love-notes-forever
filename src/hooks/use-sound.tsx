
import { useCallback, useEffect, useRef } from 'react';

interface SoundMap {
  [key: string]: HTMLAudioElement;
}

export function useSound() {
  const soundsRef = useRef<SoundMap>({});
  
  useEffect(() => {
    // Initialize sound effects
    soundsRef.current = {
      click: new Audio('/sounds/click.mp3'),
      success: new Audio('/sounds/success.mp3'),
      notification: new Audio('/sounds/notification.mp3')
    };
    
    // Preload sounds
    Object.values(soundsRef.current).forEach(audio => {
      audio.load();
    });
    
    return () => {
      // Cleanup
      Object.values(soundsRef.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);
  
  const playSound = useCallback((soundName: 'click' | 'success' | 'notification') => {
    const sound = soundsRef.current[soundName];
    if (sound) {
      // Reset sound to beginning if it's already playing
      sound.currentTime = 0;
      sound.play().catch(err => {
        // Handle autoplay restrictions - many browsers require user interaction
        console.log("Sound couldn't play automatically:", err);
      });
    }
  }, []);
  
  return { playSound };
}
