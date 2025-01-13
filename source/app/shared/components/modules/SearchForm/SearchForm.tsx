import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useNavigation, useSubmit } from "react-router";
import { Box, CloseButton, Input, Loader, type BoxProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { SEARCH_PARAMETER_NAME } from "~/shared/constants/common";

interface TSearchForm extends BoxProps {
  query: string;
}

export const SearchForm = ({
  query,
  maw = 700,
  mb = "lg",
  mt = "lg",
}: TSearchForm) => {
  const [queryString, setQueryString] = useState(query ?? "");
  const { t } = useTranslation("common");
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(SEARCH_PARAMETER_NAME);

  return (
    <Box w="100%" mb={mb} maw={maw} mx="auto" mt={mt}>
      <Form
        id="search-form"
        role="search"
        onChange={(event) => {
          const isFirstSearch = query === null;

          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        }}
      >
        <Input
          id="query"
          name="search"
          type="search"
          value={queryString}
          aria-label={t("aria.searchForm")}
          placeholder={t("search.placeholder")}
          size="md"
          onChange={(e) => setQueryString(e.target.value)}
          leftSection={<IconSearch size={16} stroke={1.5} />}
          rightSection={
            !!searching ? (
              <Loader size={20} />
            ) : (
              <CloseButton
                aria-label="Clear input"
                onClick={() => {
                  setQueryString("");
                }}
              />
            )
          }
          rightSectionPointerEvents="all"
        />
      </Form>
    </Box>
  );
};
