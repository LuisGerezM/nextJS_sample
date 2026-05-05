"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../domain/schemas/login.schema";
import { submitLogin } from "../actions/login.action";
import {
  CustomInput,
  ErrorInput,
  LabelInput,
} from "@/shared/components/form";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    startTransition(async () => {
      const result = await submitLogin(null, formData);
      if (!result?.ok) {
        setErrorMessage(result?.message || null);
      }
    });
  };

  return (
    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold mb-4 justify-center">
          Iniciar Sesión
        </h2>

        {errorMessage && (
          <div className="alert alert-error py-2 text-sm rounded-lg">
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <LabelInput text="Correo Electrónico" />
            <CustomInput
              type="email"
              placeholder="Ej: Sincere@april.biz"
              hasError={!!errors.email}
              {...register("email")}
            />
            <ErrorInput message={errors.email?.message} />
          </div>

          <div className="form-control">
            <LabelInput text="Contraseña" />
            <CustomInput
              type="password"
              placeholder="********"
              hasError={!!errors.password}
              {...register("password")}
            />
            <ErrorInput message={errors.password?.message} />
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Ingresar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
