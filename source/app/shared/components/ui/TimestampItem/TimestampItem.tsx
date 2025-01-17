import { Group, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { formatDateWithTime } from "~/shared/utils/dateFormat";
import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

export const TimestampItem = ({
  type = "created",
  date,
  madeBy,
  relative = false,
}: {
  type: "created" | "updated" | "deleted" | "published" | "blocked";
  date: Date | null | undefined;
  relative?: boolean;
  madeBy?: string | undefined | null;
}) => {
  const { t } = useTranslation("common");
  const formattedDate = relative
    ? formatDateToRelative(date)
    : formatDateWithTime(date);

  if (type === "created") {
    return (
      <Group>
        <Text mb={15} size="md">
          <Text component="span" fw="bolder">
            {t("timestampsLabels.createdAt")}:{" "}
          </Text>
          {formattedDate}
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
          {formattedDate}
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
          {formattedDate}
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
          {formattedDate}
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
          {formattedDate}
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
