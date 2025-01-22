import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const GlobalNotification = ({
  error,
  success,
}: {
  error: string | undefined;
  success: string | undefined;
}) => {
  const { t } = useTranslation("common");

  useEffect(() => {
    if (!error && !success) return;

    notifications.show({
      title: error ? t("notifications.error") : t("notifications.success"),
      message: error ? error : success,
      color: error ? "red" : "green",
      position: "top-center",
    });
  }, [error, success]);

  return null;
};
