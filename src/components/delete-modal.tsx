import Modal from "./modal";
import { Button } from "./ui/button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: DeleteModalProps) => {
  return (
    <Modal
      title="Are you sure you want to delete this interview?"
      description="This action cannot be undone. This will permanently delete the mock interview and any related data."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
export default DeleteModal;
