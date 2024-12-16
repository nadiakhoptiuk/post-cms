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
  SIGNUP = "/signup",
  LOGOUT = "/logout",
}

export const DashboardNavLinks = [
  { id: "DASHBOARD", link: NavigationLink.DASHBOARD },
  { id: "DASHBOARD_MY_POSTS", link: NavigationLink.DASHBOARD_MY_POSTS },
  {
    id: "DASHBOARD_POSTS",
    links: [
      { id: "DASHBOARD_ALL_POSTS", link: NavigationLink.DASHBOARD_ALL_POSTS },
      {
        id: "DASHBOARD_POSTS_ON_MODERATION",
        link: NavigationLink.DASHBOARD_POSTS_ON_MODERATION,
      },
      {
        id: "DASHBOARD_POSTS_COMPLAINTS",
        link: NavigationLink.DASHBOARD_POSTS_COMPLAINTS,
      },
    ],
  },
  { id: "DASHBOARD_USERS", link: NavigationLink.DASHBOARD_USERS },
  { id: "DASHBOARD_TAGS", link: NavigationLink.DASHBOARD_TAGS },
];
