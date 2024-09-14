import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn SSI generator",
  description: "Fake LinkedIn SSI (Social Selling Index) Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
