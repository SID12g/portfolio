"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRightIcon, FileIcon } from "@/components/icons";
import type { AssetType } from "@/utils/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export interface GalleryItem {
  src: string;
  name: string;
  type: AssetType;
}

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const ExternalLinkIcon = () => (
  <svg {...iconProps}>
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const DownloadIcon = () => (
  <svg {...iconProps}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CopyIcon = () => (
  <svg {...iconProps}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg {...iconProps}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg {...iconProps}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const LinkIcon = () => (
  <svg {...iconProps} width={18} height={18} strokeWidth={1.75}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg {...iconProps} width={20} height={20}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg {...iconProps} width={20} height={20}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const isPreviewable = (item: GalleryItem) =>
  item.type === "image" || item.type === "video" || item.type === "pdf";

function toEmbedUrl(url: string): string {
  const gdrive = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (gdrive) return `https://drive.google.com/file/d/${gdrive[1]}/preview`;
  return url;
}

const tileClass =
  "group relative flex aspect-[4/3] w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-surface-border bg-muted-5 text-left transition-colors duration-150 hover:border-divider";

function DocumentTile({
  item,
  label,
}: {
  item: GalleryItem;
  label: string;
}) {
  return (
    <span className="flex size-full flex-col justify-between p-4">
      <span className="flex items-start justify-between text-muted">
        {item.type === "pdf" ? (
          <FileIcon className="size-[18px]" />
        ) : (
          <LinkIcon />
        )}
        <ArrowUpRightIcon className="size-4 transition-colors duration-150 group-hover:text-primary" />
      </span>
      <span className="flex min-w-0 flex-col gap-1.5">
        <span className="line-clamp-2 text-sm leading-[1.4] font-semibold break-all text-primary">
          {item.name}
        </span>
        <span className="text-xs leading-none font-medium text-muted">
          {label}
        </span>
      </span>
    </span>
  );
}

export function MediaGallery({
  items,
  lang,
  className = "",
}: {
  items: GalleryItem[];
  lang: Locale;
  className?: string;
}) {
  const dict = getDictionary(lang).mediaPreview;
  const previewable = items.filter(isPreviewable);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = (item: GalleryItem) => setOpenIndex(previewable.indexOf(item));

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${className}`}>
        {items.map((item) =>
          item.type === "link" ? (
            <a
              key={item.src}
              href={item.src}
              target="_blank"
              rel="noopener noreferrer"
              className={tileClass}
            >
              <DocumentTile item={item} label={dict.link} />
            </a>
          ) : (
            <button
              key={item.src}
              type="button"
              onClick={() => isPreviewable(item) && open(item)}
              className={tileClass}
              aria-label={item.name}
            >
              {item.type === "image" && (
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(min-width: 640px) 240px, 50vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              )}
              {item.type === "video" && (
                <>
                  <video
                    src={`${item.src}#t=0.001`}
                    className="size-full object-contain"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#0d0d0d] pl-0.5 text-white transition-transform duration-150 group-hover:scale-110">
                      <PlayIcon />
                    </span>
                  </span>
                </>
              )}
              {item.type === "pdf" && (
                <DocumentTile item={item} label={dict.pdf} />
              )}
              {item.type === "other" && (
                <span className="flex size-full items-center justify-center p-4 text-center text-sm break-all text-muted">
                  {item.name}
                </span>
              )}
            </button>
          ),
        )}
      </div>

      {openIndex !== null && previewable[openIndex] && (
        <Lightbox
          items={previewable}
          index={openIndex}
          onChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          lang={lang}
        />
      )}
    </>
  );
}

const toolbarButtonClass =
  "flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#333333] bg-[#262626] text-white transition-colors duration-150 hover:bg-[#333333]";

const navButtonClass =
  "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#333333] bg-[#262626] text-white transition-colors duration-150 hover:bg-[#333333]";

function Lightbox({
  items,
  index,
  onChange,
  onClose,
  lang,
}: {
  items: GalleryItem[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
  lang: Locale;
}) {
  const dict = getDictionary(lang).mediaPreview;
  const current = items[index];
  const [copiedSrc, setCopiedSrc] = useState<string | null>(null);
  const copied = copiedSrc === current.src;
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrev) onChange(index - 1);
      else if (e.key === "ArrowRight" && hasNext) onChange(index + 1);
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, hasPrev, hasNext, onChange, onClose]);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const absoluteUrl = (src: string) =>
    src.startsWith("http") ? src : window.location.origin + src;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(absoluteUrl(current.src));
    setCopiedSrc(current.src);
    setTimeout(() => setCopiedSrc(null), 2000);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = current.src;
    a.download = current.name;
    a.click();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.name}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0d0d0d] p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between gap-3 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="min-w-0 truncate text-sm font-medium text-[#b3b3b3]">
          {current.name}
          {items.length > 1 && (
            <span className="ml-2 text-[#808080]">
              {index + 1} / {items.length}
            </span>
          )}
        </span>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={toolbarButtonClass}
            title={copied ? dict.copied : dict.copyLink}
            aria-label={copied ? dict.copied : dict.copyLink}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          {current.type !== "pdf" && (
            <button
              type="button"
              onClick={handleDownload}
              className={toolbarButtonClass}
              title={dict.download}
              aria-label={dict.download}
            >
              <DownloadIcon />
            </button>
          )}
          <a
            href={absoluteUrl(current.src)}
            target="_blank"
            rel="noopener noreferrer"
            className={toolbarButtonClass}
            title={dict.openNewTab}
            aria-label={dict.openNewTab}
          >
            <ExternalLinkIcon />
          </a>
          <button
            type="button"
            onClick={onClose}
            className={toolbarButtonClass}
            title={dict.close}
            aria-label={dict.close}
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
        {hasPrev && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(index - 1);
            }}
            className={`${navButtonClass} left-0`}
            title={dict.previous}
            aria-label={dict.previous}
          >
            <ChevronLeftIcon />
          </button>
        )}

        <div
          className="flex size-full items-center justify-center sm:px-14"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {current.type === "image" && (
            <Image
              key={current.src}
              src={current.src}
              alt={current.name}
              width={2400}
              height={2400}
              sizes="100vw"
              className="h-auto max-h-full w-auto max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {current.type === "video" && (
            <video
              key={current.src}
              src={current.src}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {current.type === "pdf" && (
            <iframe
              key={current.src}
              src={toEmbedUrl(current.src)}
              title={current.name}
              className="size-full max-w-4xl rounded-xl bg-white"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>

        {hasNext && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(index + 1);
            }}
            className={`${navButtonClass} right-0`}
            title={dict.next}
            aria-label={dict.next}
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}
