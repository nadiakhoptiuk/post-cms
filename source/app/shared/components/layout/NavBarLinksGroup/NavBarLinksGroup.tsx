import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Collapse, Group, UnstyledButton } from "@mantine/core";
// import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";

import { RemixLink } from "../../ui/RemixLink";

import { TDashboardNavLink } from "~/shared/types/remix";

import classes from "./NavBarLinksGroup.module.css";

export function LinksGroup({ links, link, id }: TDashboardNavLink) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation("dashboard");

  const items = (hasLinks ? links : []).map((link) => {
    return (
      <RemixLink variant="accent" fullWidth key={link.id} to={link.link}>
        {/* <Icon /> */}
        <span>{t(`dashboardLinks.${link.id}`)}</span>
      </RemixLink>
    );
  });

  return (
    <>
      {hasLinks && (
        <UnstyledButton
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
        <RemixLink fullWidth to={link}>
          {t(`dashboardLinks.${id}`)}
        </RemixLink>
      )}

      {hasLinks ? (
        <Collapse pl="20" w="100%" in={opened}>
          {items}
        </Collapse>
      ) : null}
    </>
  );
}
