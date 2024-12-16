// import { useState } from "react";
// import { useDisclosure } from "@mantine/hooks";
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { NavigationLink, UserBarNavLinks } from "~/shared/constants/navigation";

export const UserBar = ({ user }: { user: { name: string } }) => {
  // const [opened, { toggle }] = useDisclosure(false);
  // const [userMenuOpened, setUserMenuOpened] = useState(false);

  const { t } = useTranslation();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      // onClose={() => setUserMenuOpened(false)}
      // onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          // className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
          className=""
        >
          <Group gap={7}>
            <Avatar alt={user.name} radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.name}
            </Text>
            {/* <IconChevronDown size={12} stroke={1.5} /> */}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {UserBarNavLinks.map(({ id, link }) => {
          return (
            <Menu.Item
              key={id}
              // leftSection={
              //   <IconStar size={16} color={theme.colors.yellow[6]} stroke={1.5} />
              // }
            >
              <NavLink
                to={link}
                // className={classes.link}
              >
                {t(`userBarNavLinks.${id}`)}
              </NavLink>
            </Menu.Item>
          );
        })}

        <Menu.Divider />
        <Menu.Item
          color="red"
          // leftSection={<IconTrash size={16} stroke={1.5} />}
        >
          <NavLink
            to={NavigationLink.LOGOUT}
            // className={classes.link}
          >
            {t("auth.logout")}
          </NavLink>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>

        <Menu.Item
          color="red"
          // leftSection={<IconTrash size={16} stroke={1.5} />}
        >
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
