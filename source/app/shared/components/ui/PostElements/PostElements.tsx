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
  const createdDate = formatDateWithMonthName(post.createdAt);
  const updatedDate = formatDateWithMonthName(post.updatedAt);

  return (
    <Box>
      <TimestampItem type="created" date={createdDate} madeBy={post.author} />
      {/* //TODO change to published */}

      {updatedDate && (
        <TimestampItem
          type="updated"
          date={updatedDate}
          // madeBy={post.updatedBy} //TODO change if admin can update posts
        />
      )}
    </Box>
  );
};
