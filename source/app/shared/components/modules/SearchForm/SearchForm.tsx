import { useState } from "react";
import { Form, useNavigation, useSubmit } from "react-router";
import { Loader, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import s from "./SearchForm.module.css";
import { SEARCH_PARAMETER_NAME } from "~/shared/constants/common";

export const SearchForm = ({ query }: { query: string }) => {
  const [queryString, setQueryString] = useState(query ?? "");
  const { t } = useTranslation("common");
  const navigation = useNavigation();
  const submit = useSubmit();
  // const [searchParams, setSearchParams] = useSearchParams();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(SEARCH_PARAMETER_NAME);

  //forced 2 queries at Network
  // useEffect(() => {
  //   if (!query || query === "") {
  //     searchParams.delete(SEARCH_PARAMETER_NAME);
  //     setSearchParams(searchParams);
  //   }
  // }, [query]);

  return (
    <Form
      id="search-form"
      role="search"
      onChange={(event) => {
        const isFirstSearch = query === null;

        submit(event.currentTarget, {
          replace: !isFirstSearch,
        });
      }}
      className={s.form}
    >
      <TextInput
        name="search"
        aria-label={t("aria.searchForm")}
        placeholder={t("search.placeholder")}
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
        size="md"
        rightSection={!!searching ? <Loader size={20} /> : null}
      />
    </Form>
  );
};
