// Runtime schema validator for AI response
export function validateStudyMaterial(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('AI response is not a valid JSON object.');
  }

  // Check topic
  if (!data.topic || typeof data.topic !== 'string') {
    data.topic = 'Generated Study Session';
  }

  // Validate flashcards array
  if (!Array.isArray(data.flashcards) || data.flashcards.length === 0) {
    throw new Error('AI response missing valid flashcards array.');
  }

  data.flashcards.forEach((card, index) => {
    if (!card.front || !card.back) {
      throw new Error(`Flashcard at index ${index} is missing 'front' or 'back'.`);
    }
    card.id = card.id || index + 1;
  });

  // Validate quiz array
  if (!Array.isArray(data.quiz) || data.quiz.length === 0) {
    throw new Error('AI response missing valid quiz array.');
  }

  data.quiz.forEach((q, index) => {
    if (!q.question || !Array.isArray(q.options) || q.options.length < 2) {
      throw new Error(`Quiz question at index ${index} is malformed.`);
    }
    if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
      q.correctIndex = 0; // fallback safety
    }
    q.id = q.id || index + 1;
  });

  return data;
}