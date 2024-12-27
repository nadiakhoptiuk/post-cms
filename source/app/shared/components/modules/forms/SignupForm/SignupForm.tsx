import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useForm } from "@rvf/remix";

import { PasswordField } from "~/shared/components/ui/PasswordInput";
import { TextInput } from "~/shared/components/ui/TextInput";
import { Button } from "~/shared/components/ui/Button";

import { signupValidator } from "~/shared/utils/validators/signupValidator";

import s from "./SignupForm.module.css";

export const SignupForm = () => {
  const { t } = useTranslation("auth", { keyPrefix: "authForm" });

  const form = useForm({
    validator: signupValidator,
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
      <TextInput label={t("firstName")} scope={form.scope("firstName")} />
      <TextInput label={t("lastName")} scope={form.scope("lastName")} />
      <TextInput label={t("email")} scope={form.scope("email")} />
      <PasswordField label={t("password")} scope={form.scope("password")} />

      <Button
        type="submit"
        loading={form.formState.isSubmitting}
        mt={15}
        w="100%"
      >
        {t("button.signup")}
      </Button>
    </Form>
  );
};
