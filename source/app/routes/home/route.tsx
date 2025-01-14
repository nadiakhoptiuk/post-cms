import { Outlet, useLoaderData } from "react-router";

import { Home } from "~/routes/layouts/Home";
import type { THomeLoaderData } from "./loader";

export { loader } from "./loader";

export const handle = {
  i18n: ["common", "auth"],
};

export default function HomeLayout() {
  const data = useLoaderData<THomeLoaderData>();

  return (
    <Home user={data?.user}>
      <Outlet />
    </Home>
  );
}
