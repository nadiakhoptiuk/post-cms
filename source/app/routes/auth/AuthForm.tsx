import { Form } from "react-router";
import { useTranslation } from "react-i18next";
import { useForm, type FormScope } from "@rvf/react-router";
import { Box } from "@mantine/core";

import { PasswordInput } from "~/shared/components/ui/PasswordInput";
import { TextInput } from "~/shared/components/ui/TextInput";
import { Button } from "~/shared/components/ui/Button";

import { signupValidator } from "~/shared/utils/validators/signupValidator";
import { loginValidator } from "~/shared/utils/validators/loginValidator";

import type { TErrorsMessages } from "~/shared/types/react";

export const AuthForm = ({ formType }: { formType: "signup" | "login" }) => {
  const { t } = useTranslation("common");
  const { t: u } = useTranslation("user");
  const { t: a } = useTranslation("auth");
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const validator =
    formType === "login"
      ? loginValidator(errorMessages)
      : signupValidator(errorMessages);

  const defaults =
    formType === "signup"
      ? {
          email: "",
          password: "",
          lastName: "",
          firstName: "",
        }
      : {
          email: "",
          password: "",
        };

  const form = useForm({
    validator: validator,
    defaultValues: defaults,
    method: "POST",
  });

  return (
    <Box
      renderRoot={() => (
        <Form {...form.getFormProps()}>
          {formType === "signup" && (
            <>
              <TextInput
                label={u("userData.firstName")}
                scope={form.scope("firstName") as FormScope<string>}
              />

              <TextInput
                label={u("userData.lastName")}
                scope={form.scope("lastName") as FormScope<string>}
              />
            </>
          )}

          <TextInput label={u("userData.email")} scope={form.scope("email")} />
          <PasswordInput
            label={u("userData.password")}
            scope={form.scope("password")}
          />

          <Button
            type="submit"
            loading={form.formState.isSubmitting}
            mt={15}
            w="100%"
          >
            {formType === "signup"
              ? a("authForm.button.signup")
              : a("authForm.button.login")}
          </Button>
        </Form>
      )}
      w="50%"
    ></Box>
  );
};
