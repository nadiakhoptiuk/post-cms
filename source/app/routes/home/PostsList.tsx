import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Grid, Text } from "@mantine/core";

import { ModalForComplaint } from "./site/ModalForComplaint";
import { PostCard } from "~/shared/components/ui/PostCard";

import { NavigationLink } from "~/shared/constants/navigation";
import type {
  TDBPostRecord,
  TPost,
  TPostAdditionalFields,
} from "~/shared/types/react";

export const PostsList = ({
  posts,
  userId,
}: {
  posts: Array<TPost & TDBPostRecord & TPostAdditionalFields>;
  userId: number | undefined;
}) => {
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
      {posts && posts?.length > 0 && (
        <Grid w="100%">
          {posts.map((itemData) => {
            console.log(itemData);
            return (
              <Grid.Col
                w="100%"
                span={{ base: 12, xs: 6, md: 6, xl: 4 }}
                key={itemData.id}
              >
                <PostCard
                  item={itemData}
                  userId={userId}
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

      {posts?.length === 0 && (
        <Text mx="auto" w="fit-content" size="lg">
          {t("noPosts")}
        </Text>
      )}
    </>
  );
};
