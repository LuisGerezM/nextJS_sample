"use client";

import { useEffect, useState, useTransition } from "react";
import { getUserAction } from "@/features/user/presentation/actions/get-user.action";

import { UserModel } from "@/features/user/domain/models/user.model";

export const DashboardProfile = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const response = await getUserAction();

      if (!response.ok) {
        setError(response?.message || "Error al obtener perfil");
        return;
      }

      setUser(response.data);
    });
  }, []);

  if (isPending) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <span>{error}</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-base-200">
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold mb-6 text-primary">
          Perfil de Usuario
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-base-content/70 font-semibold uppercase">
              Nombre
            </label>
            <p className="text-lg font-medium">{user.fullName}</p>
          </div>

          <div>
            <label className="text-sm text-base-content/70 font-semibold uppercase">
              Email
            </label>
            <p className="text-lg font-medium">{user.contactEmail}</p>
          </div>

          <div>
            <label className="text-sm text-base-content/70 font-semibold uppercase">
              Teléfono
            </label>
            <p className="text-lg font-medium">{user.phoneNumber}</p>
          </div>

          <div>
            <label className="text-sm text-base-content/70 font-semibold uppercase">
              Sitio Web
            </label>
            <p className="text-lg font-medium text-secondary">
              {user.websiteUrl}
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 bg-base-200 p-4 rounded-lg mt-2">
            <label className="text-sm text-base-content/70 font-semibold uppercase">
              Empresa
            </label>
            <p className="text-xl font-bold mt-1">{user.companyName}</p>
            <p className="text-sm italic opacity-80">{user.companyPhrase}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
