import { useForm } from "@rvf/react-router";
import { useTranslation } from "react-i18next";
import { Form, useFetcher, useSubmit } from "react-router";

import { Modal } from "~/shared/components/ui/Modal";
import { TextInput } from "~/shared/components/ui/TextInput";
import { Button } from "~/shared/components/ui/Button";

import { rejectPostValidator } from "~/shared/utils/validators/rejectPostValidator";

import { ACTION_REJECT } from "~/shared/constants/common";
import type { TErrorsMessages, TItemId, TModal } from "~/shared/types/react";

export const ModalRejectPost = ({ opened, onClose }: TModal) => {
  const { t } = useTranslation("common");
  const { t: p } = useTranslation("posts");
  const submit = useSubmit();
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const form = useForm({
    validator: rejectPostValidator(errorMessages),
    defaultValues: {
      reason: "",
    },
    handleSubmit: (data) => {
      {
        submit({ ...data, actionId: ACTION_REJECT }, { method: "post" });
        onClose();
      }
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("modal.title")}
      p="lg"
      centered
    >
      <Form {...form.getFormProps()}>
        <TextInput
          label={p("postData.rejectReason")}
          scope={form.scope("reason")}
          styles={{
            wrapper: { marginBottom: 30 },
            error: { position: "absolute", bottom: -17 },
          }}
        />
        <Button
          type="submit"
          loading={form.formState.isSubmitting}
          c="white"
          variant="filled"
          bg="red"
          fullWidth
        >
          {t("buttons.button.reject")}
        </Button>
      </Form>
    </Modal>
  );
};

export const ModalRejectPostWithoutRedirect = ({
  itemId,
  opened,
  onClose,
}: TModal & TItemId) => {
  const { t } = useTranslation("common");
  const { t: p } = useTranslation("posts");
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;
  const fetcher = useFetcher();

  const form = useForm({
    validator: rejectPostValidator(errorMessages),
    defaultValues: {
      reason: "",
    },
    handleSubmit: (data) => {
      {
        fetcher.submit(
          { ...data, id: itemId, actionId: ACTION_REJECT },
          { method: "post" }
        );
        onClose();
      }
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("modal.title")}
      p="lg"
      centered
    >
      <Form {...form.getFormProps()}>
        <TextInput
          label={p("postData.rejectReason")}
          scope={form.scope("reason")}
          styles={{
            wrapper: { marginBottom: 30 },
            error: { position: "absolute", bottom: -17 },
          }}
        />
        <Button
          type="submit"
          loading={form.formState.isSubmitting}
          c="white"
          variant="filled"
          bg="red"
          fullWidth
        >
          {t("buttons.button.reject")}
        </Button>
      </Form>
    </Modal>
  );
};
