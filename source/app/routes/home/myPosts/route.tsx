import { Box, Container } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostsList } from "../PostsList";
import { StyledLink } from "~/shared/components/ui/StyledLink";

import { NavigationLink } from "~/shared/constants/navigation";

export { loader } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export default function HomeMyPostsPage() {
  const { posts, userId } = useLoaderData();
  const { t } = useTranslation("posts");

  return (
    <Box component="section" py="lg">
      <Container>
        <StyledLink
          fill="filled"
          variant="accent"
          style={{ marginBottom: 30, marginLeft: "auto", marginRight: "auto" }}
          to={NavigationLink.MY_POSTS_NEW}
        >
          {t("link.addNewPost")}
        </StyledLink>

        <PostsList posts={posts} userId={userId} />
      </Container>
    </Box>
  );
}