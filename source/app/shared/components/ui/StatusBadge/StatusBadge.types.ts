import type { BadgeProps } from "@mantine/core";

import type { POST_STATUS } from "~/shared/constants/common";

export interface TStatusBadge extends BadgeProps {
  status: (typeof POST_STATUS)[keyof typeof POST_STATUS];
}
