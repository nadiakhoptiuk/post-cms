import { Badge } from "@mantine/core";

import { POST_STATUS } from "~/shared/constants/common";
import type { TStatusBadge } from "./StatusBadge.types";

export const StatusBadge = ({ status, ...rest }: TStatusBadge) => {
  return (
    <Badge
      autoContrast
      variant={
        status === POST_STATUS.REJECTED || status === POST_STATUS.ON_MODERATION
          ? "default"
          : "light"
      }
      c={
        status === POST_STATUS.REJECTED
          ? "pink"
          : status === POST_STATUS.BLOCKED
          ? "red"
          : status === POST_STATUS.ON_MODERATION
          ? "gray"
          : "blue"
      }
      styles={{ label: { textTransform: "lowercase" } }}
      {...rest}
    >
      {status}
    </Badge>
  );
};
