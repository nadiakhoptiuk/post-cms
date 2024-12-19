import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Collapse, Group, List, UnstyledButton } from "@mantine/core";
// import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";

import { RemixLink } from "../../ui/RemixLink";

import { TDashboardNavLink } from "~/shared/types/remix";

import classes from "./NavBarLinksGroup.module.css";
import { useLocation } from "@remix-run/react";

export function LinksGroup({ links, link, id }: TDashboardNavLink) {
  const hasLinks = Array.isArray(links);
  const location = useLocation();

  const shouldOpenDropdown = () => {
    if (!links) {
      return false;
    }

    const chidPaths = links.map(({ link }) => link);
    return chidPaths.some((el) => el === location.pathname);
  };

  const [opened, setOpened] = useState(shouldOpenDropdown());
  const { t } = useTranslation("dashboard");

  const items = (hasLinks ? links : []).map((link) => {
    return (
      <List.Item
        key={link.id}
        w="100%"
        styles={{
          itemWrapper: { width: "100%" },
          itemLabel: { width: "100%" },
        }}
      >
        <RemixLink variant="accent" fullWidth to={link.link}>
          {/* <Icon /> */}
          <span>{t(`dashboardLinks.${link.id}`)}</span>
        </RemixLink>
      </List.Item>
    );
  });

  return (
    <>
      {hasLinks && (
        <UnstyledButton
          mt="xs"
          c="dark"
          onClick={() => setOpened((o) => !o)}
          className={classes.button}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              {/* <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon> */}
              <Box>{t(`dashboardLinks.${id}`)}</Box>
            </Box>

            {/* {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          )} */}
          </Group>
        </UnstyledButton>
      )}

      {!hasLinks && link && (
        <List.Item
          w="100%"
          styles={{
            itemWrapper: { width: "100%" },
            itemLabel: { width: "100%" },
          }}
        >
          <RemixLink fullWidth to={link}>
            {t(`dashboardLinks.${id}`)}
          </RemixLink>
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
