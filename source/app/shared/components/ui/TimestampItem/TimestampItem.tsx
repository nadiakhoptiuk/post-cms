import { Group, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const TimestampItem = ({
  type = "created",
  date,
  madeBy,
}: {
  type: "created" | "updated" | "deleted" | "published" | "blocked";
  date: string | null;
  madeBy?: string | undefined | null;
}) => {
  const { t } = useTranslation("common");

  if (type === "created") {
    return (
      <Group>
        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.createdAt")}:{" "}
          </Text>
          {date}
        </Text>

        {madeBy && (
          <Text mb={15} size="md">
            <Text component="span" fw="bolder">
              {t("timestampsLabels.author")}:{"  "}
            </Text>
            {madeBy}
          </Text>
        )}
      </Group>
    );
  }

  if (type === "published") {
    return (
      <Group>
        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.publishedAt")}:{" "}
          </Text>
          {date}
        </Text>

        {madeBy && (
          <Text mb={15} size="md">
            <Text component="span" fw="bolder">
              {t("timestampsLabels.moderatedBy")}:{"  "}
            </Text>
            {madeBy}
          </Text>
        )}
      </Group>
    );
  }

  if (type === "updated") {
    return (
      <Group>
        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.updatedAt")}:{" "}
          </Text>
          {date}
        </Text>

        {madeBy && (
          <Text mb={15} size="md">
            <Text component="span" fw="bolder">
              {t("timestampsLabels.updatedBy")}:{" "}
            </Text>
            {madeBy}
          </Text>
        )}
      </Group>
    );
  }

  if (type === "deleted") {
    return (
      <Group>
        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.deletedAt")}:{" "}
          </Text>
          {date}
        </Text>

        {madeBy && (
          <Text mb={15} size="md">
            <Text component="span" fw="bolder">
              {t("timestampsLabels.deletedBy")}:{" "}
            </Text>
            {madeBy}
          </Text>
        )}
      </Group>
    );
  }

  if (type === "blocked") {
    return (
      <Group>
        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.blockedAt")}:{" "}
          </Text>
          {date}
        </Text>

        {madeBy && (
          <Text mb={15} size="md">
            <Text component="span" fw="bolder">
              {t("timestampsLabels.blockedBy")}:{" "}
            </Text>
            {madeBy}
          </Text>
        )}
      </Group>
    );
  }
};
