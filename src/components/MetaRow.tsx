import Link from "next/link";
import type { ReactNode } from "react";

export default function MetaRow({
  icon,
  href,
  title,
  subtitle,
  trailing,
}: {
  icon: ReactNode;
  href?: string;
  title: string;
  subtitle: string;
  trailing?: ReactNode;
}) {
  const titleClassName = "text-base font-semibold tracking-tight";

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {icon}
        <div className="flex min-w-0 flex-col gap-3">
          {href ? (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${titleClassName} hover:underline`}
            >
              {title}
            </Link>
          ) : (
            <span className={titleClassName}>{title}</span>
          )}
          <span className="text-sm font-medium text-muted">{subtitle}</span>
        </div>
      </div>
      {trailing && (
        <span className="shrink-0 text-sm font-normal whitespace-nowrap text-muted">
          {trailing}
        </span>
      )}
    </div>
  );
}
