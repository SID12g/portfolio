"use client";

import { useEffect, useState } from "react";
import type { AssetType } from "@/utils/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface MediaPreviewProps {
  src: string;
  name: string;
  type: AssetType;
  lang: Locale;
}

const ExternalLinkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const FileIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const LinkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function Thumbnail({
  src,
  name,
  type,
}: {
  src: string;
  name: string;
  type: AssetType;
}) {
  if (type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover object-center block"
      />
    );
  }

  if (type === "video") {
    return (
      <>
        <video
          src={`${src}#t=0.001`}
          className="w-full h-full object-cover object-center block"
          muted
          preload="metadata"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white pl-1">
            <PlayIcon />
          </div>
        </div>
      </>
    );
  }

  if (type === "pdf" || type === "link") {
    return (
      <div className="w-full h-full text-muted flex flex-col justify-end px-6 py-6">
        <div className="flex flex-col items-start justify-center gap-2">
          {type === "pdf" ? <FileIcon /> : <LinkIcon />}
          <span className="text-sm font-jetbrains-mono text-start line-clamp-2 break-all">
            {name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center text-muted text-xs px-2 text-start break-all">
      {name}
    </div>
  );
}

function toEmbedUrl(url: string): string {
  const gdrive = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (gdrive) return `https://drive.google.com/file/d/${gdrive[1]}/preview`;
  return url;
}

const btnClass =
  "cursor-pointer w-8 h-8 bg-muted-15 border border-faint rounded-lg flex items-center justify-center hover:border-accent transition-colors duration-150 text-primary";

interface GalleryItem {
  src: string;
  name: string;
  type: AssetType;
}

export function MediaGallery({
  items,
  lang,
}: {
  items: GalleryItem[];
  lang: Locale;
}) {
  const dict = getDictionary(lang).mediaPreview;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const current = openIndex !== null ? items[openIndex] : null;

  useEffect(() => {
    if (openIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && openIndex > 0) setOpenIndex(openIndex - 1);
      else if (e.key === "ArrowRight" && openIndex < items.length - 1)
        setOpenIndex(openIndex + 1);
      else if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openIndex, items.length]);

  const handleDownload = () => {
    if (!current) return;
    const a = document.createElement("a");
    a.href = current.src;
    a.download = current.name;
    a.click();
  };

  const shareUrl = (src: string) =>
    src.startsWith("http") ? src : window.location.origin + src;

  const handleShare = async () => {
    if (!current) return;
    await navigator.clipboard.writeText(shareUrl(current.src));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavigate = () => {
    if (!current) return;
    window.open(shareUrl(current.src), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(140px,100%),1fr))] gap-3 my-4">
        {items.map((item, i) => (
          <button
            key={item.src}
            onClick={() => {
              setOpenIndex(i);
              setCopied(false);
            }}
            className="w-full aspect-square rounded-xl overflow-hidden border border-faint relative group cursor-pointer bg-muted-5"
          >
            <Thumbnail src={item.src} name={item.name} type={item.type} />
            {item.type !== "other" && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-150 flex items-end justify-center pb-4">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-black/50 px-3 py-1 rounded-full">
                  {dict.viewDetails}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
          onClick={() => setOpenIndex(null)}
        >
          {/* 이전 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(openIndex - 1);
            }}
            disabled={openIndex === 0}
            className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#323232] opacity-100 flex items-center justify-center text-white hover:opacity-50 transition-opacity duration-150 disabled:opacity-0 disabled:pointer-events-none"
            title={dict.previous}
          >
            <ChevronLeftIcon />
          </button>

          {/* 콘텐츠 */}
          <div
            className="flex flex-col items-end gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row gap-2">
              <button
                onClick={handleShare}
                className={btnClass}
                title={copied ? dict.copied : dict.copyLink}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
              {current.type !== "pdf" && current.type !== "link" && (
                <button
                  onClick={handleDownload}
                  className={btnClass}
                  title={dict.download}
                >
                  <DownloadIcon />
                </button>
              )}
              <button
                onClick={handleNavigate}
                className={btnClass}
                title={dict.openNewTab}
              >
                <ExternalLinkIcon />
              </button>
              <button
                onClick={() => setOpenIndex(null)}
                className={btnClass}
                title={dict.close}
              >
                <CloseIcon />
              </button>
            </div>

            {current.type === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current.src}
                alt={current.name}
                className="max-w-[90vw] max-h-[80vh] rounded-2xl border border-faint object-contain block"
              />
            )}
            {current.type === "video" && (
              <video
                key={current.src}
                src={current.src}
                controls
                autoPlay
                className="max-w-[90vw] max-h-[80vh] rounded-2xl border border-faint"
              />
            )}
            {current.type === "pdf" && (
              <iframe
                src={toEmbedUrl(current.src)}
                title={current.name}
                className="w-[80vw] h-[80vh] rounded-2xl border border-faint bg-white"
              />
            )}
            {current.type === "link" && (
              <div className="w-[320px] h-[200px] rounded-2xl border border-white/20 bg-[#323232] flex flex-col items-center justify-center gap-4 text-white">
                <LinkIcon />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-medium">{current.name}</span>
                  <span className="text-xs text-white/50 font-jetbrains-mono truncate max-w-[260px]">
                    {current.src}
                  </span>
                </div>
                <a
                  href={current.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium px-5 py-2 bg-white/15 border border-white/30 rounded-lg hover:bg-white/25 hover:border-white/50 transition-colors duration-150"
                >
                  {dict.goToLink}
                </a>
              </div>
            )}
          </div>

          {/* 다음 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(openIndex + 1);
            }}
            disabled={openIndex === items.length - 1}
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#323232] opacity-100 flex items-center justify-center text-white hover:opacity-50 transition-opacity duration-150 disabled:opacity-0 disabled:pointer-events-none"
            title={dict.next}
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </>
  );
}

export default function MediaPreview({
  src,
  name,
  type,
  lang,
}: MediaPreviewProps) {
  const dict = getDictionary(lang).mediaPreview;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = src;
    a.download = name;
    a.click();
  };

  const handleShare = async () => {
    const url = window.location.origin + src;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full max-w-[180px] aspect-square rounded-xl overflow-hidden border border-faint relative group cursor-pointer bg-muted-5"
      >
        <Thumbnail src={src} name={name} type={type} />
        {type !== "other" && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-150 flex items-end justify-center pb-4">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-black/50 px-3 py-1 rounded-full">
              {dict.viewDetails}
            </span>
          </div>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex flex-col items-end gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 툴바 */}
            <div className="flex flex-row gap-2">
              <button
                onClick={handleShare}
                className={btnClass}
                title={copied ? dict.copied : dict.copyLink}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
              <button
                onClick={handleDownload}
                className={btnClass}
                title={dict.download}
              >
                <DownloadIcon />
              </button>
              <button
                onClick={() => setOpen(false)}
                className={btnClass}
                title={dict.close}
              >
                <CloseIcon />
              </button>
            </div>

            {/* 콘텐츠 */}
            {type === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={name}
                className="max-w-[90vw] max-h-[80vh] rounded-2xl border border-faint object-contain block"
              />
            )}
            {type === "video" && (
              <video
                src={src}
                controls
                autoPlay
                className="max-w-[90vw] max-h-[80vh] rounded-2xl border border-faint"
              />
            )}
            {type === "pdf" && (
              <iframe
                src={toEmbedUrl(src)}
                title={name}
                className="w-[80vw] h-[80vh] rounded-2xl border border-faint bg-white"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
