import { Box, Container, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostForm } from "~/shared/components/modules/PostForm";
import type { TLoaderData } from "./loader";

export { action } from "./action";
export { loader } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export default function HomeNewPostPage() {
  const { allTags } = useLoaderData<TLoaderData>();
  const { t } = useTranslation("posts");

  return (
    <Box component="section" my="lg">
      <Container>
        <Title
          order={2}
          size="xl"
          styles={{ root: { textAlign: "center", marginBottom: 30 } }}
        >
          {t("link.addNewPost")}
        </Title>

        <PostForm
          postData={{ title: "", content: "", slug: "", tags: [] }}
          formType="create"
          allTags={allTags}
        />
      </Container>
    </Box>
  );
}
