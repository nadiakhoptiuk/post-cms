import { useLoaderData } from "@remix-run/react";

export type NewSerializeFrom<T> = ReturnType<typeof useLoaderData<T>>;

export type WithChildren = {
  children: React.ReactNode;
};
