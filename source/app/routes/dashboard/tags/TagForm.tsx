import { Group } from "@mantine/core";
import { useForm } from "@rvf/react-router";
import { useTranslation } from "react-i18next";
import { Form, useSubmit } from "react-router";
import { Button } from "~/shared/components/ui/Button";
import { TextInput } from "~/shared/components/ui/TextInput";
import {
  ACTION_CREATE,
  ACTION_DELETE,
  ACTION_UPDATE,
} from "~/shared/constants/common";
import type {
  TErrorsMessages,
  TFormType,
  TTagForm,
} from "~/shared/types/react";
import { tagValidator } from "~/shared/utils/validators/tagFormValidator";
import { openDeleteModal } from "./openDeleteModal";

export const TagForm = ({
  tagData,
  formType,
}: { tagData: TTagForm } & TFormType) => {
  const { t } = useTranslation("common");
  const { t: tg } = useTranslation("tags");
  const submit = useSubmit();

  const openModal = () =>
    openDeleteModal({
      title: t("modal.irreversibleWarning"),
      text: t("modal.title"),
      confirmBtnLabel: t("buttons.button.delete"),
      cancelBtnLabel: t("buttons.button.cancel"),
      confirmCb: () =>
        submit(
          {
            actionId: ACTION_DELETE,
          },
          {
            method: "post",
          }
        ),
    });

  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const form = useForm({
    validator: tagValidator(errorMessages),
    defaultValues: tagData,
    handleSubmit: (data) =>
      submit(
        {
          ...data,
          actionId: formType === "update" ? ACTION_UPDATE : ACTION_CREATE,
        },
        { method: "post" }
      ),
  });

  return (
    <>
      <Form {...form.getFormProps()}>
        <TextInput label={tg("tagData.name")} scope={form.scope("name")} />

        <Group mx="auto" w="fit-content">
          <Button type="submit" loading={form.formState.isSubmitting}>
            {t(
              formType === "update"
                ? "buttons.button.update"
                : "buttons.button.create"
            )}
          </Button>

          {formType === "update" && (
            <Button onClick={openModal} type="button" variant="subtle" c="pink">
              {t("buttons.button.delete")}
            </Button>
          )}
        </Group>
      </Form>
    </>
  );
};
