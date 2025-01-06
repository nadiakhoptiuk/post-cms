import { useForm } from "@rvf/react-router";
import { useTranslation } from "react-i18next";
import { Form } from "react-router";

import { TextInput } from "../../ui/TextInput";
import { SlugInput } from "../../ui/SlugInput";
import { RichTextEditor } from "../../ui/RichTextEditor";
import { Button } from "../../ui/Button";

import { postValidator } from "~/shared/utils/validators/postValidator";

import type { TErrorsMessages, TFormType, TLocale } from "~/shared/types/react";
import type { TPostForm } from "./PostForm.types";
import s from "./PostForm.module.css";

export const PostForm = ({
  postData,
  formType,
  action,
}: TPostForm & TFormType) => {
  const { i18n, t } = useTranslation(["common", "posts"]);
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const form = useForm({
    validator: postValidator(errorMessages),
    defaultValues: postData,
    method: "POST",
    action: action,
  });

  return (
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
  );
};
