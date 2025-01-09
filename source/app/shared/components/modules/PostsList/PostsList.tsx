import { useTranslation } from "react-i18next";
import { Grid, Text } from "@mantine/core";

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
        <Grid component="ul" styles={{ root: { width: "100%" } }}>
          {posts.map((itemData) => {
            return (
              <Grid.Col
                w="100%"
                span={{ base: 12, xs: 6, md: 6, xl: 4 }}
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
      )}

      {posts.length === 0 && <Text>{t("noPosts")}</Text>}
    </>
  );
};
