import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Universal AI API Hub",
  description: "Configurable AI API connector platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
