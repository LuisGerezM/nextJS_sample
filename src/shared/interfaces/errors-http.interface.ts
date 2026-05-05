import { SEVERITY } from "../constants/severities.constant";

export type ErrorCode = "E001" | "E002" | "E003" | "Z000";

export interface SeverityIF {
  severity?: keyof typeof SEVERITY;
}

export interface CodeAndStatusCodeIF {
  statusCode?: string;
  code: ErrorCode;
}

export interface ExpectedErrorIF extends SeverityIF, CodeAndStatusCodeIF {
  message?: string;
  location?: string;
}

export interface ErrorHandlingIF extends SeverityIF {
  error: unknown;
  log?: boolean;
  location?: string;
}

export interface CatchErrorResponseIF {
  ok: boolean;
  data: null;
  message?: string | null;
  statusCode?: string;
}
