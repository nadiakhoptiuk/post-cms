import { Form } from "react-router";
import { useTranslation } from "react-i18next";
import { Avatar, Grid, Menu, Text } from "@mantine/core";
import { IconChevronDown, IconLogout, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { Button } from "../Button";
import { LanguageSelector } from "../LanguageSelector";
import { Modal } from "../Modal";
import { StyledNavLink } from "../StyledNavLink";

import { NavigationLink, UserBarNavLinks } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type { TUserBar } from "./UserBar.types";

export const UserBar = ({ user, locale }: TUserBar) => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Menu
        width={200}
        position="bottom"
        transitionProps={{ transition: "pop-top-right" }}
        withinPortal
        shadow="md"
        trigger="click-hover"
      >
        <Menu.Target>
          <Button
            size="md"
            variant="transparent"
            c="blue.8"
            justify="flex-end"
            leftSection={
              <Avatar alt="user" color="blue.8" radius="xl" size="md" />
            }
            rightSection={<IconChevronDown size={18} stroke={1.5} />}
          >
            <Text component="span" visibleFrom="sm" fw={500}>
              {user.firstName} {user.lastName}
            </Text>
          </Button>
        </Menu.Target>

        <Menu.Dropdown component="div" p="xs">
          {UserBarNavLinks.map(({ id, link, icon: Icon }) => {
            if (link === NavigationLink.DASHBOARD && user.role !== ROLE_ADMIN) {
              return null;
            }

            return (
              <Menu.Item key={id} component="div" p="0">
                <StyledNavLink
                  to={link}
                  variant="subtle"
                  fullWidth
                  justify="flex-start"
                  size="md"
                  c="gray.7"
                  leftSection={Icon && <Icon size={22} />}
                >
                  {t(`userBarNavLinks.${id}`)}
                </StyledNavLink>
              </Menu.Item>
            );
          })}

          <Menu.Divider m="xs" />
          <LanguageSelector
            locale={locale}
            styles={{
              root: { width: "fit-content", padding: "8px 12px" },
            }}
          />

          <Menu.Divider m="xs" />
          <Menu.Item component="div" p="0">
            <Form action={NavigationLink.LOGOUT} method="post">
              <Button
                type="submit"
                c="gray"
                fullWidth
                justify="flex-start"
                variant="transparent"
                fw="normal"
                leftSection={<IconLogout size={22} stroke={1.5} />}
              >
                {t("auth.logout")}
              </Button>
            </Form>
          </Menu.Item>

          <Menu.Divider m="xs" />
          <Menu.Item
            component="div"
            onClick={open}
            color="red"
            p="xs"
            leftSection={<IconTrash size={22} stroke={1.5} />}
          >
            <Text component="span" size="md">
              {t("auth.deleteAccount")}
            </Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal
        opened={opened}
        onClose={close}
        title={t("modal.title")}
        p="lg"
        centered
      >
        {
          <Grid columns={2}>
            <Grid.Col span={1}>
              <Button variant="light" onClick={close} w="100%">
                Cancel
              </Button>
            </Grid.Col>

            <Grid.Col span={1}>
              <Form action={NavigationLink.DELETE_ACCOUNT} method="post">
                <Button
                  type="submit"
                  c="red"
                  fullWidth
                  justify="flex-start"
                  p="xs"
                  variant="light"
                  leftSection={
                    <IconTrash
                      size={22}
                      stroke={1.5}
                      style={{ marginRight: 10 }}
                    />
                  }
                >
                  {t("auth.deleteAccount")}
                </Button>
              </Form>
            </Grid.Col>
          </Grid>
        }
      </Modal>
    </>
  );
};
