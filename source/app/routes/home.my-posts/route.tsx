import { Box, Container } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostsList } from "~/shared/components/modules/PostsList/PostsList";
import { StyledLink } from "~/shared/components/ui/StyledLink";
import { NavigationLink } from "~/shared/constants/navigation";

export { loader } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export default function HomeMyPostsPage() {
  const { posts, userId } = useLoaderData();
  const { t } = useTranslation("posts");

  return (
    <Box component="section">
      <Container>
        <StyledLink
          fill="filled"
          variant="accent"
          style={{ marginBottom: 30 }}
          to={NavigationLink.MY_POSTS_NEW}
        >
          {t("link.addNewPost")}
        </StyledLink>

        <PostsList posts={posts} userId={userId} />
      </Container>
    </Box>
  );
}
