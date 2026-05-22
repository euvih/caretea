import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareTEA",
  description: "Plataforma inteligente de apoio para cuidadores de pessoas com TEA.",

  openGraph: {
    title: "CareTEA",
    description:
      "Quem cuida também precisa ser cuidado.",
    url: "https://caretea.vercel.app",
    siteName: "CareTEA",
    images: [
      {
        url: "https://caretea.vercel.app/capa-caretea.png",
        width: 1200,
        height: 630,
        alt: "CareTEA",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CareTEA",
    description:
      "Plataforma inteligente de apoio para cuidadores de pessoas com TEA.",
    images: ["/capa-caretea.png?v=2"],
  },
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