import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { jetBrainsMono, pretendard } from "./fonts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotFoundView from "@/components/NotFoundView";
import { localizePath, type Locale } from "@/i18n/config";

const REDIRECT_SECONDS = 10;

export const metadata: Metadata = {
  title: "404 • sid12g",
};

export default async function GlobalNotFound() {
  const headerList = await headers();
  const lang: Locale = headerList.get("x-locale") === "en" ? "en" : "ko";

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${pretendard.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body>
        {/* JS가 로드되지 않는 경우를 위한 자동 이동 (JS 카운트다운보다 1초 늦게) */}
        <meta
          httpEquiv="refresh"
          content={`${REDIRECT_SECONDS + 1};url=${localizePath(lang, "/")}`}
        />
        <div className="mx-auto flex min-h-screen w-full max-w-[648px] flex-col gap-[60px] px-6 pt-10 pb-14 sm:pt-14">
          <Header lang={lang} />
          <main className="flex flex-1 flex-col justify-center py-10">
            <NotFoundView lang={lang} seconds={REDIRECT_SECONDS} />
          </main>
          <Footer lang={lang} />
        </div>
      </body>
    </html>
  );
}
