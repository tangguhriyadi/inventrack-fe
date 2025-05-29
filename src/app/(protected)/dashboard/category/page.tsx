import { getServerSession } from "next-auth";
import CategoryPage from "../../../../features/category/category.page";
import authConfig from "../../../../configs/auth.config";
import RoleEnum from "../../../../enums/role.enum";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authConfig);

  if (!session?.token) {
    redirect("/api/auth/signin");
  }

  if (session.user.role !== RoleEnum.ADMIN) {
    redirect("/");
  }
  return <CategoryPage />;
}
