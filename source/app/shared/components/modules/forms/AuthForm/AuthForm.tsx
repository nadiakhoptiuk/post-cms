import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useForm } from "@rvf/remix";

import { PasswordField } from "~/shared/components/ui/PasswordInput";
import { TextInput } from "~/shared/components/ui/TextInput";
import { Button } from "~/shared/components/ui/Button";

import { authValidator } from "~/shared/utils/validators/authValidator";

import { TAuthForm } from "./AuthForm.types";

import s from "./AuthForm.module.css";

export const AuthForm = ({ defaultValues, formType }: TAuthForm) => {
  const { t } = useTranslation("auth", { keyPrefix: "authForm" });

  const form = useForm({
    validator: authValidator,
    defaultValues,
    method: "POST",
  });

  return (
    <Form {...form.getFormProps()} className={s.form}>
      <TextInput label={t("email")} scope={form.scope("email")} />
      <PasswordField label={t("password")} scope={form.scope("password")} />

      <Button type="submit">{t(`button.${formType}`)}</Button>
    </Form>
  );
};
