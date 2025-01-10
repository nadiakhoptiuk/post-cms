import { Box, Container, Pagination } from "@mantine/core";
import { useLoaderData, useNavigate } from "react-router";

import { PostsList } from "~/shared/components/modules/PostsList";
import { SearchForm } from "~/shared/components/modules/SearchForm";
import { PAGE_PARAMETER_NAME } from "~/shared/constants/common";

export { loader } from "./loader";

export default function DashBoardHomePage() {
  const { posts, query, user, actualPage, pagesCount } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Box component="section">
      <Container>
        <Box mb={30} w="100%" maw={500} mx="auto" mt={20}>
          <SearchForm query={query} />
        </Box>

        <PostsList posts={posts} userId={user?.id} />

        <Pagination
          total={pagesCount}
          value={actualPage}
          onChange={(page) =>
            navigate({ search: `?${PAGE_PARAMETER_NAME}=${page}` })
          }
          mt="xl"
          mx="auto"
          w="fit-content"
          size="lg"
        />
      </Container>
    </Box>
  );
}
