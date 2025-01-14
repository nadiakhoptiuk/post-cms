import { Box, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAlertSquareRounded,
  IconArrowNarrowLeft,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";

import { SinglePostPage } from "~/shared/components/modules/SinglePostPage";
import { Button } from "~/shared/components/ui/Button";

import { StyledLink } from "~/shared/components/ui/StyledLink";
import { NavigationLink } from "~/shared/constants/navigation";
import { ModalForComplaint } from "../ModalForComplaint";

export { loader } from "./loader";
export { action } from "./action";

export const handle = { i18n: ["posts", "common"] };

export default function HomeSinglePostPage() {
  const { post, user } = useLoaderData();
  const navigate = useNavigate();
  const { t } = useTranslation("posts");
  const [opened, { open, close }] = useDisclosure(false);
  const [postId, setPostId] = useState<number | null>(null);
  const isOwnPost = user?.id === post.ownerId;

  useEffect(() => {
    if (!postId) {
      close();
    } else {
      open();
    }
  }, [postId]);

  return (
    <Box component="section" my="lg">
      <Container>
        <Group mb={30}>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            size="sm"
            variant="light"
          >
            <IconArrowNarrowLeft size={18} />
            {t("buttons.button.back", { ns: "common" })}
          </Button>

          <StyledLink to={NavigationLink.HOME} variant="accent" fill="filled">
            {t("link.toAll")}
          </StyledLink>
        </Group>

        <SinglePostPage post={post} />

        {user?.id && !isOwnPost && (
          <Button
            variant="subtle"
            mt={10}
            styles={{ label: { gap: 10 } }}
            aria-label={t("buttons.button.complain", { ns: "common" })}
            onClick={() => setPostId(post.id)}
          >
            <IconAlertSquareRounded size={18} color="pink" />
            {t("buttons.button.complain", { ns: "common" })}
          </Button>
        )}

        {user?.id && !isOwnPost && opened && (
          <ModalForComplaint
            opened={opened}
            onClose={() => setPostId(null)}
            itemId={postId}
          />
        )}
      </Container>
    </Box>
  );
}
