import { Box, Container, Pagination } from "@mantine/core";
import { useLoaderData, useNavigate } from "react-router";
import { NotificationList } from "../NotificationsList";

import type { TLoaderData } from "./loader";
import { PAGE_PARAMETER_NAME } from "~/shared/constants/common";

export { loader } from "./loader";

export default function HomeNotificationsPostsPage() {
  const { posts, pagesCount, actualPage } = useLoaderData<TLoaderData>();
  const navigate = useNavigate();

  return (
    <Box component="section" my="lg">
      <Container>
        <NotificationList posts={posts} />

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
