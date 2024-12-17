// import {
//   IconHome,
//   IconTags,
//   IconUsers,
//   IconMessageExclamation,
//   IconPencilMinus,
// } from "@tabler/icons-react";
// import { FaHome, FaPencilAlt, FaUsersCog, FaTags } from "react-icons/fa";
// import { LuMessageSquareWarning } from "react-icons/lu";

export const enum NavigationLink {
  HOME = "/",
  DASHBOARD = "/dashboard",
  DASHBOARD_MY_POSTS = "/dashboard/my-posts",
  DASHBOARD_ALL_POSTS = "/dashboard/posts/all",
  DASHBOARD_POSTS_ON_MODERATION = "/dashboard/posts/on-moderation",
  DASHBOARD_POSTS_COMPLAINTS = "/dashboard/posts/complaints",
  DASHBOARD_USERS = "/dashboard/users",
  DASHBOARD_TAGS = "/dashboard/tags",
  LOGIN = "/login",
  LOGOUT = "/logout",
  MY_POSTS = "/my-posts",
  PROFILE = "/profile",
  DELETE_ACCOUNT = "/delete-account",
  SIGNUP = "/signup",
}

export const DashboardNavLinks = [
  { id: "dashboard", link: NavigationLink.DASHBOARD },
  { id: "dashboard.myPosts", link: NavigationLink.DASHBOARD_MY_POSTS },
  {
    id: "dashboard.posts",
    links: [
      { id: "dashboard.allPosts", link: NavigationLink.DASHBOARD_ALL_POSTS },
      {
        id: "dashboard.onModeration",
        link: NavigationLink.DASHBOARD_POSTS_ON_MODERATION,
      },
      {
        id: "dashboard.postsComplains",
        link: NavigationLink.DASHBOARD_POSTS_COMPLAINTS,
      },
    ],
  },
  { id: "dashboard.users", link: NavigationLink.DASHBOARD_USERS },
  { id: "dashboard.tags", link: NavigationLink.DASHBOARD_TAGS },
];

export const AuthNavLinks = [
  { id: "auth.login", link: NavigationLink.LOGIN },
  { id: "auth.signup", link: NavigationLink.SIGNUP },
];

export const UserBarNavLinks = [
  { id: "profile", link: NavigationLink.PROFILE },
  { id: "myPosts", link: NavigationLink.MY_POSTS },
];
