import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconChevronDown, IconLogout, IconTrash } from "@tabler/icons-react";

import { RemixLink } from "../RemixLink/RemixLink";
import { LanguageSelector } from "../LanguageSelector";

import { NavigationLink, UserBarNavLinks } from "~/shared/constants/navigation";
import { TUserBar } from "./UserBar.types";

export const UserBar = ({ user, locale }: TUserBar) => {
  const { t } = useTranslation();

  return (
    <Menu
      width={180}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton>
          <Group gap={7}>
            <Avatar alt={user.name} color="cyan" radius="xl" size={30} />

            <Text fw={500} size="sm" visibleFrom="xs" lh={1} mr={3}>
              {user.name}
            </Text>

            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown component="div">
        {UserBarNavLinks.map(({ id, link, icon: Icon }) => {
          return (
            <Menu.Item key={id} component="div" p="0">
              <RemixLink to={link} fullWidth>
                {Icon && <Icon size={22} />}

                {t(`userBarNavLinks.${id}`)}
              </RemixLink>
            </Menu.Item>
          );
        })}

        <Menu.Divider styles={{ divider: { margin: "8px" } }} />
        <LanguageSelector
          locale={locale}
          styles={{
            root: { width: "fit-content", padding: "8px 12px" },
          }}
        />

        <Menu.Divider styles={{ divider: { margin: "8px" } }} />
        <Menu.Item component="div" p="0">
          <RemixLink to={NavigationLink.LOGOUT} fullWidth>
            <IconLogout size={22} stroke={1.5} />
            {t("auth.logout")}
          </RemixLink>
        </Menu.Item>

        <Menu.Divider styles={{ divider: { margin: "8px" } }} />
        <Menu.Item p="0" color="red">
          <RemixLink
            to={NavigationLink.DELETE_ACCOUNT}
            fullWidth
            variant="dangerous"
          >
            <IconTrash size={22} stroke={1.5} />
            {t("auth.deleteAccount")}
          </RemixLink>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
