import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { envs } from "@/config/envs/envs";
import { authTokenConstant } from "@/shared/constants/common.constant";

import { errorHandling } from "@/config/errors";

// Route Handler - patrón proxy
export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(authTokenConstant)?.value;

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const response = await fetch(`${envs.apiBaseUrl}/users/${userId}`);

    if (!response.ok) {
      throw new Error("Usuario no encontrado en el servicio externo");
    }

    const userData = await response.json();

    return NextResponse.json({ user: userData });
  } catch (error) {
    const parseError = errorHandling({
      error,
      location: "getUserDetailsRouteHandler",
    });

    return NextResponse.json(
      { error: parseError.message || "Error interno del servidor" },
      { status: Number(parseError?.statusCode) || 500 },
    );
  }
}
