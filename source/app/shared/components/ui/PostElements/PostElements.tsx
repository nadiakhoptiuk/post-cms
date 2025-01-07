import parse from "html-react-parser";
import { Box, Paper, Title } from "@mantine/core";

import { TimestampItem } from "../TimestampItem";

import type { TDBPostRecord, TPost } from "~/shared/types/react";
import { formatDateWithTime } from "~/shared/utils/dateFormat";

export const PostContent = ({
  content,
  title,
}: {
  content: string;
  title: string;
}) => {
  return (
    <Paper shadow="xs" p="xl">
      <Title order={2} mb={30}>
        {title}
      </Title>

      {parse(content)}
    </Paper>
  );
};

export const PostHeading = ({ post }: { post: TPost & TDBPostRecord }) => {
  const createdDate = formatDateWithTime(post.createdAt);
  const updatedDate = formatDateWithTime(post.updatedAt);

  return (
    <Box>
      <TimestampItem type="created" date={createdDate} madeBy={post.author} />
      {/* //TODO change to published */}

      <TimestampItem
        type="updated"
        date={updatedDate}
        // madeBy={post.updatedBy}
      />
    </Box>
  );
};
