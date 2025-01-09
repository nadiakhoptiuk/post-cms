import { Badge } from "@mantine/core";

import { POST_STATUS } from "~/shared/constants/common";

export const StatusBadge = ({
  status,
}: {
  status: (typeof POST_STATUS)[keyof typeof POST_STATUS];
}) => {
  return (
    <Badge
      fullWidth
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
    >
      {status}
    </Badge>
  );
};
