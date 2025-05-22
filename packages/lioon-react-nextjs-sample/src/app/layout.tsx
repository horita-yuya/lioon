import "./globals.css";
import { LioonProvider } from "@lioon/react";
import ja from "../../i18n/ja.json";
import en from "../../i18n/en.json";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LioonProvider translations={{ ja, en }} locale={"ja" as "ja" | "en"}>
        <body>{children}</body>
      </LioonProvider>
    </html>
  );
}
