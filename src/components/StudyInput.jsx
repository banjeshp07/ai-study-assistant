import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function StudyInput({ prompt, setPrompt, onGenerate, loading, sampleNotes }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-white">What would you like to study today?</h2>
        <p className="text-sm text-slate-400 mt-1">
          Paste your notes, article text, or topic description below. The AI will instantly generate interactive flashcards and a quiz.
        </p>
      </div>

      <textarea
        className="w-full h-36 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition resize-none text-sm"
        placeholder="Paste notes here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setPrompt(sampleNotes);
            onGenerate(sampleNotes);
          }}
          className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4 cursor-pointer font-medium"
        >
          ✨ Or try with sample notes on Photosynthesis
        </button>

        <button
          type="button"
          onClick={() => onGenerate()}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
        >
          <span>Generate Study Material</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}