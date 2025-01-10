import { Box, Container, Pagination, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";

import { PostsTable } from "~/shared/components/modules/PostsTable";
import { SearchForm } from "~/shared/components/modules/SearchForm";

import { PAGE_PARAMETER_NAME } from "~/shared/constants/common";

export { loader } from "./loader";
// export { action } from "./action";

export const handle = { i18n: ["posts", "common"] };

export default function DashBoardComplaintsPage() {
  const { posts, query, actualPage, pagesCount } = useLoaderData();
  const { t } = useTranslation("posts");
  const navigate = useNavigate();

  return (
    <Box component="section">
      <Container>
        <Box mb={30} w="100%" maw={500} mx="auto" mt={20}>
          <SearchForm query={query} />
        </Box>

        {posts.length === 0 && (
          <Text mx="auto" mt={30} w="fit-content">
            {t("noPostsForModeration")}
          </Text>
        )}

        {posts.length > 0 && <PostsTable posts={posts} />}

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
      </Container>
    </Box>
  );
}
