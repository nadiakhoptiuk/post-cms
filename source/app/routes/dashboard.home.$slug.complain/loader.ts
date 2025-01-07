// import { redirect } from "react-router";
// import { getSession } from "~/shared/.server/services/session";

// import { SESSION_USER_KEY } from "~/shared/constants/common";
// import { NavigationLink } from "~/shared/constants/navigation";

// export async function loader({ request, params }: Route.LoaderArgs) {
//   if (!params.slug) {
//     throw new Response("Not Found", { status: 404 });
//   }

//   const session = await getSession(request.headers.get("cookie"));
//   const sessionUser = session.get(SESSION_USER_KEY);

//   if (!sessionUser) {
//     redirect(NavigationLink.HOME);
//   }

//   return { user: sessionUser };
// }
