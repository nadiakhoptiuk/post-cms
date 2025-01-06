import { Box, Container } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { StyledLink } from "~/shared/components/ui/StyledLink";
import { NavigationLink } from "~/shared/constants/navigation";

export const handle = { i18n: ["posts"] };

export default function DashBoardMyPostsPage() {
  const { t } = useTranslation();

  return (
    <Box component="section">
      <Container>
        <StyledLink to={NavigationLink.DASHBOARD_MY_POSTS_NEW}>
          {t("link.addNewPost", { ns: "posts" })}
        </StyledLink>
      </Container>
    </Box>
  );
}
