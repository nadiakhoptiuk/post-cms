import { Box, Container, Pagination, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";

import { SearchForm } from "~/shared/components/modules/SearchForm";

import { PAGE_PARAMETER_NAME } from "~/shared/constants/common";
import type { TLoaderData } from "./loader";
import { ModerationPostsTable } from "./ModerationPostsTable";

export { loader } from "./loader";
export { action } from "./action";

export const handle = { i18n: ["posts", "common"] };

export default function DashBoardModerationPage() {
  const { posts, query, actualPage, pagesCount } = useLoaderData<TLoaderData>();
  const { t } = useTranslation("posts");
  const navigate = useNavigate();

  return (
    <Box component="section">
      <Container>
        {posts?.length > 0 && (
          <>
            <SearchForm query={query} />

            <ModerationPostsTable posts={posts} />

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

        {posts?.length === 0 && (
          <Text mx="auto" mt={30} w="fit-content">
            {t("noPostsForModeration")}
          </Text>
        )}
      </Container>
    </Box>
  );
}
