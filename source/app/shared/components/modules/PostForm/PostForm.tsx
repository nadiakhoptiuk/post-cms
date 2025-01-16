import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@rvf/react-router";
import { useTranslation } from "react-i18next";
import { Form, useSubmit } from "react-router";
import { Box, Stack } from "@mantine/core";

import { TextInput } from "../../ui/TextInput";
import { SlugInput } from "../../ui/SlugInput";
import { RichTextEditor } from "../../ui/RichTextEditor";
import { Button } from "../../ui/Button";
import { ModalForDeletingPost } from "../ModalsForDeleting";

import { postValidator } from "~/shared/utils/validators/postValidator";

import { ACTION_CREATE, ACTION_UPDATE } from "~/shared/constants/common";
import type { TErrorsMessages, TFormType, TLocale } from "~/shared/types/react";
import type { TPostForm } from "./PostForm.types";

export const PostForm = ({ postData, formType }: TPostForm & TFormType) => {
  const submit = useSubmit();

  const [opened, { open, close }] = useDisclosure(false);
  const { i18n, t } = useTranslation("common");
  const { t: p } = useTranslation("posts");
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const form = useForm({
    validator: postValidator(errorMessages),
    defaultValues: postData,
    handleSubmit: (data) => {
      {
        submit(
          {
            ...data,
            actionId: formType === "update" ? ACTION_UPDATE : ACTION_CREATE,
          },
          { method: "post" }
        );
      }
    },
  });

  return (
    <>
      <Form {...form.getFormProps()}>
        <Stack align="stretch" justify="center" gap="md">
          <Box maw={600} w="100%" mx="auto">
            <TextInput
              label={p("postData.title")}
              scope={form.scope("title")}
            />

            <SlugInput
              label={p("postData.slug")}
              scope={form.scope("slug")}
              aria={p("button.generateSlug")}
              title={form.field("title").value()}
              locale={i18n.language as TLocale}
            />
          </Box>

          <RichTextEditor
            label={p("postData.content")}
            scope={form.scope("content")}
          />

          <Button
            type="submit"
            loading={form.formState.isSubmitting}
            mt={25}
            w={200}
            mx="auto"
          >
            {t(
              formType === "update"
                ? "buttons.button.update"
                : "buttons.button.create"
            )}
          </Button>
        </Stack>
      </Form>

      {formType === "update" && (
        <Button
          type="button"
          variant="light"
          w={200}
          onClick={open}
          display="block"
          mx="auto"
          mt="lg"
        >
          {t("buttons.button.delete")}
        </Button>
      )}

      {opened && <ModalForDeletingPost opened={opened} onClose={close} />}
    </>
  );
};
