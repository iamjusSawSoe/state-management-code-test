import Modal from "@/components/modals/Modal";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
}

interface EditTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team | null;
  onSave: (updatedTeam: Team) => void;
}

const EditTeamModal = ({
  isOpen,
  onClose,
  team,
  onSave,
}: EditTeamModalProps) => {
  const { register, handleSubmit, reset } = useForm<Team>();

  useEffect(() => {
    if (team) {
      reset(team);
    }
  }, [team, reset]);

  const onSubmit = (data: Team) => {
    if (team) {
      onSave({ ...team, ...data });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Team">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Team Name
          </label>
          <input
            {...register("name", { required: "Team name is required" })}
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Player Count
          </label>
          <input
            {...register("playerCount", { valueAsNumber: true })}
            type="number"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Region
          </label>
          <input
            {...register("region")}
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            {...register("country")}
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTeamModal;
