import React from "react";
import { MediaGallery } from "./MediaPreview";
import type { Locale } from "@/i18n/config";
import { getAssetType } from "@/utils/media";

function toGalleryItem(src: string) {
  return { src, name: src.split("/").pop() ?? src, type: getAssetType(src) };
}

function CustomParagraph({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  const nonWhitespace = React.Children.toArray(children).filter(
    (child) => !(typeof child === "string" && child.trim() === ""),
  );

  const allMedia =
    nonWhitespace.length > 0 &&
    nonWhitespace.every(
      (child) =>
        React.isValidElement<{ src?: unknown }>(child) &&
        typeof child.props.src === "string",
    );

  // 이미지만 있는 문단은 <p> 대신 갤러리로 렌더링
  if (allMedia) {
    const items = nonWhitespace.map((child) =>
      toGalleryItem((child as React.ReactElement<{ src: string }>).props.src),
    );
    return <MediaGallery items={items} lang={lang} className="mb-5" />;
  }

  return <p>{children}</p>;
}

export function getMdxComponents(
  lang: Locale,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, React.ComponentType<any>> {
  return {
    p: ({ children }: { children: React.ReactNode }) => (
      <CustomParagraph lang={lang}>{children}</CustomParagraph>
    ),
    img: ({ src }: { src?: string }) =>
      src ? (
        <MediaGallery
          items={[toGalleryItem(src)]}
          lang={lang}
          className="mb-5"
        />
      ) : null,
    a: ({ href, children }: { href?: string; children: React.ReactNode }) =>
      href?.startsWith("http") ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      ),
    table: ({ children }: { children: React.ReactNode }) => (
      <div className="table-wrapper">
        <table>{children}</table>
      </div>
    ),
  };
}
