import "./globals.css";
import localFont from "next/font/local";
import { headers } from "next/headers";
import NotFoundView from "@/components/NotFoundView";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  style: "normal",
  display: "swap",
});

const jetBrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Medium.woff2",
  variable: "--font-jetbrains-mono",
  weight: "500",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404: Not Found",
};

export default async function GlobalNotFound() {
  const headerList = await headers();
  const lang = (headerList.get("x-locale") === "en" ? "en" : "ko") as Locale;

  return (
    <html
      lang={lang}
      className={`${pretendard.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body className="max-w-[640px] mx-auto px-6 py-10">
        <NotFoundView lang={lang} />
      </body>
    </html>
  );
}
