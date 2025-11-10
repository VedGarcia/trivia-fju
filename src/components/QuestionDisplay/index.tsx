import type { Question } from "../../models/types";

interface QuestionDisplayProps {
  question: Question;
  selectedOption: number | null;
  onOptionSelect: (index: number) => void;
}

export const QuestionDisplay = ({
  question,
  selectedOption,
  onOptionSelect,
}: QuestionDisplayProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{question.text}</h2>
      
      <div className="space-y-3">
        {question.answerOptions.map((option, index) => {
          const isSelected = selectedOption === index;
          
          return (
            <button
              key={index}
              type="button"
              onClick={() => onOptionSelect(index)}
              className={`w-full text-left p-4 rounded-md border-2 transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-400"
                  }`}
                >
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-gray-800 font-medium">{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionDisplay;

