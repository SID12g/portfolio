import React from "react";
import MediaPreview, { MediaGallery } from "./MediaPreview";
import type { AssetType } from "@/utils/projects";
import type { Locale } from "@/i18n/config";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".avi"]);

function inferType(src: string): AssetType {
  const ext = src.split(".").pop()?.toLowerCase() ?? "";
  if (IMAGE_EXTS.has(`.${ext}`)) return "image";
  if (VIDEO_EXTS.has(`.${ext}`)) return "video";
  if (ext === "pdf") return "pdf";
  return "other";
}

function CustomParagraph({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  const childArray = React.Children.toArray(children);

  const nonWhitespace = childArray.filter(
    (child) => !(typeof child === "string" && child.trim() === ""),
  );

  const allMedia =
    nonWhitespace.length > 0 &&
    nonWhitespace.every(
      (child) =>
        React.isValidElement(child) &&
        typeof child.props === "object" &&
        child.props !== null &&
        "src" in (child.props as object),
    );

  if (allMedia) {
    const items = nonWhitespace.map((child) => {
      const el = child as React.ReactElement<{
        src: string;
        name: string;
        type: AssetType;
      }>;
      return { src: el.props.src, name: el.props.name, type: el.props.type };
    });
    return <MediaGallery items={items} lang={lang} />;
  }

  return <p className="mb-4">{children}</p>;
}

export function getMdxComponents(
  lang: Locale,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, React.ComponentType<any>> {
  return {
    p: ({ children }: { children: React.ReactNode }) => (
      <CustomParagraph lang={lang}>{children}</CustomParagraph>
    ),
    img: ({ src }: { src?: string; alt?: string }) => {
      if (!src) return null;
      const name = src.split("/").pop() ?? src;
      return (
        <MediaPreview src={src} name={name} type={inferType(src)} lang={lang} />
      );
    },
  };
}
