import { useLoaderData } from "react-router";
import { Box, Container } from "@mantine/core";

import { PostForm } from "~/shared/components/modules/PostForm";

import type { TLoaderData } from "./loader";
import { TimestampItem } from "~/shared/components/ui/TimestampItem";

export { loader } from "./loader";
export { action } from "./action";

export default function DashBoardHomePage() {
  const { post, allTags } = useLoaderData<TLoaderData>();
  const {
    title,
    content,
    slug,
    createdAt,
    updatedAt,
    blockedAt,
    author,
    updatedBy,
    publishedAt,
    moderatedBy,
    tags,
  } = post;

  return (
    <Box component="section" my="lg">
      <Container>
        <Box mb="lg">
          <TimestampItem type="created" date={createdAt} madeBy={author} />

          {publishedAt && (
            <TimestampItem
              type="published"
              date={createdAt}
              madeBy={moderatedBy}
            />
          )}

          {updatedAt && (
            <TimestampItem type="updated" date={updatedAt} madeBy={updatedBy} />
          )}

          {blockedAt && <TimestampItem type="blocked" date={blockedAt} />}
        </Box>

        <PostForm
          postData={{
            title,
            content,
            slug,
            tags,
          }}
          formType="update"
          allTags={allTags}
        />
      </Container>
    </Box>
  );
}
