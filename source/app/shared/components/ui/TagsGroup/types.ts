import type { GroupProps } from "@mantine/core";
import type { TPostToTag } from "~/shared/types/react";

export interface TTagsGroup extends GroupProps {
  tags: TPostToTag[];
}
