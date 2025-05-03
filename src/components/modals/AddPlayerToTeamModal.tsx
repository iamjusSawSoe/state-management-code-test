import { Team } from "@/app/teams/page";
import { useEffect, useState } from "react";
import Button from "../Button";
import Modal from "./Modal";

interface AddPlayerToTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (teamName: string) => void;
  teams: Team[];
}

const AddPlayerToTeamModal = ({
  isOpen,
  onClose,
  onConfirm,
  teams,
}: AddPlayerToTeamModalProps) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setSelectedTeam("");
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Players to Team">
      <p className="mb-4">Choose Team to add the selected players.</p>

      <select
        className="w-full mb-4 p-2 border rounded"
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        <option value="">Select a team</option>
        {teams.map((team) => (
          <option key={team.name} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>

      <div className="flex justify-end gap-4">
        <Button
          onClick={onClose}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg cursor-pointer"
          text="Cancel"
        />
        <Button
          onClick={() => onConfirm(selectedTeam)}
          className={`${
            selectedTeam ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
          } text-white px-6 py-2 rounded-lg`}
          text="Add"
          disabled={!selectedTeam}
        />
      </div>
    </Modal>
  );
};

export default AddPlayerToTeamModal;
