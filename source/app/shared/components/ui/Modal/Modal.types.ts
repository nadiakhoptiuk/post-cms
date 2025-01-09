import type { ModalProps } from "@mantine/core";

export interface TModal extends ModalProps {}

export interface TRejectedModal extends ModalProps {
  postId: number;
}
