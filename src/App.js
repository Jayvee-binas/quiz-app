import React, { useState } from "react";
import './App.css';

const questions = [
  {
    question: "Who wrote '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Philip K. Dick"],
    answer: "George Orwell",
  },
  {
    question: "Which novel features the character Holden Caulfield?",
    options: ["The Catcher in the Rye", "Lord of the Flies", "The Great Gatsby", "Of Mice and Men"],
    answer: "The Catcher in the Rye",
  },
  {
    question: "Who is the author of 'Pride and Prejudice'?",
    options: [
      "Jane Austen",
      "Charlotte Brontë",
      "Emily Brontë",
      "Virginia Woolf",
    ],
    answer: "Jane Austen",
  },
  {
    question: "What is the first book in J.R.R. Tolkien's 'The Lord of the Rings' trilogy?",
    options: [
      "The Two Towers",
      "The Fellowship of the Ring",
      "The Return of the King",
      "The Hobbit",
    ],
    answer: "The Fellowship of the Ring",
  },
  {
    question: "Which Shakespeare play features the line 'To be, or not to be'?",
    options: ["Hamlet", "Macbeth", "Romeo and Juliet", "King Lear"],
    answer: "Hamlet",
  },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedAnswer("");
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        <h1 className="quiz-title">
          Multiple-Choice Quiz
        </h1>

        {!showScore ? (
          <div>
            <div className="question-header">
              <h2 className="question-counter">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="question-text">{questions[currentQuestion].question}</p>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <label
                  key={idx}
                  className={`option-label ${selectedAnswer === option ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerSelect(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className={`next-button ${!selectedAnswer ? 'disabled' : ''}`}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="score-container">
            <div className="score-animation">
              <h2>Quiz Completed! 🎉</h2>
              <div className="score-circle">
                <div className="score-number">
                  {((score / questions.length) * 100).toFixed(0)}%
                </div>
              </div>
              <p className="score-details">
                You got <strong>{score}</strong> out of {questions.length} questions correct
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
