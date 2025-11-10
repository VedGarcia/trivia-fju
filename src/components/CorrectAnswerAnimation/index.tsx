import { useEffect, useState } from "react";
import type { Question } from "../../models/types";

interface CorrectAnswerAnimationProps {
  question: Question;
  onAnimationComplete: () => void;
}

export const CorrectAnswerAnimation = ({
  question,
  onAnimationComplete,
}: CorrectAnswerAnimationProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const correctAnswerIndex = question.answerOptions.findIndex(
    (option) => option.isCorrect
  );
  const correctAnswer = question.answerOptions[correctAnswerIndex];

  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => {
      setShowAnimation(false);
      setTimeout(() => {
        onAnimationComplete();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-md">
      <div
        className={`bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 text-center transform transition-all duration-500 ${
          showAnimation ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="mb-6">
          <div
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
              showAnimation ? "animate-bounce" : ""
            }`}
            style={{
              backgroundColor: "#10b981",
              animation: showAnimation
                ? "bounce 1s infinite, pulse 2s ease-in-out"
                : "none",
            }}
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Respuesta Correcta!
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            {correctAnswer.text}
          </p>
        </div>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(16, 185, 129, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default CorrectAnswerAnimation;
