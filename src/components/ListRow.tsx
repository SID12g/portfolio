import type { ReactNode } from "react";

export default function ListRow({
  href,
  title,
  subtitle,
  trailing,
}: {
  href?: string;
  title: string;
  subtitle: string;
  trailing?: ReactNode;
}) {
  const content = (
    <>
      {/* 줄바꿈 시 줄 간격을 위해 leading 1.4를 주고, 음수 margin으로 한 줄일 때 높이는 leading 1.2와 같게 유지 */}
      <span className="flex min-w-0 flex-col gap-1.5 text-sm leading-[1.4] *:-my-[0.1em]">
        <span className="font-medium text-primary transition-colors duration-150 group-hover:text-secondary">
          {title}
        </span>
        <span className="text-secondary">{subtitle}</span>
      </span>
      {trailing && (
        <span className="shrink-0 text-right text-xs leading-[1.2] font-medium whitespace-nowrap text-tertiary">
          {trailing}
        </span>
      )}
    </>
  );
  const className = "flex w-full items-center justify-between gap-4";

  if (!href) return <div className={className}>{content}</div>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${className}`}
    >
      {content}
    </a>
  );
}
