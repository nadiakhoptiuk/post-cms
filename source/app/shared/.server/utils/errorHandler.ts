import { DrizzleError } from "drizzle-orm";
import { data, redirect } from "react-router";
import { NavigationLink } from "~/shared/constants/navigation";

export const errorHandler = (error: any) => {
  console.log("errorHandler", error);

  if (error instanceof Response && error.status === 302) {
    return error;
  }

  if (error instanceof Response && error.status !== 302) {
    console.log("instanceof Response", error);

    return data(error || "ErrorResponse", {
      status: error.status,
    });
  }

  if (error instanceof Response && error.status === 404) {
    console.log("error.status === 404");
    return redirect(NavigationLink.NOT_FOUND);
  }

  if (error.type === "DataWithResponseInit" && error.init.status === 404) {
    console.log("DataWithResponseInit", error);

    return redirect(NavigationLink.NOT_FOUND);

    // return data(error.type || error.data || "ErrorResponse", {
    //   status: error.init.status,
    // });
  }

  if (error?.code === "ECONNREFUSED") {
    console.log("Database isn't connect", error.code);

    throw Error("Database isn't connect");
  }

  if (error?.name === "PostgresError") {
    console.log(
      "instanceof PostgresError",
      error?.constraint_name || error.message
    );

    return data(error?.constraint_name || error.message || "PostgresError", {
      status: 500,
    });
  }

  if (error instanceof DrizzleError) {
    console.log("instanceof DrizzleError", error.message);

    return data(error.message || "DrizzleError", {
      status: 500,
    });
  }

  if (error instanceof Error) {
    console.log("instanceof Error", error.message);

    return data(error.message, {
      status: 500,
    });
  }

  return data("Internal Server Error", { status: 500 });
};
