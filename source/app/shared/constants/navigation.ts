import {
  IconTags,
  IconUsers,
  IconAlertSquareRounded,
  IconPencilMinus,
  IconNotebook,
  IconHourglassHigh,
  IconLogin,
  IconUserScan,
  IconUserPlus,
  IconShieldLock,
  IconBell,
} from "@tabler/icons-react";

export const enum NavigationLink {
  HOME_SINGLE_POST = "/:slug",
  HOME = "/",
  MY_POSTS = "/my-posts",
  NOTIFICATIONS = "/notifications",
  MY_POSTS_NEW = "/my-posts/new",
  MY_CURRENT_POST = "/my-posts/:id",
  PROFILE = "/profile",

  DASHBOARD = "/dashboard",
  DASHBOARD_SINGLE_POST_TO_VIEW = "/dashboard/:slug",

  DASHBOARD_ALL_POSTS = "/dashboard/posts",
  DASHBOARD_POSTS_SINGLE_POST = "/dashboard/posts/:id",
  DASHBOARD_POSTS_ON_MODERATION = "/dashboard/posts/on-moderation",
  DASHBOARD_SINGLE_POST_ON_MODERATION = "/dashboard/posts/on-moderation/:id",
  DASHBOARD_POSTS_COMPLAINTS = "/dashboard/posts/complaints",

  DASHBOARD_USERS = "/dashboard/users",
  DASHBOARD_USERS_NEW = "/dashboard/users/new",
  DASHBOARD_CURRENT_USER = "/dashboard/users/:id",

  DASHBOARD_TAGS = "/dashboard/tags",
  DASHBOARD_TAGS_NEW = "/dashboard/tags/new",
  DASHBOARD_CURRENT_TAG = "/dashboard/tags/:id",

  LOGIN = "/login",
  LOGOUT = "/logout",
  DELETE_ACCOUNT = "/delete-account",

  SIGNUP = "/signup",

  NOT_FOUND = "/404",

  // ADDITIONAL
  NOTIFICATIONS_COMPLAINTS = "complaints",
  NOTIFICATIONS_POSTS = "posts",

  // FOR ACTIONS
  CHANGE_LANGUAGE = "change-language",
  DELETE_USER = "delete-user",
  RESTORE_USER = "restore-user",
}

export const DashboardNavLinks = [
  {
    id: "dashboard.posts",
    icon: IconNotebook,
    links: [
      {
        id: "dashboard.allPosts",
        link: NavigationLink.DASHBOARD_ALL_POSTS,
        icon: IconPencilMinus,
      },
      {
        id: "dashboard.onModeration",
        link: NavigationLink.DASHBOARD_POSTS_ON_MODERATION,
        icon: IconHourglassHigh,
      },
      {
        id: "dashboard.postsComplains",
        link: NavigationLink.DASHBOARD_POSTS_COMPLAINTS,
        icon: IconAlertSquareRounded,
      },
    ],
  },
  {
    id: "dashboard.users",
    link: NavigationLink.DASHBOARD_USERS,
    icon: IconUsers,
  },
  {
    id: "dashboard.tags",
    link: NavigationLink.DASHBOARD_TAGS,
    icon: IconTags,
  },
];

export const AuthNavLinks = [
  { id: "auth.login", link: NavigationLink.LOGIN, icon: IconLogin },
  { id: "auth.signup", link: NavigationLink.SIGNUP, icon: IconUserPlus },
];

export const UserBarNavLinks = [
  { id: "profile", link: NavigationLink.PROFILE, icon: IconUserScan },
  { id: "myPosts", link: NavigationLink.MY_POSTS, icon: IconPencilMinus },
  {
    id: "notifications",
    link: NavigationLink.NOTIFICATIONS,
    icon: IconBell,
  },
  { id: "dashboard", link: NavigationLink.DASHBOARD, icon: IconShieldLock },
];
