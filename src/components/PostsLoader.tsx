"use client";

import dynamic from "next/dynamic";
import PostsSkeleton from "./PostsSkeleton";
import type { Locale } from "@/i18n/config";

const Posts = dynamic(() => import("./section/Posts"), {
  ssr: false,
  loading: () => <PostsSkeleton />,
});

export default function PostsLoader({ lang }: { lang: Locale }) {
  return <Posts lang={lang} />;
}
