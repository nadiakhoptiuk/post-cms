import { Form, useFetcher } from "react-router";
import { useForm } from "@rvf/react-router";
import { useTranslation } from "react-i18next";

import { Modal } from "../../ui/Modal";
import { SingleSelectField } from "../../ui/SingleSelectField";
import { Button } from "../../ui/Button";

import { complainAboutPostValidator } from "~/shared/utils/validators/complainAboutPostValidator";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TErrorsMessages, TItemId, TModal } from "~/shared/types/react";

export const ModalForComplaint = ({
  opened,
  onClose,
  itemId,
}: TModal & TItemId) => {
  console.log(itemId);
  const { t } = useTranslation("common");
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
        console.log("data", data);
        fetcher.submit(
          { ...data, postId: itemId },
          { method: "post", action: NavigationLink.COMPLAINT_ABOUT_POST }
        );
        onClose();
      }
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("modal.title", { ns: "common" })}
      p="lg"
      centered
      styles={{
        root: { paddingLeft: 0, paddingRight: 0 },
        inner: { paddingLeft: 0, paddingRight: 0 },
      }}
    >
      <Form {...form.getFormProps()}>
        <SingleSelectField
          label={t("postData.complaintReason", { ns: "posts" })}
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
          {t("buttons.button.complain", {
            ns: "common",
          })}
        </Button>
      </Form>
    </Modal>
  );
};
