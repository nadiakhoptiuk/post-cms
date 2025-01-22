import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router";
import { Box, Container, Title } from "@mantine/core";
import { Tabs } from "./Tabs";

export const handle = { i18n: ["notifications", "common"] };

export { loader } from "./loader";

export default function HomeNotificationsPage() {
  const location = useLocation();
  const { t } = useTranslation("common");

  const locationArr = location.pathname.split("/");
  const tabValue = locationArr[locationArr.length - 1];

  return (
    <>
      <Box component="section" my="lg">
        <Container>
          <Title order={2} mb="lg">
            {t("userBarNavLinks.notifications")}
          </Title>

          <Tabs tabValue={tabValue} />
        </Container>
      </Box>

      <Outlet />
    </>
  );
}
