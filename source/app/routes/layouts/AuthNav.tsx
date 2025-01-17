import { Flex, List, ListItem } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { StyledNavLink } from "~/shared/components/ui/StyledNavLink";

import { AuthNavLinks } from "~/shared/constants/navigation";

export const AuthNav = ({ burgerMenu = false }: { burgerMenu?: boolean }) => {
  const { t } = useTranslation(["common", "auth"]);

  const items = AuthNavLinks.map(({ id, link }) => (
    <ListItem key={id} w="100%">
      <StyledNavLink to={link} fullWidth size="md" c="blue.8" variant="subtle">
        {t(id)}
      </StyledNavLink>
    </ListItem>
  ));

  return (
    <Flex
      component={List}
      align={burgerMenu ? "flex-start" : "center"}
      justify="flex-start"
      direction={burgerMenu ? "column" : "row"}
      columnGap="xs"
      rowGap="xs"
    >
      {items}
    </Flex>
  );
};
