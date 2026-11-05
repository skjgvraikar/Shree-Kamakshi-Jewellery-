import React from 'react';

export function Skeleton({ className = '', variant = 'rect' }) {
  const baseClasses = 'bg-gradient-to-r from-amber-950/40 via-yellow-900/20 to-amber-950/40 animate-pulse border border-gold/10';
  const roundedClass = variant === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <div
      className={`${baseClasses} ${roundedClass} ${className}`}
      aria-hidden="true"
    />
  );
}

export function RateCardSkeleton() {
  return (
    <div className="glass-gold-card p-6 rounded-2xl border border-gold/20 flex flex-col justify-between h-48 animate-pulse">
      <div className="flex justify-between items-start">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
      <div className="my-3">
        <Skeleton className="h-10 w-36 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-gold/10">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="glass-gold-card rounded-2xl overflow-hidden border border-gold/20 animate-pulse flex flex-col">
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Skeleton className="h-3 w-20 mb-3" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="mt-5 pt-3 border-t border-gold/10 flex justify-between items-center">
          <Skeleton className="h-8 w-28 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;

