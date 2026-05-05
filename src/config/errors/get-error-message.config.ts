export type ErrorCode = "E001" | "E002" | "E003" | "Z000";

export const getErrorMessage = (code: ErrorCode): string => {
  const errorMessages: Record<ErrorCode, string> = {
    E001: "No se pudo descargar el archivo PDF",
    E002: "Error al cargar los datos",
    E003: "Usuario no autorizado",
    Z000: "Error desconocido",
  };

  return errorMessages[code] || "Ocurrió un error desconocido";
};
