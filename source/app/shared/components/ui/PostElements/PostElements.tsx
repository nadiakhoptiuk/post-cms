import parse from "html-react-parser";
import { Box, Paper, Title } from "@mantine/core";

import { TimestampItem } from "../TimestampItem";

import type { TDBPostRecord, TPost } from "~/shared/types/react";
import { formatDateWithMonthName } from "~/shared/utils/dateFormat";

export const PostContent = ({
  content,
  title,
}: {
  content: string;
  title: string;
}) => {
  return (
    <Paper shadow="sm" p="xl">
      <Title order={2} mb={30}>
        {title}
      </Title>

      {parse(content)}
    </Paper>
  );
};

export const PostHeading = ({ post }: { post: TPost & TDBPostRecord }) => {
  const updatedDate = formatDateWithMonthName(post.updatedAt);
  const publishedDate = formatDateWithMonthName(post.publishedAt);

  return (
    <Box>
      <TimestampItem
        type="published"
        date={publishedDate}
        madeBy={post.author}
      />

      {updatedDate && (
        <TimestampItem
          type="updated"
          date={updatedDate}
          madeBy={post.updatedBy}
        />
      )}
    </Box>
  );
};
