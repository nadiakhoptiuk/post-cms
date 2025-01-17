import { Modal as MModal } from "@mantine/core";

import type { TModal } from "~/shared/types/react";

export const Modal = ({
  opened,
  onClose,
  children,
  styles,
  ...rest
}: TModal) => {
  return (
    <MModal
      opened={opened}
      onClose={onClose}
      {...rest}
      styles={{
        header: { padding: "20px 20px" },
        body: { padding: "20px" },
        title: { textAlign: "center" },
        ...(styles ? styles : {}),
      }}
    >
      {children}
    </MModal>
  );
};
