import React, { useState } from 'react';

export default function FlashcardView({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = flashcards[currentIndex];

  return (
    <div className="flex flex-col gap-4 items-center">
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-72 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 transition shadow-xl relative select-none group"
      >
        <span className="absolute top-4 left-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
          {isFlipped ? 'Answer (Click to flip back)' : 'Question (Click to reveal answer)'}
        </span>

        <p className="text-xl font-medium text-slate-100 max-w-lg">
          {isFlipped ? card.back : card.front}
        </p>

        <span className="absolute bottom-4 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition">
          Click anywhere to flip card ⟳
        </span>
      </div>

      <div className="flex items-center justify-between w-full px-2">
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => {
            setIsFlipped(false);
            setCurrentIndex(prev => prev - 1);
          }}
          className="px-4 py-2 bg-slate-900 border border-slate-800 text-sm rounded-lg hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
        >
          Previous
        </button>

        <span className="text-xs text-slate-400">
          Card {currentIndex + 1} of {flashcards.length}
        </span>

        <button
          type="button"
          disabled={currentIndex === flashcards.length - 1}
          onClick={() => {
            setIsFlipped(false);
            setCurrentIndex(prev => prev + 1);
          }}
          className="px-4 py-2 bg-slate-900 border border-slate-800 text-sm rounded-lg hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}