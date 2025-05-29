import { getServerSession } from "next-auth";
import authConfig from "../../../configs/auth.config";
import { redirect } from "next/navigation";
import RoleEnum from "../../../enums/role.enum";
import DashboardAdminPage from "../../../features/dashboard-admin/dashboard-admin.page";


export default async function Page() {
  const session = await getServerSession(authConfig);

  if (!session?.token) {
    redirect("/api/auth/signin");
  }

  if (session.user.role === RoleEnum.ADMIN) {
    return <DashboardAdminPage />;
  } else {
    return <div>a</div>;
  }
}
