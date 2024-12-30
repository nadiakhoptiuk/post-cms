import { useTranslation } from "react-i18next";
import { Table as MTable } from "@mantine/core";
import dayjs from "dayjs";

import { RemixLink } from "../../ui/RemixLink";
import { TableTd, TableTh } from "../../ui/TableElements";

import { TUsersTable } from "./UsersTable.types";
import { NavigationLink } from "~/shared/constants/navigation";

export const UsersTable = ({ users }: TUsersTable) => {
  const { t } = useTranslation("user");

  const rows = users.map((user) => {
    const formattedCreatedDate = dayjs(user.createdAt).format(
      "YYYY-MM-DD  HH:mm"
    );
    const formattedUpdatedDate = dayjs(user.updatedAt).format(
      "YYYY-MM-DD  HH:mm"
    );

    return (
      <MTable.Tr key={user.id}>
        <TableTd>
          <RemixLink
            variant="accent"
            to={`${NavigationLink.DASHBOARD_USERS}/${user.id}`}
          >
            {t("buttons.button.edit", { ns: "common" })}
          </RemixLink>
        </TableTd>
        <TableTd>{user.lastName}</TableTd>
        <TableTd>{user.firstName}</TableTd>
        <TableTd>{user.email}</TableTd>
        <TableTd>{user.role}</TableTd>
        <TableTd>{formattedCreatedDate}</TableTd>
        <TableTd>
          {formattedCreatedDate === formattedUpdatedDate
            ? ""
            : formattedUpdatedDate}
        </TableTd>
        <TableTd>
          {user.updatedBy?.lastName} {user.updatedBy?.firstName}
        </TableTd>
      </MTable.Tr>
    );
  });

  return (
    <MTable.ScrollContainer type="scrollarea" minWidth={500}>
      <MTable highlightOnHover withColumnBorders>
        <MTable.Thead>
          <MTable.Tr>
            <TableTh>{""}</TableTh>
            <TableTh>{t("userData.lastName")}</TableTh>
            <TableTh>{t("userData.firstName")}</TableTh>
            <TableTh>{t("userData.email")}</TableTh>
            <TableTh>{t("userData.role")}</TableTh>
            <TableTh>{t("userData.createdAt")}</TableTh>
            <TableTh>{t("userData.updatedAt")}</TableTh>
            <TableTh>{t("userData.updatedBy")}</TableTh>
          </MTable.Tr>
        </MTable.Thead>

        <MTable.Tbody>{rows}</MTable.Tbody>
      </MTable>
    </MTable.ScrollContainer>
  );
};
