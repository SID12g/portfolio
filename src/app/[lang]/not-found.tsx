"use client";

import { usePathname } from "next/navigation";
import NotFoundView from "@/components/NotFoundView";

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";

  return <NotFoundView lang={lang} />;
}
