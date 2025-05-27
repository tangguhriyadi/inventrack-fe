import AuthPageLayout from "@/components/layout/auth-page-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthPageLayout>{children}</AuthPageLayout>;
}
