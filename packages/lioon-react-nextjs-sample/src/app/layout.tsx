import "./globals.css";
import { LioonProvider } from "@lioon/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LioonProvider translations={{}}>
        <body>{children}</body>
      </LioonProvider>
    </html>
  );
}
