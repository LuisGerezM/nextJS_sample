import { redirect } from "next/navigation";

import { routesConstant } from "@/shared/constants/routes/routes.constant";

export default function RootPage() {
  redirect(`/${routesConstant.LOGIN}`);
}
