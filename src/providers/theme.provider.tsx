import { ConfigProvider } from "antd";
import { theme } from "@/configs/theme.config";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
