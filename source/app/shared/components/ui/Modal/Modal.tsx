import { Modal as MModal } from "@mantine/core";
import { TModal } from "./Modal.types";

export const Modal = ({ opened, onClose, children, ...rest }: TModal) => {
  return (
    <MModal opened={opened} onClose={onClose} {...rest}>
      {children}
    </MModal>
  );
};
