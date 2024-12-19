import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { NavigationLink, UserBarNavLinks } from "~/shared/constants/navigation";
import { RemixLink } from "../RemixLink/RemixLink";

import classes from "./UserBar.module.css";

export const UserBar = ({ user }: { user: { name: string } }) => {
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
            {/* <IconChevronDown size={12} stroke={1.5} /> */}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown component="div">
        {UserBarNavLinks.map(({ id, link }) => {
          return (
            <Menu.Item
              key={id}
              component="div"
              className={classes.item}
              // leftSection={
              //   <IconStar size={16} color={theme.colors.yellow[6]} stroke={1.5} />
              // }
            >
              <RemixLink to={link} fullWidth>
                {t(`userBarNavLinks.${id}`)}
              </RemixLink>
            </Menu.Item>
          );
        })}

        <Menu.Divider />
        <Menu.Item
          component="div"
          className={classes.item}
          // leftSection={<IconTrash size={16} stroke={1.5} />}
        >
          <RemixLink to={NavigationLink.LOGOUT} fullWidth>
            {t("auth.logout")}
          </RemixLink>
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item
          className={classes.item}
          color="red"
          // leftSection={<IconTrash size={16} stroke={1.5} />}
        >
          <RemixLink
            to={NavigationLink.DELETE_ACCOUNT}
            fullWidth
            variant="dangerous"
          >
            {t("auth.deleteAccount")}
          </RemixLink>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
