import Modal from "@/components/modals/Modal";
import Button from "../Button";

interface DeleteTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
}

const DeleteTeamModal = ({
  isOpen,
  onClose,
  onConfirm,
  teamName,
}: DeleteTeamModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Team">
      <p className="mb-4">
        Are you sure you want to delete <strong>{teamName}</strong>?
      </p>
      <div className="flex justify-end gap-4">
        <Button
          onClick={onClose}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg cursor-pointer"
          text="Cancel"
        />
        <Button
          onClick={onConfirm}
          className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer"
          text="Delete"
        />
      </div>
    </Modal>
  );
};

export default DeleteTeamModal;
