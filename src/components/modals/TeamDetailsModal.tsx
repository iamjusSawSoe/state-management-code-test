import { Team } from "@/app/teams/page";
import Modal from "@/components/modals/Modal";
import { Player } from "@/hooks/getAllPlayers";
import { useEffect, useState } from "react";

interface TeamDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
}

const TeamDetailsModal = ({
  isOpen,
  onClose,
  teamName,
}: TeamDetailsModalProps) => {
  const [teamPlayers, setTeamPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const teamsJson = localStorage.getItem("teams");
    if (teamsJson) {
      const teams: Team[] = JSON.parse(teamsJson);
      const selectedTeam = teams.find((team) => team.name === teamName);
      if (selectedTeam && selectedTeam.players) {
        setTeamPlayers(selectedTeam.players);
      }
    }
  }, [teamName, isOpen]);

  const handleDeletePlayer = (playerId: number) => {
    const updatedPlayers = teamPlayers.filter(
      (player) => player.id !== playerId
    );
    setTeamPlayers(updatedPlayers);

    const teamsJson = localStorage.getItem("teams");
    if (teamsJson) {
      const teams: Team[] = JSON.parse(teamsJson);
      const updatedTeams = teams.map((team) => {
        if (team.name === teamName) {
          return { ...team, players: updatedPlayers };
        }
        return team;
      });
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Team Details: ${teamName}`}
    >
      <div className="max-h-96 overflow-y-auto border border-gray-200">
        <table className="min-w-full bg-white border-collapse">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="py-3 px-4 text-left">Player Name</th>
              <th className="py-3 px-4 text-left">Position</th>
              <th className="py-3 px-4 text-left">National Team</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {teamPlayers.length > 0 ? (
              teamPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4">{player.name}</td>
                  <td className="py-2 px-4">{player.position}</td>
                  <td className="py-2 px-4">{player.national_team}</td>
                  <td className="py-2 px-4">
                    <button
                      className=" px-6 py-2 transition duration-200 ease-in-out cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDeletePlayer(player.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                  No players in this team.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default TeamDetailsModal;
