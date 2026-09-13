# AI Study Assistant - Frontend Internship Assignment

A robust, interactive React application built for the Flam frontend engineering assignment. This tool allows users to input free-form notes or topics, which an AI model transforms into structured study materials—specifically interactive flashcards and a multiple-choice quiz.

---

## 🚀 Key Features

* **Interactive Study Modes**: Seamlessly switch between flipping through structured flashcards and taking a self-paced quiz with instant score feedback.
* **Robust AI Output Validation (`validator.js`)**: Safely parses and validates incoming JSON data at runtime. It enforces schema integrity, checks for missing arrays or keys, and applies safe fallbacks.
* **Resilient Error & Loading States**: Displays custom loading statuses (with delayed feedback indicators) and a graceful Error UI equipped with a "Retry Generation" button if the model fails or returns malformed data.
* **Race Condition & Stale Response Protection**: Uses `useRef`-based request tracking (`requestIdRef`) to ensure older delayed responses never overwrite newer generation requests.
* **Secure Backend Proxy Architecture**: Protects API credentials by routing all LLM calls through an Express backend server (preventing browser-side API key exposure).
* **Modern UI/UX Polish**: Styled with Tailwind CSS in dark mode, featuring smooth tab transitions, clear visual hierarchies, and automatic input clearing when starting a new session.

---

## 🛠️ Tech Stack

* **Frontend**: React (Functional Components, Hooks, Vite), Tailwind CSS, Lucide React (Icons).
* **Backend**: Node.js, Express (API Proxy Server).
* **AI Integration**: Google Gemini API (`gemini-3.6-flash`), structured JSON response generation via system instructions.

---

## 📁 Project Structure
```text
ai-study-assistant/
│
├── server/                 # Backend proxy server
│   └── server.js           # Express server handling Gemini API calls
│
├── src/
│   ├── components/
│   │   ├── StudyInput.jsx  # Free-form text input & sample notes loader
│   │   ├── FlashcardView.jsx# Interactive flip cards for study sessions
│   │   ├── QuizView.jsx    # Multiple-choice quiz component with scoring
│   │   └── LoadingError.jsx# Dedicated loading statuses and error/retry screens
│   │
│   ├── utils/
│   │   └── validator.js    # Runtime schema validation & safety fallback logic
│   │
│   ├── App.jsx             # Main application orchestrator & state manager
│   ├── main.jsx            # React entry point
│   └── index.css           # Tailwind CSS imports & global styles
│
├── .env                    # Environment variables (GEMINI_API_KEY)
├── package.json
└── README.md
```
---

## ⚙️ Setup & Local Installation

To run this project locally, follow these steps:

### Prerequisites
* Node.js installed on your machine.
* A valid Gemini API Key from Google AI Studio.

### 1. Clone the Repository
```text
git clone https://github.com/your-username/ai-study-assistant.git
cd ai-study-assistant
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your backend configuration:
```text
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies & Run
You need to run both the backend server and the frontend client.

* **Start Backend Server**:
```text
cd server
npm install
npm start
```

* **Start Frontend Client** (in a separate terminal tab):
```text
npm install
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🛡️ Handling Bad AI Output & Edge Cases

Evaluating unpredictable AI responses was a core focus of this build:
1. **Malformed JSON / Wrong Schema**: Handled gracefully via `validator.js`. If required keys (`flashcards`, `quiz`) or expected types are missing, an explicit error is thrown.
2. **Crash Prevention**: The `try/catch` architecture ensures that parsing errors never crash the React tree; instead, they trigger the `ErrorState` component.
3. **Stale Response Race Conditions**: Handled using `requestIdRef` to ignore out-of-order asynchronous completions.

---

## 🤖 AI Usage Note

During the development of this project, AI assistants were utilized for:
* Brainstorming modular component architecture patterns.
* Refining the runtime schema validator logic (`validator.js`) to catch array index boundaries.
* Crafting responsive Tailwind CSS layouts for flashcard flip animations and dark-mode aesthetics.

All generated code was thoroughly reviewed, understood, and integrated manually to ensure complete familiarity during code walk-throughs and live evaluations.

---

## ⏱️ Time Spent & Limitations

* **Time Spent**: Approximately 7-8 hours of design, development, debugging, and styling.
* **Known Limitations**: 
  - The application relies on Google Gemini's API availability; temporary high-demand spikes (503 status) are handled via retry logic but can occasionally add latency.
  - Currently optimized for desktop and tablet screens, with full responsive layouts for mobile devices.