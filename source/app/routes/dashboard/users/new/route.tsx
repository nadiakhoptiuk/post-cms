import { useTranslation } from "react-i18next";
import { Box, Container, Text } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

import { StyledLink } from "~/shared/components/ui/StyledLink";

import { NavigationLink } from "~/shared/constants/navigation";
import { EditUserForm } from "../EditUserForm";

export { action } from "./action";

export const handle = { i18n: ["user", "common"] };

export default function DashBoardCreateUserPage() {
  const { t } = useTranslation("user");

  return (
    <Box component="section">
      <Container>
        <StyledLink
          to={NavigationLink.DASHBOARD_USERS}
          variant="unstyled"
          mb="lg"
        >
          <IconArrowNarrowLeft size={18} />
          {t("link.back")}
        </StyledLink>

        <Text fw="bold" mb="lg" ta="center" size="xl">
          {t("title.newUser")}
        </Text>

        <EditUserForm
          userData={{ firstName: "", lastName: "", email: "", role: "user" }}
          formType="create"
        />
      </Container>
    </Box>
  );
}
