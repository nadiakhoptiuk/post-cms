import parse from "html-react-parser";
import { Box, Paper, Title } from "@mantine/core";

import { TimestampItem } from "../TimestampItem";

import type { TDBPostRecord, TPost, TPostToTag } from "~/shared/types/react";
import { TagsGroup } from "../TagsGroup/TagsGroup";

export const PostContent = ({
  content,
  title,
  tags,
}: {
  content: string;
  title: string;
  tags: TPostToTag[];
}) => {
  return (
    <Paper shadow="sm" p="xl">
      <Title order={2} mb="lg">
        {title}
      </Title>

      {parse(content)}

      {tags.length > 0 && <TagsGroup tags={tags} />}
    </Paper>
  );
};

export const PostHeading = ({
  post,
  location,
}: {
  post: TPost & TDBPostRecord;
  location: "dashboard" | "site" | "profile";
}) => {
  return (
    <Box>
      {location === "dashboard" && (
        <>
          <TimestampItem
            type="created"
            date={post.createdAt}
            madeBy={post.author}
          />
          <TimestampItem
            type="published"
            date={post.publishedAt}
            madeBy={post.moderatedBy}
          />

          <TimestampItem
            type="updated"
            date={post.updatedAt}
            madeBy={post.updatedBy}
            relative
          />
        </>
      )}

      {location === "site" && (
        <>
          <TimestampItem
            type="created"
            date={post.publishedAt}
            madeBy={post.author}
            relative
            withLabel={false}
          />
          <TimestampItem
            type="updated"
            date={post.updatedAt}
            madeBy={post.updatedBy}
            relative
            withLabel={false}
          />
        </>
      )}

      {location === "profile" && (
        <TimestampItem
          type="updated"
          date={post.updatedAt}
          madeBy={post.updatedBy}
          relative
        />
      )}
    </Box>
  );
};
