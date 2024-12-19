import { NavigationLink } from "~/shared/constants/navigation";

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
