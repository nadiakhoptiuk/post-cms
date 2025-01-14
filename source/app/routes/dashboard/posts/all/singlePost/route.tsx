import { useLoaderData } from "react-router";
import { Box, Container } from "@mantine/core";

import { PostForm } from "~/shared/components/modules/PostForm";

import type { TLoaderData } from "./loader";

export { loader } from "./loader";
export { action } from "./action";

export default function DashBoardHomePage() {
  const { post } = useLoaderData<TLoaderData>();
  const { title, content, slug } = post;

  return (
    <Box component="section">
      <Container>
        <PostForm
          postData={{
            title,
            content,
            slug,
          }}
          formType="update"
        />
      </Container>
    </Box>
  );
}
