'use client';

//TODO: test it on mobile

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = () => {
      setIsInputFocused(false);
    };

    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const shouldShow = visible && !isInputFocused;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            variant="default"
            size="icon"
            className="shadow-lg w-11 h-11 md:w-9 md:h-9"
            aria-label="Back to top"
          >
            <ArrowUpIcon className="size-7 md:size-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
