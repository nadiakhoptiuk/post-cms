import { useLoaderData } from "@remix-run/react";
import { NavigationLink } from "../constants/navigation";

export type NewSerializeFrom<T> = ReturnType<typeof useLoaderData<T>>;

export type WithChildren = {
  children: React.ReactNode;
};

export type TDashboardNavLink =
  | {
      id: string;
      link: NavigationLink;
      links?: undefined;
    }
  | {
      id: string;
      link?: undefined;
      links: {
        id: string;
        link: NavigationLink;
      }[];
    };
