import { Box, Container, Group } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";
import { SinglePostPage } from "~/shared/components/modules/SinglePostPage";
import { Button } from "~/shared/components/ui/Button";

import { StyledLink } from "~/shared/components/ui/StyledLink";
import { NavigationLink } from "~/shared/constants/navigation";

export { loader } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export default function DashBoardSinglePostPage() {
  const { post, user } = useLoaderData();
  const { t } = useTranslation("posts");
  const navigate = useNavigate();

  return (
    <Box component="section">
      <Container>
        <Group mb={30}>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            size="sm"
            variant="light"
          >
            <IconArrowNarrowLeft size={18} />
            {t("buttons.button.back", { ns: "common" })}
          </Button>

          <StyledLink to={NavigationLink.HOME} variant="accent" fill="filled">
            {t("link.toAll")}
          </StyledLink>
        </Group>

        <SinglePostPage post={post} userId={user?.id} />
      </Container>
    </Box>
  );
}
