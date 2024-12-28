import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useForm } from "@rvf/remix";

import { PasswordField } from "~/shared/components/ui/PasswordInput";
import { TextInput } from "~/shared/components/ui/TextInput";
import { Button } from "~/shared/components/ui/Button";

import { signupValidator } from "~/shared/utils/validators/signupValidator";

import s from "./SignupForm.module.css";
import { TErrorsMessages } from "~/shared/types/remix";

export const SignupForm = () => {
  const { t } = useTranslation(["auth", "common", "user"]);
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const form = useForm({
    validator: signupValidator(errorMessages),
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
      <TextInput
        label={t("userData.firstName", { ns: "user" })}
        scope={form.scope("firstName")}
      />
      <TextInput
        label={t("userData.lastName", { ns: "user" })}
        scope={form.scope("lastName")}
      />
      <TextInput
        label={t("userData.email", { ns: "user" })}
        scope={form.scope("email")}
      />
      <PasswordField
        label={t("userData.password", { ns: "user" })}
        scope={form.scope("password")}
      />

      <Button
        type="submit"
        loading={form.formState.isSubmitting}
        mt={15}
        w="100%"
      >
        {t("authForm.button.signup", { ns: "auth" })}
      </Button>
    </Form>
  );
};
