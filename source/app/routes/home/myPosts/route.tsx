import { Box, Container } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostsList } from "../PostsList";
import { StyledLink } from "~/shared/components/ui/StyledLink";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TLoaderData } from "./loader";

export { loader } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export default function HomeMyPostsPage() {
  const { posts, user } = useLoaderData<TLoaderData>();
  const { t } = useTranslation("posts");

  return (
    <Box component="section" py="lg">
      <Container>
        <StyledLink
          variant="filled"
          mb="lg"
          mx="auto"
          to={NavigationLink.MY_POSTS_NEW}
        >
          {t("link.addNewPost")}
        </StyledLink>

        <PostsList posts={posts} userId={user?.id} />
      </Container>
    </Box>
  );
}
