import { Box, Container, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { StyledLink } from "~/shared/components/ui/StyledLink";
import { NavigationLink } from "~/shared/constants/navigation";

export default function NotFound() {
  const { t } = useTranslation("common");

  return (
    <Box component="section" py="lg">
      <Container>
        <Title order={1} w="fit-content" mx="auto">
          404 - {t("responseErrors.notFound")}
        </Title>

        <StyledLink
          to={NavigationLink.HOME}
          mx="auto"
          my="lg"
          display="block"
          w="fit-content"
        >
          {t("goToHomePage")}
        </StyledLink>
      </Container>
    </Box>
  );
}
