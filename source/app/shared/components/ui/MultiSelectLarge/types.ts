import type { FormScope } from "@rvf/react-router";

export interface TMultiSelectLargeProps<Type> {
  label: string;
  scope: FormScope<Array<string>>;
  options: Array<Type>;
  visibleOptionsLimit?: number | "all";
  hideActiveOptions?: boolean;
  maxHeight?: number;
  creatable?: boolean;
}

export type TFilteredOptionsArgs = {
  options: string[];
  value: string[];
  searchQuery: string;
  limit?: number | "all";
  hideActiveOptions: boolean;
};
