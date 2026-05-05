import {
  CodeAndStatusCodeIF,
  SeverityIF,
} from "@/shared/interfaces/errors-http.interface";

interface LogsHandlingIF extends SeverityIF, CodeAndStatusCodeIF {
  message: string;
  location?: string;
  error?: unknown;
}

export const logInfo = (message: string): void => {
  console.info(`[INFO] ${message}`);
};

export const logWarn = (message: string): void => {
  console.warn(`[WARN] ${message}`);
};

export const logError = ({
  code,
  message,
  severity,
  location,
  error,
}: LogsHandlingIF): void => {
  console.error(
    `----LogInfo----: [ERROR] - Code: ${code}, Message: ${message}, Severidad: ${severity}, Ubicación: ${location}, ErrosAsString: ${JSON.stringify(error)}`,
  );
};
