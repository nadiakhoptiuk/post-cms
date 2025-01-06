import { Box, Container, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostForm } from "~/shared/components/modules/PostForm";
import { NavigationLink } from "~/shared/constants/navigation";

export const handle = { i18n: ["posts", "common"] };

export { loader } from "./loader";

export default function DashBoardMyCurrentPostPage() {
  const { t } = useTranslation();
  const { post } = useLoaderData();

  return (
    <Box component="section">
      <Container>
        <Title
          order={2}
          size="xl"
          styles={{ root: { textAlign: "center", marginBottom: 30 } }}
        >
          {t("link.addNewPost", { ns: "posts" })}
        </Title>

        <PostForm
          postData={post}
          formType="update"
          action={NavigationLink.UPDATE_POST}
        />
      </Container>
    </Box>
  );
}
