import type { NavigationLink } from "~/shared/constants/navigation";
import type { TModal } from "~/shared/types/react";

export interface TModalWithAction extends TModal {
  action: (typeof NavigationLink)[keyof typeof NavigationLink];
}
