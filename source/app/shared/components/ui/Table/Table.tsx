import { Table as MTable } from "@mantine/core";

import { TTable } from "./Table.types";

export const Table = ({ users }: TTable) => {
  const rows = users.map((user) => {
    return (
      <MTable.Tr key={user.id}>
        <MTable.Td>{user.firstName}</MTable.Td>
        <MTable.Td>{user.lastName}</MTable.Td>
        <MTable.Td>{user.email}</MTable.Td>
        <MTable.Td>{user.role}</MTable.Td>
        <MTable.Td>{new Date(user.createdAt).toString()}</MTable.Td>
        <MTable.Td>
          {user.updatedAt ? new Date(user.updatedAt).toString() : "never"}
        </MTable.Td>
      </MTable.Tr>
    );
  });

  return (
    <MTable>
      <MTable.Thead>
        <MTable.Tr>
          <MTable.Th>First Name</MTable.Th>
          <MTable.Th>Last Name</MTable.Th>
          <MTable.Th>Email</MTable.Th>
          <MTable.Th>Role</MTable.Th>
          <MTable.Th>CreatedAt</MTable.Th>
          <MTable.Th>UpdatedAt</MTable.Th>
        </MTable.Tr>
      </MTable.Thead>

      <MTable.Tbody>{rows}</MTable.Tbody>
    </MTable>
  );
};
