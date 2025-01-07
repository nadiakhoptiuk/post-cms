import type { TablerIcon } from "@tabler/icons-react";
import { NavigationLink } from "~/shared/constants/navigation";

export type TDashboardNavLink =
  | {
      id: string;
      link: NavigationLink;
      links?: undefined;
      icon?: TablerIcon | undefined;
    }
  | {
      id: string;
      link?: undefined;
      icon?: TablerIcon | undefined;
      links: {
        id: string;
        link: NavigationLink;
        icon: TablerIcon;
      }[];
    };

export type TLinksGroup = {
  item: TDashboardNavLink;
  postsOnModeration: number;
  postsWithComplaints: number;
};
