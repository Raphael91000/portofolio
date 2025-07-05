import { useState, useEffect } from 'react';

export const useAudio = () => {
  const [isListening, setIsListening] = useState(false);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }
  }, []);

  const speak = (text: string, lang: string = 'fr-FR') => {
    if (!synthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1.1;
    utterance.pitch = 1.2;
    utterance.volume = 0.9;
    
    utterance.onstart = () => setIsListening(true);
    utterance.onend = () => setIsListening(false);
    utterance.onerror = () => setIsListening(false);

    synthesis.speak(utterance);
  };

  const stop = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsListening(false);
    }
  };

  return { speak, stop, isListening };
};