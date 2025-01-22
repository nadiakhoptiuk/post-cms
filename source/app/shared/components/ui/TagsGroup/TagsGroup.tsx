import { Badge, Group } from "@mantine/core";
import type { TTagsGroup } from "./types";

export const TagsGroup = ({ tags, ...rest }: TTagsGroup) => {
  return (
    <Group mt="xl" {...rest}>
      {tags.map(({ tagName, tagId }) => (
        <Badge variant="light" size="lg" tt="lowercase" key={tagId}>
          {tagName}
        </Badge>
      ))}
    </Group>
  );
};
