import { SEVERITY } from "@/shared/constants/severities.constant";
import { logError } from "../logs";
import {
  CatchErrorResponseIF,
  ErrorHandlingIF,
  ExpectedErrorIF,
} from "@/shared/interfaces/errors-http.interface";

type ParsedError =
  | ExpectedErrorIF
  | { message: string; stack?: string; name?: string };

const parseErrorAsObject = (error: unknown): ParsedError =>
  error instanceof Error
    ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      }
    : (error as ExpectedErrorIF);

export const errorHandling = ({
  log = true,
  location = "NOT-LOCATION",

  error,
}: ErrorHandlingIF): CatchErrorResponseIF => {
  const parseErrorAsCustomError = parseErrorAsObject(error);

  const statusCode =
    "statusCode" in parseErrorAsCustomError
      ? parseErrorAsCustomError?.statusCode
      : "500";
  const code =
    "code" in parseErrorAsCustomError ? parseErrorAsCustomError?.code : "Z000";
  const severity =
    "severity" in parseErrorAsCustomError
      ? parseErrorAsCustomError?.severity
      : SEVERITY.HIGHT;

  // TODO: dejo por si a futuro usaremos errores por code
  // const message = getErrorMessage(code);

  if (log || severity === SEVERITY.HIGHT) {
    logError({
      statusCode,
      code,
      message: parseErrorAsCustomError?.message || "Error no conocido",
      severity,
      location,
      error: parseErrorAsCustomError,
    });
  }

  console.warn(
    "errorHandling - ERROR msg: " + parseErrorAsCustomError?.message,
  );

  //*  message para el cliente
  return {
    ok: false,
    data: null,
    message: parseErrorAsCustomError?.message || null,
    statusCode,
  };
};
