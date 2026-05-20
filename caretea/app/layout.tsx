import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareTEA",
  description: "Plataforma para cuidadores de pessoas com TEA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#f4f7ff] text-[#1E293B]">
        {children}
      </body>
    </html>
  );
}