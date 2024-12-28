import { Table as MTable } from "@mantine/core";

import { WithChildren } from "~/shared/types/remix";

export const TableTd = ({ children }: WithChildren) => {
  return (
    <MTable.Td styles={{ td: { textWrap: "nowrap" } }}>{children}</MTable.Td>
  );
};

export const TableTh = ({ children }: WithChildren) => {
  return (
    <MTable.Th styles={{ th: { textWrap: "nowrap" } }}>{children}</MTable.Th>
  );
};
