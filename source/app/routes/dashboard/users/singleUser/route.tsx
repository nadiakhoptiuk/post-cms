import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, Container } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

import { StyledLink } from "~/shared/components/ui/StyledLink";

import { NavigationLink } from "~/shared/constants/navigation";

import { formatDateWithTime } from "~/shared/utils/dateFormat";
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

  const createdDate = formatDateWithTime(createdAt);
  const updatedDate = formatDateWithTime(updatedAt);
  const deletedDate = formatDateWithTime(deletedAt);

  return (
    <Box component="section">
      <Container>
        <StyledLink
          to={NavigationLink.DASHBOARD_USERS}
          variant="unstyled"
          style={{ marginBottom: "20px" }}
        >
          <IconArrowNarrowLeft size={18} />
          {t("link.back")}
        </StyledLink>

        <Box mb={25}>
          <TimestampItem type="created" date={createdDate} />

          {updatedDate && updatedBy && (
            <TimestampItem
              type="updated"
              date={updatedDate}
              madeBy={updatedBy}
            />
          )}

          {deletedDate && deletedBy && (
            <TimestampItem
              type="deleted"
              date={deletedDate}
              madeBy={deletedBy}
            />
          )}
        </Box>

        <EditUserForm
          userData={userData}
          formType="update"
          hasBeenDeleted={!!deletedDate}
        />
      </Container>
    </Box>
  );
}
