import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function withLocaleHeader(request: NextRequest, locale: "ko" | "en") {
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  return { request: { headers } };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "ko") {
    const rest = segments.slice(1);
    const url = request.nextUrl.clone();
    url.pathname = rest.length ? `/${rest.join("/")}` : "/";
    return NextResponse.redirect(url);
  }

  if (segments[0] === "en") {
    return NextResponse.next(withLocaleHeader(request, "en"));
  }

  const url = request.nextUrl.clone();
  url.pathname = `/ko${segments.length ? `/${segments.join("/")}` : ""}`;
  return NextResponse.rewrite(url, withLocaleHeader(request, "ko"));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
