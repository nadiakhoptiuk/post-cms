import { Box, Container, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { PostForm } from "~/shared/components/modules/PostForm";

export { action } from "./action";
export { loader } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export default function HomeNewPostPage() {
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
          postData={{ title: "", content: "", slug: "" }}
          formType="create"
        />
      </Container>
    </Box>
  );
}
