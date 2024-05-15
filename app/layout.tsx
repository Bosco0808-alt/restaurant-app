import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";

export const metadata: Metadata = {
  title: "Restaurant app",
  description: "A restaurant app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
