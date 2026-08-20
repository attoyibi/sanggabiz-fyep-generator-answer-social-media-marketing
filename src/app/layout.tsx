import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Generator Tugas Praktik Mandiri",
  description:
    "Susun tugas praktik mandiri cukup dengan memilih jawaban, lalu unduh hasilnya dalam format PDF dan DOCX sesuai ketentuan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
