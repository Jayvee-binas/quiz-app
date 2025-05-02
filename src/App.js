import React, { useState } from "react";
import './App.css';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Madrid", "Berlin", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      "Harper Lee",
      "Mark Twain",
      "J.K. Rowling",
      "Ernest Hemingway",
    ],
    answer: "Harper Lee",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
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
