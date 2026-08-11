import type { Metadata } from "next";
import { Oxanium } from "next/font/google";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  title: "Padelium Studio",
  description: "Padel scoring and match analysis",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={oxanium.variable}>
      <body style={{ margin: 0, background: "#0a0a0a", color: "#ededed" }}>
        {children}
      </body>
    </html>
  );
}
