import type { Question } from "../../models/types";

interface QuestionCardProps {
  question: Question;
  index: number;
  onEdit: (question: Question) => void;
  onDelete: (questionId: string) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragEnd?: () => void;
  isDragging: boolean;
}

export const QuestionCard = ({
  question,
  index,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging,
}: QuestionCardProps) => {
  const correctAnswer = question.answerOptions.find((opt) => opt.isCorrect);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnd={() => onDragEnd?.()}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`bg-white rounded-lg shadow-md p-4 mb-3 cursor-move transition-all border-2 ${
        isDragging
          ? "opacity-50 border-blue-500 border-dashed"
          : "border-transparent hover:shadow-lg hover:border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-shrink-0 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {question.text}
            </h3>
            <div className="space-y-1">
              {question.answerOptions.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`text-sm ${
                    option.isCorrect
                      ? "text-green-600 font-bold"
                      : "text-gray-600"
                  }`}
                >
                  {optIndex + 1}. {option.text}
                  {option.isCorrect && " ✓"}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 ml-4 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(question);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
          >
            Editar
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (
                window.confirm(
                  "¿Estás seguro de eliminar esta pregunta?"
                )
              ) {
                onDelete(question.id);
              }
            }}
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
      {correctAnswer && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            Respuesta correcta: <span className="font-bold text-green-600">{correctAnswer.text}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
