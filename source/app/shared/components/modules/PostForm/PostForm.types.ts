import { NavigationLink } from "~/shared/constants/navigation";

export type TPostForm = {
  postData: {
    title: string;
    slug: string;
    content: string;
    // tags: string[];
  };
  // layoutRoute: (typeof NavigationLink)[keyof typeof NavigationLink];
};
