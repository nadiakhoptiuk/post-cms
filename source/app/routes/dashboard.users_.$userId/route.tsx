import { useLoaderData } from "react-router";
import { TUserLoaderData } from "./types";
import { Box, Container, Group, Text } from "@mantine/core";
import { NavigationLink } from "~/shared/constants/navigation";
import { EditUserForm } from "~/shared/components/modules/forms/EditUserForm/EditUserForm";
import dayjs from "dayjs";
import { StyledLink } from "~/shared/components/ui/StyledLink";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export { loader } from "./loader";
export { action } from "./action";

export const handle = { i18n: ["user", "common"] };

export default function DashBoardEditUserPage() {
  const { user } = useLoaderData<TUserLoaderData>();
  const { t } = useTranslation("user");

  const {
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    updatedBy,
    updatedById: _updatedById,
    ...userData
  } = user;

  const formattedCreatedDate = dayjs(user.createdAt).format(
    "YYYY-MM-DD  HH:mm"
  );
  const formattedUpdatedDate = dayjs(user.updatedAt).format(
    "YYYY-MM-DD  HH:mm"
  );

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
          <Text mb={15} size="md">
            <Text component="span" fw="bolder">
              Created at{"  "}
            </Text>
            {formattedCreatedDate}
          </Text>

          {formattedCreatedDate !== formattedUpdatedDate && updatedBy && (
            <Group>
              <Text mb={15} size="md">
                <Text component="span" fw="bolder">
                  Last updated at{"  "}
                </Text>
                {formattedUpdatedDate}
              </Text>

              <Text mb={15} size="md">
                <Text component="span" fw="bolder">
                  Updated by{"  "}
                </Text>
                {updatedBy.firstName} {updatedBy.lastName}
              </Text>
            </Group>
          )}
        </Box>

        <EditUserForm userData={userData} formType="update" />
      </Container>
    </Box>
  );
}
