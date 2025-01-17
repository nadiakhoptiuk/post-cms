import { Box, Container, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { StyledLink } from "~/shared/components/ui/StyledLink";
import { NavigationLink } from "~/shared/constants/navigation";

import { TagForm } from "../TagForm";
import { IconArrowBack } from "@tabler/icons-react";

export { loader } from "./loader";
export { action } from "./action";

export default function DashBoardNewTagPage() {
  const { t } = useTranslation("common");
  const { t: tg } = useTranslation("tags");

  return (
    <Box component="section" py="lg">
      <Container>
        <StyledLink
          to={NavigationLink.DASHBOARD_TAGS}
          mb="lg"
          variant="subtle"
          leftSection={<IconArrowBack />}
        >
          <Text component="span" visibleFrom="xs">
            {t("buttons.button.back")}
          </Text>
        </StyledLink>

        <Title order={2} mb="lg" w="fit-content" mx="auto">
          {tg("link.addNewTag")}
        </Title>

        <TagForm formType="create" tagData={{ name: "" }} />
      </Container>
    </Box>
  );
}
