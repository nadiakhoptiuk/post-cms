import { Grid, Group } from "@mantine/core";

import { PostCard } from "../../ui/PostCard";

import type { TPostList } from "./PostList.types";

export const PostsList = ({ posts }: TPostList) => {
  return (
    <Group>
      <Grid component="ul" columns={2}>
        {posts.map((itemData) => {
          return (
            <Grid.Col span={{ base: 2, md: 1, lg: 1 }} key={itemData.id}>
              <PostCard item={itemData} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Group>
  );
};
