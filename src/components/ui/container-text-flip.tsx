'use client';

import React, { useState, useEffect, useId, useCallback } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ['better', 'modern', 'beautiful', 'awesome'],
  interval = 5000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef<HTMLDivElement>(null);

  const updateWidthForWord = useCallback(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  }, []);

  useEffect(() => {
    updateWidthForWord();
  }, [currentWordIndex, updateWidthForWord]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        'relative inline-block rounded-lg text-center text-white',
        'outline-none focus:outline-none ring-0 shadow-none',
        'border border-neutral-800',
        '[background:linear-gradient(to_bottom,#3a3a3a,#2C2F38)]',
        className
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: 'easeInOut',
        }}
        className={cn('inline-block', textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-flex h-4 items-start justify-center">
          {words[currentWordIndex].split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: 'blur(10px)',
              }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
              }}
              transition={{
                delay: index * 0.02,
              }}
              className="inline-flex leading-none select-none"
              style={{
                transform: 'translateY(-4px)',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
