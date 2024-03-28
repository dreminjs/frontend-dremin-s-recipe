import { Box, Modal } from "@mui/material";
import { ReactNode } from "react";

export const ModalLayout = ({
  isOpen,
  onCloseModal,
  children,
  width,
}: {
  width?: string;
  isOpen: boolean;
  onCloseModal: () => void;
  children: ReactNode;
}) => {
  return (
    <Modal onClose={onCloseModal} open={isOpen}>
      <Box
        className={`bg-white min-[320px]:w-11/12 min-[700px]:w-1/2 mx-auto my-32 p-5`}
      >
        {children}
      </Box>
    </Modal>
  );
};
