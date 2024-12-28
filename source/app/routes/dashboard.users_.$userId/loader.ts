import { LoaderFunctionArgs } from "@remix-run/node";
import { getUserById } from "~/shared/.server/repository/users";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const user = await getUserById(Number(params.userId));

  return Response.json({ user });
};
