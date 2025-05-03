import Modal from "@/components/modals/Modal";
import { useForm } from "react-hook-form";

interface TeamFormData {
  name: string;
  playerCount: number;
  region: string;
  country: string;
}

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: TeamFormData) => void;
  existingTeamNames: string[];
}

const CreateTeamModal = ({
  isOpen,
  onClose,
  onCreate,
  existingTeamNames,
}: CreateTeamModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TeamFormData>();

  const onSubmit = (data: TeamFormData) => {
    if (existingTeamNames.includes(data.name)) {
      setError("name", { message: "Team name already exists" });
    } else {
      onCreate(data);
      reset();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Team">
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
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Player Count
          </label>
          <input
            {...register("playerCount", {
              required: "Player count is required",
              valueAsNumber: true,
            })}
            type="number"
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.playerCount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.playerCount.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Region
          </label>
          <input
            {...register("region", { required: "Region is required" })}
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.region && (
            <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            {...register("country", { required: "Country is required" })}
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            Save Team
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTeamModal;
