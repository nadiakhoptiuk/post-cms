import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

export { loader } from "./loader";

export default function DashBoardModerationPage() {
  const { posts } = useLoaderData();
  const { t } = useTranslation("posts");

  console.log(posts);

  return (
    <>
      {/* {posts.length > 0 && <PostsTable/>} */}
      {posts.length === 0 && <Text>{t("noPostsForModeration")}</Text>}
    </>
  );
}
