import { useField } from "@rvf/react-router";
import { useState } from "react";
import {
  Box,
  Combobox,
  InputBase,
  Pill,
  PillsInput,
  Text,
  useCombobox,
} from "@mantine/core";

import { getFilteredOptions } from "./getFilteredOptions";

import type { TMultiSelectLargeProps } from "./types";

export const MultiSelectLarge = <Type extends string>({
  options,
  label,
  scope,
  visibleOptionsLimit = "all",
  hideActiveOptions = true,
  maxHeight = 200,
  creatable = true,
}: TMultiSelectLargeProps<Type>) => {
  const field = useField(scope);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState<string>("");
  const value = field.value();

  const filteredOptions = getFilteredOptions({
    options,
    value,
    searchQuery: search,
    limit: visibleOptionsLimit,
    hideActiveOptions,
  });

  const handleValueRemove = (val: string) => {
    const newValue = value.filter((v) => v !== val);
    field.setValue(newValue);
  };

  const values =
    value?.length > 0
      ? value.map((item) => (
          <Pill
            key={item}
            withRemoveButton
            onRemove={() => {
              handleValueRemove(item);
              field.validate();
            }}
            size="md"
            styles={{ remove: { boxShadow: "none" } }}
          >
            {item}
          </Pill>
        ))
      : null;

  const selectOptions = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Box pos="relative" mb={20}>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setSearch("");
          field.value().push(val);
          combobox.closeDropdown();
          field.validate();
        }}
      >
        <Text>{label}</Text>
        <InputBase hidden {...field.getHiddenInputProps()} />
        <Combobox.Target>
          <PillsInput onClick={() => combobox.openDropdown()}>
            <Pill.Group>
              {values}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  placeholder="Search..."
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && search.length === 0) {
                      event.preventDefault();
                      handleValueRemove(value[value.length - 1]);
                    }
                  }}
                  style={{ boxShadow: "none" }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options mah={maxHeight} style={{ overflowY: "auto" }}>
            {selectOptions.length > 0 ? (
              selectOptions
            ) : (
              <>
                <Combobox.Empty ta="left">Nothing found</Combobox.Empty>
                {creatable && (
                  <Combobox.Option value="$create">
                    + Create {search}
                  </Combobox.Option>
                )}
              </>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>

        {field.error() && (
          <Text component="span" pos="absolute" c="red" size="xs">
            {field.error()}
          </Text>
        )}
      </Combobox>
    </Box>
  );
};
