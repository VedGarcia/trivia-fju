import { useSelector } from "react-redux";
import { AddTeam } from "../AddTeam";
import { TeamList } from "../TeamList";
import { ScoreBoard } from "../ScoreBoard";
import type { RootState } from "../../store";

export const TeamsPanel = () => {
  const teams = useSelector((state: RootState) => state.game.teams);

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Agregar Equipo</h2>
        <AddTeam />
      </div>

      <div>
        <TeamList teams={teams} />
      </div>

      {teams.length > 0 && (
        <div>
          <ScoreBoard teams={teams} />
        </div>
      )}
    </div>
  );
};

export default TeamsPanel;
