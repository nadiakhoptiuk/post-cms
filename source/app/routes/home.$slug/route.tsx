import { Box, Container } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import { SinglePostPage } from "~/shared/components/modules/SinglePostPage";

import { StyledLink } from "~/shared/components/ui/StyledLink";
import { NavigationLink } from "~/shared/constants/navigation";

export { loader } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export default function DashBoardSinglePostPage() {
  const { post, user } = useLoaderData();
  const { t } = useTranslation("posts");

  return (
    <Box component="section">
      <Container>
        <StyledLink
          to={NavigationLink.HOME}
          variant="unstyled"
          style={{ marginBottom: "30px" }}
        >
          <IconArrowNarrowLeft size={18} />
          {t("link.back")}
        </StyledLink>

        <SinglePostPage post={post} userId={user?.id} />
      </Container>
    </Box>
  );
}
