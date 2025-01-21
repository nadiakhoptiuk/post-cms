export const HTTP_STATUS_CODES = {
  BAD_REQUEST_400: 400, //not found slug or bad request for database, wrong syntax
  UNAUTHORIZED_401: 401, //unauthorized
  FORBIDDEN_403: 403, //Forbidden
  NOT_FOUND_404: 404, //not found at database
  CONFLICT_409: 409, //conflict about resource state at db or other
  INTERNAL_SERVER_ERROR_500: 500,
};

type HttpStatusCode =
  (typeof HTTP_STATUS_CODES)[keyof typeof HTTP_STATUS_CODES];

export class InternalError extends Error {
  statusCode: HttpStatusCode;

  constructor(message: string, statusCode: HttpStatusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
