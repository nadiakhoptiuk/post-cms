import { Form, useFetcher } from "react-router";
import { useForm } from "@rvf/react-router";
import { useTranslation } from "react-i18next";

import { complainAboutPostValidator } from "~/shared/utils/validators/complainAboutPostValidator";

import { Modal } from "~/shared/components/ui/Modal";
import { SingleSelectField } from "~/shared/components/ui/SingleSelectField";
import { Button } from "~/shared/components/ui/Button";

import type { TErrorsMessages, TItemId, TModal } from "~/shared/types/react";

export const ModalForComplaint = ({
  opened,
  onClose,
  itemId,
}: TModal & TItemId) => {
  const { t } = useTranslation("common");
  const { t: p } = useTranslation("posts");
  const fetcher = useFetcher();
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const options = t("complain.options", {
    ns: "posts",
    returnObjects: true,
  });

  const selectOptions = Object.values(options);

  const form = useForm({
    validator: complainAboutPostValidator(errorMessages),
    defaultValues: {
      complaintReason: selectOptions[0],
    },
    method: "POST",
    handleSubmit: (data) => {
      {
        fetcher.submit({ ...data, postId: itemId }, { method: "post" });
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
      styles={{
        root: { paddingLeft: 0, paddingRight: 0 },
        inner: { paddingLeft: 0, paddingRight: 0 },
      }}
    >
      <Form {...form.getFormProps()}>
        <SingleSelectField
          label={p("postData.complaintReason")}
          scope={form.scope("complaintReason")}
          options={selectOptions}
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
          {t("buttons.button.complain")}
        </Button>
      </Form>
    </Modal>
  );
};
