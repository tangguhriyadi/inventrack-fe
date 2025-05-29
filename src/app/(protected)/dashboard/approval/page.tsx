import { getServerSession } from "next-auth";
import ApprovalPage from "../../../../features/approval/approval.page";
import authConfig from "../../../../configs/auth.config";
import { redirect } from "next/navigation";
import RoleEnum from "../../../../enums/role.enum";

export default async function Page() {
  const session = await getServerSession(authConfig);

  if (!session?.token) {
    redirect("/api/auth/signin");
  }

  if (session.user.role !== RoleEnum.ADMIN) {
    redirect("/");
  }
  return <ApprovalPage />;
}
