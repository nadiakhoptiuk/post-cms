import { NativeSelectProps } from "@mantine/core";
import { FormScope } from "@rvf/remix";

export interface TSingleSelect<Type> extends NativeSelectProps {
  label: string;
  scope: FormScope<string>;
  options: Array<Type>;
}
