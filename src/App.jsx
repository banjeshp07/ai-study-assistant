import React, { useState, useRef } from 'react';
import { validateStudyMaterial } from './utils/validator';
import { Sparkles, BookOpen, HelpCircle } from 'lucide-react';
import StudyInput from './components/StudyInput';
import FlashcardView from './components/FlashCardView';
import QuizView from './components/QuizView';
import { LoadingState, ErrorState } from './components/LoadingError';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [error, setError] = useState(null);
  const [studyData, setStudyData] = useState(null);
  const [activeTab, setActiveTab] = useState('flashcards');

  const requestIdRef = useRef(0);
  const sampleNotes = "Photosynthesis is the process used by plants to convert light energy into chemical energy. It takes place in chloroplasts, specifically using chlorophyll pigment. The overall chemical reaction is 6CO2 + 6H2O + light -> C6H12O6 + 6O2. Light-dependent reactions happen in the thylakoid membrane, while the Calvin cycle happens in the stroma.";

  const handleGenerate = async (textToUse) => {
    const text = textToUse || prompt;
    if (!text.trim()) {
      setError('Please enter some notes or topic description.');
      return;
    }

    setLoading(true);
    setError(null);
    setStudyData(null);
    setLoadingStatus('Connecting to AI model...');

    const currentReqId = ++requestIdRef.current;

    try {
      setTimeout(() => {
        if (requestIdRef.current === currentReqId && loading) {
          setLoadingStatus('Parsing notes into structured flashcards & quiz...');
        }
      }, 1500);

      const response = await fetch('http://localhost:5000/api/generate-study-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      if (requestIdRef.current !== currentReqId) return;

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server failed to generate study material.');
      }

      const rawJson = await response.json();
      const validatedData = validateStudyMaterial(rawJson);

      setStudyData(validatedData);
      setActiveTab('flashcards');
    } catch (err) {
      if (requestIdRef.current === currentReqId) {
        console.error(err);
        setError(err.message || 'An unexpected error occurred while parsing AI output.');
      }
    } finally {
      if (requestIdRef.current === currentReqId) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">AI Study Assistant</h1>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Component Architecture
        </span>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        {!studyData && !loading && (
          <StudyInput 
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            loading={loading}
            sampleNotes={sampleNotes}
          />
        )}

        {loading && <LoadingState status={loadingStatus} />}
        {error && <ErrorState error={error} onRetry={() => handleGenerate()} />}

        {studyData && !loading && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-6 py-4 rounded-xl">
              <div>
                <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Active Session</span>
                <h2 className="text-lg font-bold text-white mt-0.5">{studyData.topic}</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStudyData(null);
                  setPrompt("");
                }
              }
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-lg transition cursor-pointer"
              >
                New Topic
              </button>
            </div>

            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('flashcards')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeTab === 'flashcards'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Flashcards ({studyData.flashcards.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Quiz ({studyData.quiz.length} Questions)</span>
              </button>
            </div>

            {activeTab === 'flashcards' && <FlashcardView flashcards={studyData.flashcards} />}
            {activeTab === 'quiz' && <QuizView quiz={studyData.quiz} />}
          </div>
        )}
      </main>
    </div>
  );
}