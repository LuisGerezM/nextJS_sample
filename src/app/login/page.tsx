import { LoginForm } from "@/features/auth/presentation/components/login-form";

export const metadata = {
  title: "Iniciar Sesión",
  description: "Inicio de sesión",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-primary mb-2">
          Iniciar sesión
        </h1>
      </div>
      <LoginForm />
    </div>
  );
}
