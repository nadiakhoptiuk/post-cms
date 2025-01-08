import { useTranslation } from "react-i18next";
import { Grid, Group, Text } from "@mantine/core";

import { PostCard } from "../../ui/PostCard";

import type { TPostList } from "./PostList.types";
import { useLocation } from "react-router";
import { NavigationLink } from "~/shared/constants/navigation";

export const PostsList = ({ posts, userId }: TPostList) => {
  const { t } = useTranslation("posts");
  const location = useLocation();

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
          <Grid component="ul" columns={2} styles={{ root: { width: "100%" } }}>
            {posts.map((itemData) => {
              return (
                <Grid.Col
                  w="100%"
                  span={{ base: 2, md: 1, lg: 1 }}
                  key={itemData.id}
                >
                  <PostCard
                    item={itemData}
                    isUserOwner={userId ? userId === itemData.ownerId : false}
                    location={
                      location.pathname.includes(NavigationLink.MY_POSTS)
                        ? "own"
                        : "all"
                    }
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
