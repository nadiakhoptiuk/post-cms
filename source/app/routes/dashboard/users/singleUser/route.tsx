import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, Container } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

import { StyledLink } from "~/shared/components/ui/StyledLink";

import { NavigationLink } from "~/shared/constants/navigation";

import { TimestampItem } from "~/shared/components/ui/TimestampItem";
import { EditUserForm } from "../EditUserForm";
import type { TLoaderData } from "./loader";

export { loader } from "./loader";
export { action } from "./action";

export const handle = { i18n: ["user", "common"] };

export default function DashBoardEditUserPage() {
  const { user } = useLoaderData<TLoaderData>();
  const { t } = useTranslation("user");

  const { createdAt, updatedAt, updatedBy, deletedAt, deletedBy, ...userData } =
    user;

  return (
    <Box component="section" my="lg">
      <Container>
        <StyledLink
          to={NavigationLink.DASHBOARD_USERS}
          variant="unstyled"
          mb="lg"
        >
          <IconArrowNarrowLeft size={18} />
          {t("link.back")}
        </StyledLink>

        <Box mb="lg">
          <TimestampItem type="created" date={createdAt} />

          {updatedAt && updatedBy && (
            <TimestampItem type="updated" date={updatedAt} madeBy={updatedBy} />
          )}

          {deletedAt && deletedBy && (
            <TimestampItem type="deleted" date={deletedAt} madeBy={deletedBy} />
          )}
        </Box>

        <EditUserForm
          userData={userData}
          formType="update"
          hasBeenDeleted={!!deletedAt}
        />
      </Container>
    </Box>
  );
}
