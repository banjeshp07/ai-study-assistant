import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export function LoadingState({ status }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 text-center">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-slate-200">{status}</p>
      <p className="text-xs text-slate-500">Transforming unstructured thoughts into reliable UI blocks...</p>
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-rose-950/30 border border-rose-900/50 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-rose-200">Failed to Process AI Response</h3>
          <p className="text-xs text-rose-300/80 mt-1">{error}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onRetry}
          className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry Generation</span>
        </button>
      </div>
    </div>
  );
}