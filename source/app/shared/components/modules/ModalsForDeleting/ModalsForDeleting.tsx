import { useFetcher, useSubmit } from "react-router";
import { useTranslation } from "react-i18next";
import { Grid } from "@mantine/core";

import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";

import type { TItemId, TModal } from "~/shared/types/react";
import { ACTION_DELETE } from "~/shared/constants/common";

export const ModalForDeletingPost = ({ opened, onClose }: TModal) => {
  const { t } = useTranslation("common");
  const submit = useSubmit();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("modal.title")}
      p="lg"
      centered
    >
      {
        <Grid columns={2}>
          <Grid.Col span={1}>
            <Button variant="light" onClick={close} w="100%">
              {t("buttons.button.cancel", {
                ns: "common",
              })}
            </Button>
          </Grid.Col>

          <Grid.Col span={1}>
            <Button
              type="button"
              onClick={() =>
                submit({ actionId: ACTION_DELETE }, { method: "post" })
              }
              variant="filled"
              c="white"
              bg="red"
              fullWidth
            >
              {t("buttons.button.delete")}
            </Button>
          </Grid.Col>
        </Grid>
      }
    </Modal>
  );
};

export const ModalForDeletingWithoutRedirect = ({
  itemId,
  opened,
  onClose,
}: TModal & TItemId) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("modal.title", { ns: "common" })}
      p="lg"
      centered
    >
      {
        <Grid columns={2}>
          <Grid.Col span={1}>
            <Button variant="light" onClick={onClose} w="100%">
              {t("buttons.button.cancel", {
                ns: "common",
              })}
            </Button>
          </Grid.Col>

          <Grid.Col span={1}>
            <Button
              c="white"
              variant="filled"
              bg="red"
              fullWidth
              onClick={() => {
                fetcher.submit(
                  { id: itemId },
                  {
                    method: "post",
                  }
                );
                onClose();
              }}
            >
              {t("buttons.button.delete", {
                ns: "common",
              })}
            </Button>
          </Grid.Col>
        </Grid>
      }
    </Modal>
  );
};
