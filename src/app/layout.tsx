import "@ant-design/v5-patch-for-react-19";
import '@fontsource/manrope/300.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import type { Metadata } from "next";
import "./globals.css";
import MainProvider from "../providers/main.provider";

export const metadata: Metadata = {
  title: "Inventrack",
  description: "Inventrack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`antialiased main-scroll`}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
