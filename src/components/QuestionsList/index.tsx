import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { QuestionCard } from "../QuestionCard";
import {
  removeQuestion,
  reorderQuestions,
} from "../../features/admin/questionsSlice";
import type { RootState } from "../../store";
import type { Question } from "../../models/types";

interface QuestionsListProps {
  onEditQuestion: (question: Question) => void;
}

export const QuestionsList = ({ onEditQuestion }: QuestionsListProps) => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questions);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragLeaveTimeoutRef = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";

    // Limpiar timeout anterior
    if (dragLeaveTimeoutRef.current) {
      clearTimeout(dragLeaveTimeoutRef.current);
      dragLeaveTimeoutRef.current = null;
    }

    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Usar timeout para evitar parpadeos
    dragLeaveTimeoutRef.current = setTimeout(() => {
      setDragOverIndex(null);
    }, 50);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    // Limpiar timeout
    if (dragLeaveTimeoutRef.current) {
      clearTimeout(dragLeaveTimeoutRef.current);
      dragLeaveTimeoutRef.current = null;
    }

    if (draggedIndex === null) {
      setDragOverIndex(null);
      return;
    }

    if (draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newQuestions = [...questions];
    const draggedQuestion = newQuestions[draggedIndex];

    // Remover el elemento arrastrado
    newQuestions.splice(draggedIndex, 1);

    // Ajustar el índice de destino si el elemento arrastrado estaba antes
    const adjustedDropIndex =
      draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;

    // Insertar en la nueva posición
    newQuestions.splice(adjustedDropIndex, 0, draggedQuestion);

    // Actualizar el orden en Redux
    dispatch(reorderQuestions(newQuestions));

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    // Limpiar estados cuando termina el drag
    if (dragLeaveTimeoutRef.current) {
      clearTimeout(dragLeaveTimeoutRef.current);
      dragLeaveTimeoutRef.current = null;
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDelete = (questionId: string) => {
    dispatch(removeQuestion(questionId));
  };

  if (questions.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
        <p className="text-white text-lg">
          No hay preguntas creadas. Crea tu primera pregunta para comenzar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {questions.map((question, index) => (
        <div key={question.id} className="relative">
          {dragOverIndex === index &&
            draggedIndex !== index &&
            draggedIndex !== null && (
              <div className="absolute -top-1 left-0 right-0 h-1 bg-blue-500 rounded-full z-10" />
            )}
          <div
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            className={`transition-all ${
              dragOverIndex === index &&
              draggedIndex !== index &&
              draggedIndex !== null
                ? "pb-2"
                : ""
            }`}
          >
            <QuestionCard
              question={question}
              index={index}
              onEdit={onEditQuestion}
              onDelete={handleDelete}
              onDragStart={handleDragStart}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              isDragging={draggedIndex === index}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
