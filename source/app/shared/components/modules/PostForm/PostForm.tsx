import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@rvf/react-router";
import { useTranslation } from "react-i18next";
import { Grid } from "@mantine/core";
import { Form } from "react-router";

import { TextInput } from "../../ui/TextInput";
import { SlugInput } from "../../ui/SlugInput";
import { RichTextEditor } from "../../ui/RichTextEditor";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";

import { postValidator } from "~/shared/utils/validators/postValidator";

import type { TErrorsMessages, TFormType, TLocale } from "~/shared/types/react";
import type { TPostForm } from "./PostForm.types";
import s from "./PostForm.module.css";
import { NavigationLink } from "~/shared/constants/navigation";
import { ModalForDeletingPost } from "../ModalsForDeleting";
import { useEffect } from "react";

export const PostForm = ({ postData, formType }: TPostForm & TFormType) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { i18n, t } = useTranslation(["common", "posts"]);
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const form = useForm({
    validator: postValidator(errorMessages),
    defaultValues: postData,
    method: "POST",
  });

  return (
    <>
      <Form {...form.getFormProps()} className={s.form}>
        <TextInput
          label={t("postData.title", { ns: "posts" })}
          scope={form.scope("title")}
        />

        <SlugInput
          label={t("postData.slug", { ns: "posts" })}
          scope={form.scope("slug")}
          aria={t("button.generateSlug", { ns: "posts" })}
          title={form.field("title").value()}
          locale={i18n.language as TLocale}
        />

        <RichTextEditor
          label={t("postData.content", { ns: "posts" })}
          scope={form.scope("content")}
        />

        <Button
          type="submit"
          loading={form.formState.isSubmitting}
          mt={25}
          w={200}
          styles={{
            root: { marginLeft: "auto", marginRight: "auto", display: "block" },
          }}
        >
          {t(
            formType === "update"
              ? "buttons.button.update"
              : "buttons.button.create",
            {
              ns: "common",
            }
          )}
        </Button>
      </Form>

      {formType === "update" && (
        <Button
          type="button"
          variant="light"
          mt="lg"
          w={200}
          onClick={open}
          styles={{
            root: { marginLeft: "auto", marginRight: "auto", display: "block" },
          }}
        >
          {t("buttons.button.delete", {
            ns: "common",
          })}
        </Button>
      )}

      {opened && <ModalForDeletingPost opened={opened} onClose={close} />}
      {/* <Modal
        opened={opened}
        onClose={close}
        title={t("modal.title", { ns: "common" })}
        p="lg"
        centered
      >
        {
          <Grid columns={2}>
            <Grid.Col span={1}>
              <Button variant="light" onClick={close} w="100%">
                Cancel
              </Button>
            </Grid.Col>

            <Grid.Col span={1}>
              <Form method="POST" action={NavigationLink.DELETE_POST}>
                <Button
                  type="submit"
                  loading={form.formState.isSubmitting}
                  c="white"
                  variant="filled"
                  bg="red"
                  fullWidth
                >
                  {t("buttons.button.delete", {
                    ns: "common",
                  })}
                </Button>
              </Form>
            </Grid.Col>
          </Grid>
        }
      </Modal> */}
    </>
  );
};
