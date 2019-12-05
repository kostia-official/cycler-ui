import { useEffect, useState } from 'react';

export const useIsKeyboardOpen = (): boolean => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsOpen(window.innerHeight < windowHeight);
      setWindowHeight(window.innerHeight);
    });
  }, [windowHeight]);

  return isOpen;
};
