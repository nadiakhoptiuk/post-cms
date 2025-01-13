import { useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Collapse, List, Button } from "@mantine/core";
import { IconChevronRight, type TablerIcon } from "@tabler/icons-react";

import { StyledNavLink } from "~/shared/components/ui/StyledNavLink";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TLinksGroup } from "./types";

export function NavBarLinksGroup({
  item,
  postsOnModeration,
  postsWithComplaints,
}: TLinksGroup) {
  const { links, link, icon, id } = item;

  const hasLinks = Array.isArray(links);
  const location = useLocation();
  const Icon = icon || undefined;

  const shouldOpenDropdown = () => {
    if (!links) {
      return false;
    }

    const chidPaths = links.map(({ link }) => link);
    return chidPaths.some((el) => el === location.pathname);
  };

  const [opened, setOpened] = useState(shouldOpenDropdown());
  const { t } = useTranslation("dashboard");

  const items = (hasLinks ? links : []).map(({ id, link, icon }) => {
    const Icon: TablerIcon = icon || undefined;
    const count =
      link === NavigationLink.DASHBOARD_POSTS_ON_MODERATION
        ? postsOnModeration
        : link === NavigationLink.DASHBOARD_POSTS_COMPLAINTS
        ? postsWithComplaints
        : 0;

    return (
      <List.Item
        component="div"
        key={id}
        styles={{
          itemWrapper: { width: "100%" },
          itemLabel: { width: "100%" },
        }}
      >
        <StyledNavLink fullWidth to={link} withCount count={count}>
          <Icon />
          <span>{t(`dashboardLinks.${id}`)}</span>
        </StyledNavLink>
      </List.Item>
    );
  });

  return (
    <>
      {hasLinks && (
        <Button
          variant="subtle"
          justify="flex-start"
          onClick={() => setOpened((o) => !o)}
          mt="xs"
          p="xs"
          w="100%"
          h="100%"
          fz="md"
          radius="sm"
          color="dark"
          fw={500}
          leftSection={Icon && <Icon size={22} />}
          rightSection={
            hasLinks && (
              <IconChevronRight
                stroke={1.5}
                size={16}
                style={{
                  transform: opened ? "rotate(-90deg)" : "none",
                }}
              />
            )
          }
        >
          {t(`dashboardLinks.${id}`)}
        </Button>
      )}

      {!hasLinks && link && (
        <List.Item
          w="100%"
          styles={{
            itemWrapper: { width: "100%" },
            itemLabel: { width: "100%" },
          }}
        >
          <StyledNavLink fullWidth to={link}>
            {Icon && <Icon size={22} />}
            <span>{t(`dashboardLinks.${id}`)}</span>
          </StyledNavLink>
        </List.Item>
      )}

      {hasLinks ? (
        <Collapse pl="20" w="100%" in={opened}>
          <List mb="0" mt="xs" spacing="xs">
            {items}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}
