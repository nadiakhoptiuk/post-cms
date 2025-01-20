import type { TFilteredOptionsArgs } from "./types";

export function getFilteredOptions({
  options,
  value,
  searchQuery,
  limit = "all",
  hideActiveOptions,
}: TFilteredOptionsArgs) {
  const result: string[] = [];

  if (limit === "all" && !hideActiveOptions && searchQuery === "") {
    return options;
  }

  if (limit === "all" && hideActiveOptions && searchQuery === "") {
    return options?.filter((option) => !value?.includes(option));
  }

  for (let i = 0; i < options?.length; i += 1) {
    if (result?.length === limit) {
      break;
    }

    if (hideActiveOptions && value?.includes(options[i])) {
      continue;
    }

    if (options[i].toLowerCase().includes(searchQuery.trim().toLowerCase())) {
      result.push(options[i]);
    }
  }

  return result;
}
