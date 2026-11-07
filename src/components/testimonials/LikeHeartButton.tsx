'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isTestimonialLikedLocally, toggleTestimonialLike } from '@/lib/testimonials';

interface LikeHeartButtonProps {
  testimonialId: string;
  className?: string;
  onLikeChange?: (isLiked: boolean) => void;
}

export default function LikeHeartButton({
  testimonialId,
  className = '',
  onLikeChange,
}: LikeHeartButtonProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setIsLiked(isTestimonialLikedLocally(testimonialId));
  }, [testimonialId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const previousState = isLiked;
    const nextState = !previousState;

    // Optimistic UI update
    setIsLiked(nextState);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (onLikeChange) {
      onLikeChange(nextState);
    }

    try {
      await toggleTestimonialLike(testimonialId, previousState);
    } catch (err) {
      // Revert if critical error
      console.error('Error toggling like:', err);
      setIsLiked(previousState);
      if (onLikeChange) onLikeChange(previousState);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isLiked ? 'Quitar me gusta' : 'Dar me gusta'}
      className={`p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300 active:scale-90 cursor-pointer ${
        isLiked
          ? 'bg-rose-50 text-rose-500 hover:bg-rose-100/70'
          : 'bg-stone-100/70 text-stone-400 hover:text-rose-500 hover:bg-rose-50/50'
      } ${className}`}
    >
      <Heart
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
          isLiked ? 'fill-rose-500 text-rose-500' : 'text-current'
        } ${isAnimating ? 'scale-125' : 'scale-100'}`}
      />
    </button>
  );
}
