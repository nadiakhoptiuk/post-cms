import { type RouteConfig, layout, route } from "@react-router/dev/routes";
import { NavigationLink } from "./shared/constants/navigation";

export default [
  // ----------------------- HOME ----------------------------
  layout("./routes/home/route.tsx", [
    route(NavigationLink.HOME, "./routes/home/site/route.tsx", [
      route(
        NavigationLink.COMPLAINT_ABOUT_POST,
        "./routes/api/complainAboutPost.ts",
        { id: "complaint-from-the-list" }
      ),
    ]),
    route(
      NavigationLink.HOME_SINGLE_POST,
      "./routes/home/site/singlePost/route.tsx",
      [
        route(
          NavigationLink.COMPLAINT_ABOUT_POST,
          "./routes/api/complainAboutPost.ts",
          { id: "complaint-from-the-single-page" }
        ),
      ]
    ),
    route(NavigationLink.MY_POSTS, "./routes/home/myPosts/route.tsx"),
    route(
      NavigationLink.MY_CURRENT_POST,
      "./routes/home/myPosts/singlePost/route.tsx",
      [
        route(NavigationLink.DELETE_POST, "./routes/api/deletePost.ts", {
          id: "home/delete-post",
        }),
      ]
    ),
    route(NavigationLink.MY_POSTS_NEW, "./routes/home/myPosts/new/route.tsx"),
  ]),

  // ----------------------- AUTH ----------------------------
  layout("./routes/auth/route.tsx", [
    route(NavigationLink.LOGIN, "./routes/auth/login/route.tsx"),
    route(NavigationLink.SIGNUP, "./routes/auth/signup/route.tsx"),
    route(NavigationLink.LOGOUT, "./routes/api/logout.ts"),
  ]),

  // ----------------------- DASHBOARD ----------------------------
  layout("routes/dashboard/route.tsx", [
    route(NavigationLink.DASHBOARD, "./routes/dashboard/index/route.tsx"),

    // ----------------------- USERS ----------------------------
    route(
      NavigationLink.DASHBOARD_USERS,
      "./routes/dashboard/users/route.tsx",
      [
        route(
          NavigationLink.DELETE_USER,
          "./routes/api/deleteUserWithoutRedirect.ts"
        ),
      ]
    ),
    route(
      NavigationLink.DASHBOARD_USERS_NEW,
      "./routes/dashboard/users/new/route.tsx"
    ),
    route(
      NavigationLink.DASHBOARD_CURRENT_USER,
      "./routes/dashboard/users/singleUser/route.tsx",
      [
        route(NavigationLink.DELETE_USER, "./routes/api/deleteUser.ts"),
        route(NavigationLink.RESTORE_USER, "./routes/api/restoreUser.ts"),
      ]
    ),

    // ----------------------- POSTS ----------------------------
    route(
      NavigationLink.DASHBOARD_ALL_POSTS,
      "./routes/dashboard/posts/all/route.tsx",
      [
        route(
          NavigationLink.DELETE_POST,
          "./routes/api/deletePostWithoutRedirect.ts"
        ),
      ]
    ),
    route(
      NavigationLink.DASHBOARD_POSTS_SINGLE_POST,
      "./routes/dashboard/posts/all/singlePost/route.tsx",
      [route(NavigationLink.DELETE_POST, "./routes/api/deletePost.ts")]
    ),

    route(
      NavigationLink.DASHBOARD_POSTS_ON_MODERATION,
      "./routes/dashboard/posts/on-moderation/route.tsx",
      [
        route(
          NavigationLink.REJECT_PUBLISHING_POST,
          "./routes/api/rejectPublicationPostWithoutRedirect.ts"
        ),
      ]
    ),
    route(
      NavigationLink.DASHBOARD_SINGLE_POST_ON_MODERATION,
      "./routes/dashboard/posts/on-moderation/singlePost/route.tsx",
      [
        route(
          NavigationLink.REJECT_PUBLISHING_POST,
          "./routes/api/rejectPublicationPost.ts"
        ),
      ]
    ),

    route(
      NavigationLink.DASHBOARD_POSTS_COMPLAINTS,
      "./routes/dashboard/posts/complaints/route.tsx"
    ),
  ]),

  route(NavigationLink.DELETE_ACCOUNT, "./routes/api/deleteAccount.ts"),
  route(NavigationLink.CHANGE_LANGUAGE, "./routes/api/changeLanguage.ts"),
] satisfies RouteConfig;
