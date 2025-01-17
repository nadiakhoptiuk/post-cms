import {
  Table as MTable,
  type TableTdProps,
  type TableThProps,
} from "@mantine/core";

import type { WithChildren } from "~/shared/types/react";

export const TableTd = ({ children, ...rest }: WithChildren & TableTdProps) => {
  return <MTable.Td {...rest}>{children}</MTable.Td>;
};

export const TableTh = ({ children, ...rest }: WithChildren & TableThProps) => {
  return (
    <MTable.Th c="blue.6" fw={600} {...rest}>
      {children}
    </MTable.Th>
  );
};
