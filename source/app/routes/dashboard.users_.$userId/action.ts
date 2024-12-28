import { User } from "@prisma/client";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { updateUserById } from "~/shared/.server/repository/users";
import { getSession } from "~/shared/.server/services/session";
import { SESSION_USER_KEY } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import { TSerializedUser } from "~/shared/types/remix";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role") as User["role"];

  if (
    !role ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return Response.json({
      error: "Name or email or password are not strings",
    });
  }
  const session = await getSession(request.headers.get("Cookie"));
  const sessionUser: TSerializedUser = session.get(SESSION_USER_KEY);

  try {
    await updateUserById(Number(params.userId), {
      firstName,
      lastName,
      email,
      role,
      password,
      updatedById: sessionUser.id,
    });

    return redirect(NavigationLink.DASHBOARD_USERS);
  } catch (error) {
    return Response.json(
      {
        error: "An unexpected error occurred",
      },
      { status: 400 }
    );
  }
}
