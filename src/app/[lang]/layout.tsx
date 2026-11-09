import type { Metadata, Viewport } from "next";
import "../globals.css";
import { jetBrainsMono, pretendard } from "../fonts";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { locales, type Locale } from "@/i18n/config";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const metaByLang: Record<Locale, { title: string; description: string }> = {
  ko: {
    title: "sid12g • 조성민",
    description: "안녕하세요, 개발자 조성민입니다.",
  },
  en: {
    title: "sid12g • Sungmin Cho",
    description: "Hi, I'm Sungmin Cho, a developer.",
  },
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { title, description } = metaByLang[lang];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: lang === "ko" ? "ko_KR" : "en_US",
      type: "website",
      images: [
        {
          url: "https://sid12g.dev/images/og-image.png",
        },
      ],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = (await params).lang as Locale;

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${pretendard.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body>
        <Analytics />
        <SpeedInsights />
        <Cursor />
        {/* 헤더 위 여백만큼 스크롤하면 헤더가 상단에 붙음 (헤더 자체 여백 16px 포함해 처음 위치는 기존과 같음) */}
        <div className="flex min-h-screen flex-col pt-6 sm:pt-10">
          <Header lang={lang} />
          <div className="mx-auto flex w-full max-w-[648px] flex-1 flex-col gap-[60px] px-6 pt-11 pb-14">
            <main className="flex-1">{children}</main>
            <Footer lang={lang} />
          </div>
        </div>
      </body>

      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-GEJF001B08"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GEJF001B08');
          `}
      </Script>
    </html>
  );
}
