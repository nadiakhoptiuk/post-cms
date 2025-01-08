import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import { PostsTable } from "~/shared/components/modules/PostsTable";

export { loader } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export default function DashBoardModerationPage() {
  const { posts } = useLoaderData();
  const { t } = useTranslation("posts");

  console.log(posts);

  return (
    <>
      {posts.length > 0 && <PostsTable posts={posts} />}

      {posts.length === 0 && <Text>{t("noPostsForModeration")}</Text>}
    </>
  );
}
