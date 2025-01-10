import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Grid, Text } from "@mantine/core";

import { PostCard } from "../../ui/PostCard";
import { ModalForComplaint } from "../ModalForComplaint";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TPostList } from "./PostList.types";

export const PostsList = ({ posts, userId }: TPostList) => {
  const { t } = useTranslation("posts");
  const [opened, { open, close }] = useDisclosure(false);
  const [postId, setPostId] = useState<number | null>(null);
  const location = useLocation();
  const isOwnList = location.pathname.includes(NavigationLink.MY_POSTS);

  useEffect(() => {
    if (!postId) {
      close();
    } else {
      open();
    }
  }, [postId]);

  return (
    <>
      {posts.length > 0 && (
        <Grid styles={{ root: { width: "100%" } }}>
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
                  location={isOwnList ? "own" : "all"}
                  setPostId={setPostId}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      )}

      {!isOwnList && opened && (
        <ModalForComplaint
          opened={opened}
          onClose={() => setPostId(null)}
          itemId={postId}
        />
      )}

      {posts.length === 0 && <Text>{t("noPosts")}</Text>}
    </>
  );
};
