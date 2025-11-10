import { getTeamColorByIndex } from "../../utils/teamColors";
import type { Team } from "../../models/types";

interface TeamSelectorProps {
  teams: Team[];
  selectedTeamId: string | null;
  onSelectTeam: (teamId: string) => void;
}

export const TeamSelector = ({
  teams,
  selectedTeamId,
  onSelectTeam,
}: TeamSelectorProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <h3 className="text-white font-bold text-lg mb-3">Seleccionar Equipo</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {teams.map((team, index) => {
          const isSelected = selectedTeamId === team.id;
          const color = getTeamColorByIndex(index);
          
          return (
            <button
              key={team.id}
              onClick={() => onSelectTeam(team.id)}
              className={`px-4 py-3 rounded-md font-medium transition-all relative ${
                isSelected
                  ? "ring-2 ring-offset-2 ring-white"
                  : "hover:opacity-90"
              }`}
              style={{
                backgroundColor: isSelected ? color.primary : color.bg,
                border: `2px solid ${color.primary}`,
                color: isSelected ? "white" : color.text,
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color.primary }}
                />
                <span>{team.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TeamSelector;
