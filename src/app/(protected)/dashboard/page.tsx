import HomePage from "@/features/home/home.page";
import { getServerSession } from "next-auth";
import authConfig from "../../../configs/auth.config";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authConfig);

  if (!session?.token) {
    redirect("/api/auth/signin");
  }
  return <HomePage />;
}
