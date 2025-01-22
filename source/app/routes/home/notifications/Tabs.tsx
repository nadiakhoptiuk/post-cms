import { Tabs as MTabs } from "@mantine/core";
import { IconAlertCircle, IconNotebook } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const Tabs = ({ tabValue }: { tabValue: string }) => {
  const navigate = useNavigate();
  const { t: n } = useTranslation("notifications");

  return (
    <MTabs
      defaultValue={tabValue}
      variant="default"
      value={tabValue}
      onChange={(value) => {
        if (!value) return;

        navigate(value);
      }}
    >
      <MTabs.List grow>
        <MTabs.Tab
          value="posts"
          size="lg"
          aria-label={n("tabs.posts")}
          leftSection={<IconNotebook size={16} />}
          styles={{
            tabLabel: {
              fontSize: "var(--mantine-font-size-md)",
              fontWeight: 500,
            },
          }}
        >
          {n("tabs.posts")}
        </MTabs.Tab>

        <MTabs.Tab
          value="complaints"
          aria-label={n("tabs.complaints")}
          size="lg"
          leftSection={<IconAlertCircle size={16} />}
          styles={{
            tabLabel: {
              fontSize: "var(--mantine-font-size-md)",
              fontWeight: 500,
            },
          }}
        >
          {n("tabs.complaints")}
        </MTabs.Tab>
      </MTabs.List>
    </MTabs>
  );
};
