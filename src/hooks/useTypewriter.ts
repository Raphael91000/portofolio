import { useState, useEffect } from 'react';

export const useTypewriter = (words: string[], speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const shouldDelete = isDeleting && displayText.length > 0;
    const shouldType = !isDeleting && displayText.length < currentWord.length;

    const timeout = setTimeout(() => {
      if (shouldDelete) {
        setDisplayText(prev => prev.slice(0, -1));
      } else if (shouldType) {
        setDisplayText(prev => currentWord.slice(0, prev.length + 1));
      } else if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentWordIndex(prev => (prev + 1) % words.length);
      }
    }, shouldDelete ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentWordIndex, isDeleting, words, speed]);

  return displayText;
};