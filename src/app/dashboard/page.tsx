import { DashboardProfile } from "@/features/dashboard/components/dashboard-profile";
import { authTokenConstant } from "@/shared/constants/common.constant";
import { routesConstant } from "@/shared/constants/routes/routes.constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard | Ejemplo",
  description: "Descripción ejemplo",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(authTokenConstant)?.value;

  if (!token) {
    redirect(`/${routesConstant.LOGIN}`);
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-base-100 p-4 rounded-xl shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">
            Panel de Control
          </h1>

          <form
            action={async () => {
              "use server";
              const cookieStore = await cookies();
              cookieStore.delete(authTokenConstant);
              redirect(`/${routesConstant.LOGIN}`);
            }}
          >
            <button className="btn btn-outline btn-error btn-sm">
              Cerrar Sesión
            </button>
          </form>
        </div>

        <DashboardProfile />
      </div>
    </div>
  );
}
