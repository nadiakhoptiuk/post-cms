import { useLoaderData } from "react-router";
import { Box, Container } from "@mantine/core";

import { PostForm } from "~/shared/components/modules/PostForm";

export { loader } from "./loader";
export { action } from "./action";

export default function DashBoardHomePage() {
  const { post } = useLoaderData();

  return (
    <Box component="section">
      <Container>
        <PostForm
          postData={{
            title: post.title,
            content: post.content,
            slug: post.slug.slice(0, -37),
          }}
          formType="update"
        />
      </Container>
    </Box>
  );
}