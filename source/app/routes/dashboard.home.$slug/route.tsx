import { Box, Container, Title } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostContent } from "~/shared/components/ui/PostElements";
import { StyledLink } from "~/shared/components/ui/StyledLink";
import { NavigationLink } from "~/shared/constants/navigation";

export { loader } from "./loader";

export default function DashBoardSinglePostPage() {
  const { post } = useLoaderData();
  const { t } = useTranslation("posts");

  return (
    <Box component="section">
      <Container>
        <StyledLink
          to={NavigationLink.DASHBOARD}
          variant="unstyled"
          style={{ marginBottom: "20px" }}
        >
          <IconArrowNarrowLeft size={18} />
          {t("link.back")}
        </StyledLink>

        <Title order={2}>{post.title}</Title>
        <PostContent content={post.content} />

        {/* {user.id && user.id !== post.ownerId && (
          <StyledLink to="complain" variant="unstyled" fill="outline">
            {t("buttons.button.complain")}
          </StyledLink>
        )} */}
      </Container>
    </Box>
  );
}
