import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function QuizView({ quiz }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleOptionSelect = (questionId, optionIndex) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    return Object.entries(selectedAnswers).filter(
      ([qId, ans]) => quiz.find(q => q.id === Number(qId))?.correctIndex === ans
    ).length;
  };

  return (
    <div className="flex flex-col gap-6">
      {quiz.map((q, qIdx) => {
        const isSelected = selectedAnswers[q.id] !== undefined;

        return (
          <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white">
              {qIdx + 1}. {q.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {q.options.map((opt, optIdx) => {
                const isThisSelected = selectedAnswers[q.id] === optIdx;
                let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";

                if (quizSubmitted) {
                  if (optIdx === q.correctIndex) {
                    btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200";
                  } else if (isThisSelected && optIdx !== q.correctIndex) {
                    btnStyle = "bg-rose-950/40 border-rose-500 text-rose-200";
                  }
                } else if (isThisSelected) {
                  btnStyle = "bg-indigo-950/50 border-indigo-500 text-indigo-200";
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleOptionSelect(q.id, optIdx)}
                    className={`p-3.5 rounded-xl border text-left text-xs transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && optIdx === q.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {quizSubmitted && isThisSelected && optIdx !== q.correctIndex && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div className="text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-400 mt-2">
                <strong className="text-slate-200">Explanation: </strong>
                {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
        {quizSubmitted ? (
          <div className="text-sm font-medium text-white">
            Score: <span className="text-indigo-400">{calculateScore()}</span> / {quiz.length}
          </div>
        ) : (
          <span className="text-xs text-slate-400">Select answers for all questions above.</span>
        )}

        <button
          type="button"
          onClick={() => setQuizSubmitted(true)}
          disabled={quizSubmitted || Object.keys(selectedAnswers).length === 0}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-5 py-2.5 rounded-xl transition cursor-pointer disabled:opacity-50"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}