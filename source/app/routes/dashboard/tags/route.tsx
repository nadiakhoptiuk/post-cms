import { Box, Container, Pagination, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";

import { SearchForm } from "~/shared/components/modules/SearchForm";
import { PAGE_PARAMETER_NAME } from "~/shared/constants/common";
import { TagsTable } from "./TagsTable";
import { StyledLink } from "~/shared/components/ui/StyledLink";
import { NavigationLink } from "~/shared/constants/navigation";
import { IconPlus } from "@tabler/icons-react";

import type { TLoaderData } from "./loader";

export { loader } from "./loader";
export { action } from "./action";

export default function DashBoardTagsPage() {
  const { tags, query, actualPage, pagesCount } = useLoaderData<TLoaderData>();
  const navigate = useNavigate();
  const { t: tg } = useTranslation("tags");

  return (
    <Box component="section" py="lg">
      <Container>
        <StyledLink to={NavigationLink.DASHBOARD_TAGS_NEW}>
          <IconPlus />
          <Text component="span" visibleFrom="xs">
            {tg("link.addNewTag")}
          </Text>
        </StyledLink>

        <SearchForm query={query} />

        {tags?.length > 0 && (
          <>
            <TagsTable tags={tags} />

            <Pagination
              total={pagesCount}
              value={actualPage}
              onChange={(page) =>
                navigate({ search: `?${PAGE_PARAMETER_NAME}=${page}` })
              }
              mt="md"
              mx="auto"
              w="fit-content"
            />
          </>
        )}

        {tags?.length === 0 && (
          <Text mx="auto" w="fit-content" mt="lg" size="md">
            {tg("noTags")}
          </Text>
        )}
      </Container>
    </Box>
  );
}
