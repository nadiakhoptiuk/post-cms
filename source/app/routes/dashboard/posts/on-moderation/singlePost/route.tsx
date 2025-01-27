import { Box, Container, Flex, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate, useSubmit } from "react-router";

import { Button } from "~/shared/components/ui/Button";
import { ModalRejectPost } from "../ModalsForRejectingPost";
import { PostContent, PostHeading } from "~/shared/components/ui/PostElements";

import { ACTION_PUBLISH } from "~/shared/constants/common";
import type { TLoaderData } from "./loader";

export { loader } from "./loader";
export { action } from "./action";

export const handle = { i18n: ["posts", "common"] };

export default function DashBoardSinglePostPage() {
  const { post, tags } = useLoaderData<TLoaderData>();
  const submit = useSubmit();
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  return (
    <Box component="section">
      <Container>
        <Group mb={30}>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            size="sm"
            variant="light"
          >
            <IconArrowNarrowLeft size={18} />
            {t("buttons.button.back")}
          </Button>
        </Group>
        <PostHeading post={post} location="dashboard" />
        <PostContent content={post.content} title={post.title} tags={tags} />

        <Flex mt={30} columnGap={20}>
          <Button
            type="button"
            c="white"
            variant="filled"
            onClick={() =>
              submit({ actionId: ACTION_PUBLISH }, { method: "post" })
            }
          >
            {t("buttons.button.publish", {
              ns: "common",
            })}
          </Button>

          <Button onClick={open} c="red" variant="default">
            {t("buttons.button.reject")}
          </Button>
        </Flex>
        {opened && <ModalRejectPost opened={opened} onClose={close} />}
      </Container>
    </Box>
  );
}
