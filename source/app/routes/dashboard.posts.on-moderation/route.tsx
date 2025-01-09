import { Box, Container, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostsTable } from "~/shared/components/modules/PostsTable";

export { loader } from "./loader";
export { action } from "./action";

export const handle = { i18n: ["posts", "common"] };

export default function DashBoardModerationPage() {
  const { posts } = useLoaderData();
  const { t } = useTranslation("posts");

  return (
    <Box component="section">
      <Container>
        {posts.length > 0 && <PostsTable posts={posts} />}

        {posts.length === 0 && (
          <Text mx="auto" mt={30} w="fit-content">
            {t("noPostsForModeration")}
          </Text>
        )}
      </Container>
    </Box>
  );
}
