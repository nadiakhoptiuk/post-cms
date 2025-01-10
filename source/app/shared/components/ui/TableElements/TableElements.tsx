import { Table as MTable } from "@mantine/core";

import type { WithChildren } from "~/shared/types/react";

export const TableTd = ({ children }: WithChildren) => {
  return (
    <MTable.Td styles={{ td: { textWrap: "nowrap", minHeight: 57 } }}>
      {children}
    </MTable.Td>
  );
};

export const TableTh = ({ children }: WithChildren) => {
  return (
    <MTable.Th
      c="blue"
      styles={{ th: { textWrap: "nowrap", fontWeight: 500 } }}
    >
      {children}
    </MTable.Th>
  );
};
