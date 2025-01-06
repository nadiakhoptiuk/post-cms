import { Box, Container } from "@mantine/core";
import { useLoaderData } from "react-router";

import { PostsList } from "~/shared/components/modules/PostsList";

export { loader } from "./loader";

export default function DashBoardHomePage() {
  const { posts } = useLoaderData();

  return (
    <Box component="section">
      <Container>
        <PostsList cardType="all" posts={posts} />
      </Container>
    </Box>
  );
}
