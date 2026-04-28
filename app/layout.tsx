import type { Metadata } from "next";
import { Unbounded, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const displayFont = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Master en Inteligencia Artificial | Formación Profesional",
  description:
    "El programa de formación más completo para profesionales que quieren dominar la IA. Machine Learning, Deep Learning, NLP, MLOps y más. 3.200+ alumnos formados.",
  keywords: "inteligencia artificial, machine learning, deep learning, formación IA, curso IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
