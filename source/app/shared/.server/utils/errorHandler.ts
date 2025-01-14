import { DrizzleError } from "drizzle-orm";
import { data } from "react-router";

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

  if (error?.name === "PostgresError") {
    console.log("instanceof PostgresError", error?.constraint_name);

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
