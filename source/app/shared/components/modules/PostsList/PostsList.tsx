import { useTranslation } from "react-i18next";
import { Grid, Group, Text } from "@mantine/core";

import { PostCard } from "../../ui/PostCard";

import type { TPostList } from "./PostList.types";

export const PostsList = ({ posts, userId }: TPostList) => {
  const { t } = useTranslation("posts");

  return (
    <>
      {posts.length > 0 && (
        <Group
          styles={{
            root: {
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
        >
          <Grid component="ul" columns={2}>
            {posts.map((itemData) => {
              return (
                <Grid.Col span={{ base: 2, md: 1, lg: 1 }} key={itemData.id}>
                  <PostCard
                    item={itemData}
                    isUserOwner={userId ? userId === itemData.ownerId : false}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </Group>
      )}

      {posts.length === 0 && <Text>{t("noPosts")}</Text>}
    </>
  );
};
