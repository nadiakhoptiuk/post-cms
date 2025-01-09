import type { TModal } from "../../ui/Modal/Modal.types";

export interface TModalForDeleting extends TModal {}

export interface TModalForDeletingWithoutRedirect extends TModal {
  postId: number;
}
