import { Box, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAlertSquareRounded,
  IconArrowNarrowLeft,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";

import { SinglePostPage } from "~/shared/components/modules/SinglePostPage";
import { Button } from "~/shared/components/ui/Button";

import { ModalForComplaint } from "../ModalForComplaint";
import type { TLoaderData } from "./loader";

export { loader } from "./loader";
export { action } from "./action";

export const handle = { i18n: ["posts", "common"] };

export default function HomeSinglePostPage() {
  const { post, user } = useLoaderData<TLoaderData>();
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const [opened, { open, close }] = useDisclosure(false);
  const isOwnPost = user?.id === post?.ownerId;

  return (
    <Box component="section" my="lg">
      <Container>
        <Group mb="lg">
          <Button
            onClick={() => navigate(-1)}
            type="button"
            size="sm"
            variant="light"
            leftSection={<IconArrowNarrowLeft size={18} />}
          >
            {t("buttons.button.back")}
          </Button>
        </Group>

        <SinglePostPage post={post} location="site" />

        {user?.id && !isOwnPost && (
          <Button
            variant="subtle"
            mt="md"
            aria-label={t("buttons.button.complain")}
            onClick={open}
            leftSection={<IconAlertSquareRounded size={18} color="pink" />}
          >
            {t("buttons.button.complain")}
          </Button>
        )}

        {user?.id && !isOwnPost && (
          <ModalForComplaint
            opened={opened}
            onClose={close}
            itemId={post?.id}
          />
        )}
      </Container>
    </Box>
  );
}
