import { getTeamColorByIndex } from "../../utils/teamColors";
import type { Team } from "../../models/types";

interface ScoreBoardProps {
  teams: Team[];
}

export const ScoreBoard = ({ teams }: ScoreBoardProps) => {
  if (teams.length === 0) {
    return null;
  }

  // Ordenar equipos por puntaje (mayor a menor)
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Puntuación</h2>
      <div className="space-y-2">
        {sortedTeams.map((team) => {
          // Encontrar el índice original del equipo para obtener su color
          const originalIndex = teams.findIndex((t) => t.id === team.id);
          const color = getTeamColorByIndex(originalIndex);

          return (
            <div
              key={team.id}
              className="flex justify-between items-center rounded-md p-3"
              style={{
                backgroundColor: `${color.primary}20`,
                border: `1px solid ${color.primary}`,
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color.primary }}
                />
                <span className="text-white font-medium">{team.name}</span>
              </div>
              <span className="text-white font-bold text-lg">
                {team.score} pts
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBoard;
