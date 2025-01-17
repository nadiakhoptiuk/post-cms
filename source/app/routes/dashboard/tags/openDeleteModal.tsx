import { Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconAlertTriangle } from "@tabler/icons-react";

export const openDeleteModal = ({
  title,
  text,
  confirmBtnLabel,
  cancelBtnLabel,
  confirmCb,
}: {
  title: string;
  text: string;
  confirmBtnLabel: string;
  cancelBtnLabel: string;
  confirmCb: () => void;
}) => {
  modals.openConfirmModal({
    modalId: "delete-tag-modal",
    centered: true,
    title: (
      <Group>
        <IconAlertTriangle color="orange" />
        <Text size="md" fw={500}>
          {title}
        </Text>
      </Group>
    ),
    children: (
      <Text size="md" mx="auto" mt="lg" w="fit-content">
        {text}
      </Text>
    ),
    labels: {
      confirm: confirmBtnLabel,
      cancel: cancelBtnLabel,
    },
    confirmProps: { color: "red" },
    onCancel: () => modals.close("delete-tag-modal"),
    onConfirm: () => {
      confirmCb();
    },
  });
};
