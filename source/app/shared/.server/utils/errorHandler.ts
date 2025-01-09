// import { PostgresError } from "postgres";

export const errorHandler = (error: any) => {
  if (error.name === "PostgresError") {
    console.log(error.constraint_name || "Database error");

    return new Response(error.constraint_name || "Database error", {
      status: 500,
    });
  }

  // if (error instanceof DrizzleError) {

  // }

  if (error instanceof Error) {
    console.log(error.message);
    return error;
  }

  if (error instanceof Response) {
    console.log(error);
    return error;
  }

  return new Response("Internal Server Error", { status: 500 });
};
