import type { Team, Question } from "../../models/types";

interface TeamAnswerProps {
  team: Team;
  question: Question;
  selectedOption: number | null;
  onOptionSelect: (teamId: string, optionIndex: number) => void;
  onConfirm: (teamId: string) => void;
  hasAnswered: boolean;
  isCorrect: boolean | null;
  isActive: boolean;
}

export const TeamAnswer = ({
  team,
  question,
  selectedOption,
  onOptionSelect,
  onConfirm,
  hasAnswered,
  isCorrect,
  isActive,
}: TeamAnswerProps) => {
  const canConfirm = selectedOption !== null && !hasAnswered;

  return (
    <div
      className={`rounded-lg shadow-md p-6 ${
        hasAnswered
          ? isCorrect
            ? "bg-green-50 border-2 border-green-500"
            : "bg-red-50 border-2 border-red-500"
          : isActive
          ? "bg-white ring-2 ring-blue-500"
          : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
        {hasAnswered && (
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold ${
              isCorrect
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {isCorrect ? "✓ Correcto (+10)" : "✗ Incorrecto"}
          </span>
        )}
        {!hasAnswered && (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700">
            Esperando respuesta
          </span>
        )}
      </div>

      <div className="space-y-3 mb-4">
        {question.answerOptions.map((option, index) => {
          const isSelected = selectedOption === index;
          const isDisabled = hasAnswered;

          return (
            <button
              key={index}
              type="button"
              onClick={() => !isDisabled && onOptionSelect(team.id, index)}
              disabled={isDisabled}
              className={`w-full text-left p-3 rounded-md border-2 transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50/50"
              } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-400"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-gray-800 font-medium">{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>

      {!hasAnswered && (
        <button
          onClick={() => onConfirm(team.id)}
          disabled={!canConfirm}
          className={`w-full py-2 px-4 rounded-md font-bold transition-colors ${
            canConfirm
              ? "bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
        >
          Confirmar Respuesta
        </button>
      )}
    </div>
  );
};

export default TeamAnswer;

