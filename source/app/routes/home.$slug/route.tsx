import { Box, Container, Title } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostContent, PostHeading } from "~/shared/components/ui/PostElements";
import { StyledLink } from "~/shared/components/ui/StyledLink";
import { NavigationLink } from "~/shared/constants/navigation";

export { loader } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export default function DashBoardSinglePostPage() {
  const { post, user } = useLoaderData();
  const { t } = useTranslation("common");

  return (
    <Box component="section">
      <Container>
        <StyledLink
          to={NavigationLink.DASHBOARD}
          variant="unstyled"
          style={{ marginBottom: "30px" }}
        >
          <IconArrowNarrowLeft size={18} />
          {t("link.back", { ns: "posts" })}
        </StyledLink>

        <PostHeading post={post} />

        <PostContent content={post.content} title={post.title} />

        {user?.id && user?.id !== post.ownerId && (
          <StyledLink
            to="complain"
            variant="unstyled"
            fill="outline"
            style={{ marginTop: 30 }}
          >
            {t("buttons.button.complain")}
          </StyledLink>
        )}
      </Container>
    </Box>
  );
}
