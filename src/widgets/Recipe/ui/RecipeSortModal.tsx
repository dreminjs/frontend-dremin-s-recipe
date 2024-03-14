import { ModalLayout } from "@/shared";

export const RecipeSortModal = ({
  isOpen,
  onCloseModal,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
}) => {
  return (
    <ModalLayout width="w-1/2" isOpen={isOpen} onCloseModal={onCloseModal}>
      123
    </ModalLayout>
  );
};
