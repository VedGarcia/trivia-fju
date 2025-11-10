import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AnswerOption } from "../AnswerOption";
import { addQuestion } from "../../features/admin/questionsSlice";
import type { Question } from "../../models/types";

type QuestionFormData = {
  text: string;
  answerOptions: {
    text: string;
  }[];
  correctAnswerIndex: string;
};

interface AddQuestionProps {
  onSuccess?: () => void;
}

export const AddQuestion = ({ onSuccess }: AddQuestionProps) => {
  const dispatch = useDispatch();
  const methods = useForm<QuestionFormData>({
    defaultValues: {
      text: "",
      answerOptions: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      correctAnswerIndex: "",
    },
  });

  const onSubmit: SubmitHandler<QuestionFormData> = (data) => {
    const correctIndex = parseInt(data.correctAnswerIndex, 10);

    const answerOptions = data.answerOptions.map((option, index) => ({
      text: option.text,
      isCorrect: index === correctIndex,
    }));

    const newQuestion: Question = {
      id: crypto.randomUUID(),
      text: data.text,
      answerOptions,
    };

    dispatch(addQuestion(newQuestion));

    // Resetear el formulario
    methods.reset();

    // Llamar al callback de éxito si existe
    onSuccess?.();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="text" className="block text-sm font-medium mb-2">
            Pregunta
          </label>
          <textarea
            id="text"
            {...methods.register("text", {
              required: "La pregunta es requerida",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Escribe la pregunta aquí..."
          />
          {methods.formState.errors.text && (
            <p className="mt-1 text-sm text-red-600">
              {methods.formState.errors.text.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Opciones de Respuesta (marca la respuesta correcta)
          </label>
          <div className="space-y-4">
            {[0, 1, 2, 3].map((index) => (
              <AnswerOption key={index} index={index} />
            ))}
          </div>
          {methods.formState.errors.answerOptions && (
            <p className="mt-1 text-sm text-red-600">
              Todas las opciones son requeridas
            </p>
          )}
          {methods.formState.errors.correctAnswerIndex && (
            <p className="mt-1 text-sm text-red-600">
              {methods.formState.errors.correctAnswerIndex.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Crear Pregunta
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddQuestion;
