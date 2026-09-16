import Link from "next/link";
import type { ReactNode } from "react";

export default function MetaRow({
  icon,
  href,
  title,
  titleWeight = "semibold",
  subtitle,
  subtitleWeight = "medium",
  trailing,
}: {
  icon: ReactNode;
  href?: string;
  title: string;
  titleWeight?: "medium" | "semibold";
  subtitle: string;
  subtitleWeight?: "normal" | "medium";
  trailing?: ReactNode;
}) {
  const content = (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {icon}
        <div className="flex min-w-0 flex-col gap-3">
          <span
            className={`text-base leading-none transition-colors duration-150 group-hover:text-muted ${
              titleWeight === "semibold" ? "font-semibold" : "font-medium"
            }`}
          >
            {title}
          </span>
          <span
            className={`text-sm leading-[1.3] text-muted ${
              subtitleWeight === "medium" ? "font-medium" : "font-normal"
            }`}
          >
            {subtitle}
          </span>
        </div>
      </div>
      {trailing && (
        <span className="shrink-0 text-sm leading-none font-normal whitespace-nowrap text-muted">
          {trailing}
        </span>
      )}
    </>
  );
  const className =
    "flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2";

  if (!href) return <div className={className}>{content}</div>;

  return (
    <Link
      href={href}
      {...(href.startsWith("mailto:")
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
      className={`group ${className}`}
    >
      {content}
    </Link>
  );
}
