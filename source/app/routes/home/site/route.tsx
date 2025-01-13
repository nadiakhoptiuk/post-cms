import { Box, Container, Pagination } from "@mantine/core";
import { useLoaderData, useNavigate } from "react-router";

import { SearchForm } from "~/shared/components/modules/SearchForm";
import { PostsList } from "../PostsList";

import { PAGE_PARAMETER_NAME } from "~/shared/constants/common";

export { loader } from "./loader";

export default function HomePage() {
  const { posts, query, user, actualPage, pagesCount } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Box component="section">
      <Container>
        <SearchForm query={query} />

        <PostsList posts={posts} userId={user?.id} />

        {posts.length > 0 && (
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
        )}
      </Container>
    </Box>
  );
}
