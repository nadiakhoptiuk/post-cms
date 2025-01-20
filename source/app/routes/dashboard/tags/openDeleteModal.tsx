import { Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconAlertTriangle } from "@tabler/icons-react";

export const openDeleteModal = ({
  confirmCb,
  title,
  confirmBtnLabel,
  cancelBtnLabel,
  text,
  isIrreversibleAction = true,
}: {
  confirmCb: () => void;
  title: string;
  confirmBtnLabel: string;
  cancelBtnLabel: string;
  text?: string;
  isIrreversibleAction?: boolean;
}) => {
  modals.openConfirmModal({
    modalId: "delete-modal",
    centered: true,
    title: (
      <Group>
        {isIrreversibleAction && <IconAlertTriangle color="orange" />}
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
    onCancel: () => modals.close("delete-modal"),
    onConfirm: () => {
      confirmCb();
    },
  });
};
