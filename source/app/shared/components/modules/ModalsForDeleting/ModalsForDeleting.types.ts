import type { NavigationLink } from "~/shared/constants/navigation";
import type { TModal } from "../../ui/Modal/Modal.types";

export interface TModalForDeleting extends TModal {}

export interface TModalForDeletingWithoutRedirect extends TModal {
  itemId: number;
  action: (typeof NavigationLink)[keyof typeof NavigationLink];
}
