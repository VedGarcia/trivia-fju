import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTeam, updateTeam } from "../../features/game/gameSlice";
import { getTeamColorByIndex } from "../../utils/teamColors";
import type { Team } from "../../models/types";
import type { RootState } from "../../store";

interface TeamListProps {
  teams: Team[];
}

export const TeamList = ({ teams }: TeamListProps) => {
  const dispatch = useDispatch();
  const gameTeams = useSelector((state: RootState) => state.game.teams);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleEdit = (team: Team) => {
    setEditingId(team.id);
    setEditName(team.name);
  };

  const handleSave = (teamId: string) => {
    if (editName.trim() !== "") {
      dispatch(updateTeam({ id: teamId, name: editName.trim() }));
    }
    setEditingId(null);
    setEditName("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleDelete = (teamId: string) => {
    if (window.confirm("¿Estás seguro de eliminar este equipo?")) {
      dispatch(removeTeam(teamId));
    }
  };

  if (teams.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <p className="text-white text-center">No hay equipos registrados</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Equipos Registrados</h2>
      <div className="space-y-2">
        {teams.map((team, index) => {
          const color = getTeamColorByIndex(index);
          return (
            <div
              key={team.id}
              className="flex items-center justify-between rounded-md p-3"
              style={{
                backgroundColor: `${color.primary}20`,
                border: `1px solid ${color.primary}`,
              }}
            >
              {editingId === team.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color.primary }}
                  />
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave(team.id);
                      if (e.key === "Escape") handleCancel();
                    }}
                  />
                  <button
                    onClick={() => handleSave(team.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.primary }}
                    />
                    <span className="text-white font-medium">{team.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(team)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamList;
