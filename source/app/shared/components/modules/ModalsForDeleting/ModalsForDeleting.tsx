import { Form, useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import { Grid } from "@mantine/core";

import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TItemId, TModal } from "~/shared/types/react";
import type { TModalWithAction } from "./ModalsForDeleting.types";

export const ModalForDeletingPost = ({ opened, onClose }: TModal) => {
  const { t } = useTranslation("common");

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
            <Form method="post" action={NavigationLink.DELETE_POST}>
              <Button
                type="submit"
                variant="filled"
                c="white"
                bg="red"
                fullWidth
              >
                {t("buttons.button.delete")}
              </Button>
            </Form>
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
  action,
}: TModalWithAction & TItemId) => {
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
                    // action: NavigationLink.DELETE_POST,
                    action: action,
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
