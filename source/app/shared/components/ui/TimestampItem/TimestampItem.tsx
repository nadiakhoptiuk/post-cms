import { Group, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const TimestampItem = ({
  type = "created",
  date,
  madeBy,
}: {
  type: "created" | "updated" | "deleted" | "published" | "blocked";
  date: string | null;
  madeBy?: string | undefined;
}) => {
  const { t } = useTranslation("common");

  if (type === "created" && !madeBy) {
    return (
      <Text mb={15} size="md">
        <Text component="span" fw="bolder">
          {t("timestampsLabels.createdAt")}:{" "}
        </Text>
        {date}
      </Text>
    );
  }

  if (type === "published" && madeBy) {
    return (
      <Group>
        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.publishedAt")}:{" "}
          </Text>
          {date}
        </Text>

        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.moderatedBy")}:{"  "}
          </Text>
          {madeBy}
        </Text>
      </Group>
    );
  }

  if (type === "updated" && madeBy) {
    return (
      <Group>
        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.updatedAt")}:{" "}
          </Text>
          {date}
        </Text>

        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.updatedBy")}:{" "}
          </Text>
          {madeBy}
        </Text>
      </Group>
    );
  }

  if (type === "deleted" && madeBy) {
    return (
      <Group>
        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.deletedAt")}:{" "}
          </Text>
          {date}
        </Text>

        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.deletedBy")}:{" "}
          </Text>
          {madeBy}
        </Text>
      </Group>
    );
  }

  if (type === "blocked" && madeBy) {
    return (
      <Group>
        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.blockedAt")}:{" "}
          </Text>
          {date}
        </Text>

        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.blockedBy")}:{" "}
          </Text>
          {madeBy}
        </Text>
      </Group>
    );
  }
};
