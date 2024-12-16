import { useState } from "react";
import { NavLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Box, Collapse, Group, UnstyledButton } from "@mantine/core";
// import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";

import { TDashboardNavLink } from "~/shared/types/remix";
import classes from "./NavBarLinksGroup.module.css";

export function LinksGroup({ links, link, id }: TDashboardNavLink) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation("dashboard");

  const items = (hasLinks ? links : []).map((link) => {
    return (
      <NavLink
        key={link.id}
        to={link.link}
        className={({ isActive }) =>
          isActive ? classes.nestedLinkActive : classes.nestedLink
        }
      >
        {/* <Icon /> */}
        <span>{t(`dashboardLinks.${link.id}`)}</span>
      </NavLink>
    );
  });

  return (
    <>
      {hasLinks && (
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.link}
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
        <NavLink
          to={link}
          className={({ isActive }) =>
            isActive ? classes.linkActive : classes.link
          }
        >
          {t(`dashboardLinks.${id}`)}
        </NavLink>
      )}

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
