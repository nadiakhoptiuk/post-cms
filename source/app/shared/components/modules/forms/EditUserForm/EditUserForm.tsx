import { Form } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import { useTranslation } from "react-i18next";

import { userFormValidator } from "~/shared/utils/validators/userFormValidator";

import { Button } from "~/shared/components/ui/Button";
import { SingleSelectField } from "~/shared/components/ui/SingleSelectField";
import { TextInput } from "~/shared/components/ui/TextInput";

import { ROLE_SELECT_OPTIONS } from "~/shared/constants/common";
import { TEditUserForm } from "./EditUserForm.types";
import { TErrorsMessages } from "~/shared/types/remix";
import { Group } from "@mantine/core";
import { Modal } from "~/shared/components/ui/Modal";
import { useDisclosure } from "@mantine/hooks";

export const EditUserForm = ({ userData, formType }: TEditUserForm) => {
  const { t } = useTranslation(["user", "common"]);
  const [opened, { open, close }] = useDisclosure(false);
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const form = useForm({
    validator: userFormValidator(errorMessages),
    defaultValues: { ...userData, password: "" },
    method: "POST",
  });

  return (
    <>
      <Form
        {...form.getFormProps()}
        style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
      >
        <Group>
          <TextInput
            label={t("userData.firstName", { ns: "user" })}
            scope={form.scope("firstName")}
          />
          <TextInput
            label={t("userData.lastName", { ns: "user" })}
            scope={form.scope("lastName")}
          />
        </Group>

        <Group>
          <TextInput
            label={t("userData.email", { ns: "user" })}
            scope={form.scope("email")}
          />
          <TextInput
            label={t("userData.password", { ns: "user" })}
            scope={form.scope("password")}
          />
        </Group>

        <SingleSelectField
          label={t("userData.role", { ns: "user" })}
          scope={form.scope("role")}
          options={ROLE_SELECT_OPTIONS}
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

      <Modal
        opened={opened}
        onClose={close}
        title={`${t("modal.title", { ns: "common" })} "${userData.firstName} ${
          userData.lastName
        }"?`}
        p="lg"
        centered
      >
        {
          <Group styles={{ root: { justifyContent: "center" } }}>
            <Button variant="light" onClick={close}>
              Cancel
            </Button>

            <Form method="post">
              <Button
                type="submit"
                loading={form.formState.isSubmitting}
                c="white"
                variant="filled"
                bg="red"
              >
                {t("buttons.button.delete", {
                  ns: "common",
                })}
              </Button>
            </Form>
          </Group>
        }
      </Modal>
    </>
  );
};
