import { ActionFunctionArgs } from "@remix-run/node";
import { loginUser } from "~/shared/.server/services/auth";

export async function action({ request }: ActionFunctionArgs) {
  return await loginUser(request);
}
