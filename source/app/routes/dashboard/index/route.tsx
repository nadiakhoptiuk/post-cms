import { useTranslation } from "react-i18next";
import { Box, Container, Text } from "@mantine/core";

export const handle = { i18n: ["dashboard"] };

export default function DashBoardHomePage() {
  const { t } = useTranslation("dashboard");

  return (
    <Box component="section">
      <Container>
        <Text mx="auto" w="fit-content" mt={30} size="xl" fw={700}>
          {t("adminGreeting")}
        </Text>

        <Text mx="auto" w="fit-content" mt={30} size="md">
          {t("adminChoose")}
        </Text>
      </Container>
    </Box>
  );
}
