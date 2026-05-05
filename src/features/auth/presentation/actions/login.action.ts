"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema } from "../../domain/schemas/login.schema";
import { CatchErrorResponseIF } from "@/shared/interfaces/errors-http.interface";
import { errorHandling } from "@/config/errors";
import { routesConstant } from "@/shared/constants/routes/routes.constant";
import { AuthDatasourceImpl } from "../../data/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../data/repositories/auth.repository.impl";
import { authTokenConstant } from "@/shared/constants/common.constant";

export interface ActionState {
  message?: string;
  ok: boolean;
}

export async function submitLogin(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = loginSchema.safeParse(rawData);

  if (!validatedFields.success) {
    throw new Error("Campos inválidos. Por favor revisa la información.");
  }

  const { email } = validatedFields.data;

  try {
    // Inyección de dependencias (Manual)
    const datasource = new AuthDatasourceImpl();
    const repository = new AuthRepositoryImpl(datasource);

    const user = await repository.loginByEmail(email);

    // Cookie asíncrona
    const cookieStore = await cookies();
    cookieStore.set(authTokenConstant, user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    });
  } catch (error) {
    const parseError: CatchErrorResponseIF = errorHandling({
      error,
      location: "submitLogin",
    });

    return {
      ...parseError,
      message: parseError?.message || "Ocurrió un error al iniciar sesión",
    };
  }

  redirect(`/${routesConstant.DASHBOARD}`);
}
