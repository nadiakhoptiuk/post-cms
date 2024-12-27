import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useForm } from "@rvf/remix";

import { PasswordField } from "~/shared/components/ui/PasswordInput";
import { TextInput } from "~/shared/components/ui/TextInput";
import { Button } from "~/shared/components/ui/Button";

import { loginValidator } from "~/shared/utils/validators/loginValidator";

import s from "./LoginForm.module.css";

export const LoginForm = () => {
  const { t } = useTranslation("auth", { keyPrefix: "authForm" });

  const form = useForm({
    validator: loginValidator,
    defaultValues: {
      email: "",
      password: "",
      lastName: "",
      firstName: "",
    },
    method: "POST",
  });

  return (
    <Form {...form.getFormProps()} className={s.form}>
      <TextInput label={t("email")} scope={form.scope("email")} />
      <PasswordField label={t("password")} scope={form.scope("password")} />

      <Button
        type="submit"
        loading={form.formState.isSubmitting}
        mt={15}
        w="100%"
      >
        {t("button.login")}
      </Button>
    </Form>
  );
};
