import { Form, useSubmit } from "react-router";
import { useForm } from "@rvf/react-router";
import { useTranslation } from "react-i18next";
import { Grid, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { userFormValidator } from "~/shared/utils/validators/userFormValidator";

import { Button } from "~/shared/components/ui/Button";
import { SingleSelectField } from "~/shared/components/ui/SingleSelectField";
import { TextInput } from "~/shared/components/ui/TextInput";
import { PasswordInput } from "~/shared/components/ui/PasswordInput";
import { Modal } from "~/shared/components/ui/Modal";

import {
  ACTION_CREATE,
  ACTION_DELETE,
  ACTION_RESTORE,
  ACTION_UPDATE,
  ROLE_SELECT_OPTIONS,
} from "~/shared/constants/common";
import type { TErrorsMessages, TFormType } from "~/shared/types/react";
import type { TEditUserForm } from "./types";

export const EditUserForm = ({
  userData,
  formType,
  hasBeenDeleted = false,
}: TEditUserForm & TFormType) => {
  const submit = useSubmit();

  const { t } = useTranslation(["user", "common"]);
  const [opened, { open, close }] = useDisclosure(false);
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const form = useForm({
    validator: userFormValidator(errorMessages),
    defaultValues: { ...userData, password: "" },
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
      <Form
        {...form.getFormProps()}
        style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
      >
        <Group mb={10}>
          <TextInput
            label={t("userData.firstName", { ns: "user" })}
            scope={form.scope("firstName")}
          />
          <TextInput
            label={t("userData.lastName", { ns: "user" })}
            scope={form.scope("lastName")}
          />
        </Group>

        <Group mb={10} styles={{ root: { alignItems: "flex-start" } }}>
          <TextInput
            label={t("userData.email", { ns: "user" })}
            scope={form.scope("email")}
          />
          <PasswordInput
            label={t("userData.password", { ns: "user" })}
            scope={form.scope("password")}
          />
        </Group>

        <SingleSelectField
          label={t("userData.role", { ns: "user" })}
          scope={form.scope("role")}
          options={ROLE_SELECT_OPTIONS}
          styles={{
            root: { width: "50%", marginLeft: "auto", marginRight: "auto" },
          }}
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
          {hasBeenDeleted
            ? t("buttons.button.restore", {
                ns: "common",
              })
            : t("buttons.button.delete", {
                ns: "common",
              })}
        </Button>
      )}

      <Modal
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
                {t("buttons.button.cancel", {
                  ns: "common",
                })}
              </Button>
            </Grid.Col>

            <Grid.Col span={1}>
              <Button
                type="button"
                onClick={() =>
                  submit(
                    {
                      actionId: hasBeenDeleted ? ACTION_RESTORE : ACTION_DELETE,
                    },
                    { method: "post" }
                  )
                }
                c="white"
                variant="filled"
                bg="red"
                fullWidth
              >
                {hasBeenDeleted
                  ? t("buttons.button.restore", {
                      ns: "common",
                    })
                  : t("buttons.button.delete", {
                      ns: "common",
                    })}
              </Button>
            </Grid.Col>
          </Grid>
        }
      </Modal>
    </>
  );
};
