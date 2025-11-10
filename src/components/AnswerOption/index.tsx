import { useFormContext } from "react-hook-form";

interface AnswerOptionProps {
  index: number;
}

export const AnswerOption = ({ index }: AnswerOptionProps) => {
  const { register, getFieldState } = useFormContext();
  const fieldName = `answerOptions.${index}.text` as const;
  const { error } = getFieldState(fieldName);

  return (
    <div>
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <div className="flex items-center justify-center pl-3 pr-2">
          <input
            type="radio"
            value={index}
            {...register("correctAnswerIndex", {
              required: "Debes seleccionar la respuesta correcta",
            })}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>
        <input
          type="text"
          {...register(fieldName, {
            required: `La opción ${index + 1} es requerida`,
          })}
          className="flex-1 py-2 pr-3 border-0 focus:outline-none focus:ring-0 rounded-r-md"
          placeholder={`Opción ${index + 1}`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default AnswerOption;
