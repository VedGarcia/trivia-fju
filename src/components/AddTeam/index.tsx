import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeam } from "../../features/game/gameSlice";
import type { Team } from "../../models/types";

interface AddTeamProps {
  onTeamAdded?: () => void;
}

export const AddTeam = ({ onTeamAdded }: AddTeamProps) => {
  const [teamName, setTeamName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim() === "") return;

    const newTeam: Team = {
      id: crypto.randomUUID(),
      name: teamName.trim(),
      score: 0,
      questionsAnswered: 0,
      isCorrect: false,
      isFinished: false,
      isError: false,
    };

    dispatch(addTeam(newTeam));
    setTeamName("");
    onTeamAdded?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Nombre del equipo"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Agregar Equipo
      </button>
    </form>
  );
};
