import { Box, Modal } from "@mui/material";

export const MessageModal = ({
  onCloseModal,
  isOpen,
  isSuccess,
  isLoading,
  message,
}: {
  onCloseModal: () => void;
  isOpen: boolean;
  message: string;
  isSuccess?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <Modal className="mt-[50px]" open={isOpen} onClose={onCloseModal}>
      <Box
        className={`bg-white flex items-center justify-center h-28 w-1/2 mx-auto my-auto ${
          (isSuccess && `border-lime-400 border-2`) ||
          `border-rose-400 border-2`
        } ${isLoading && `border-slate-300 border-2`}`}
      >
        <p className="text-xl text-center">{message}</p>
      </Box>
    </Modal>
  );
};
