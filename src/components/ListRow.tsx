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
        <span className="font-medium text-primary">
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
  const className = "flex items-center justify-between gap-4";

  if (!href) return <div className={`${className} w-full`}>{content}</div>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="lift"
      // 떠오를 때 배경이 글자에 붙지 않도록 여백을 주고, 음수 margin으로 레이아웃 위치는 유지
      // (너비를 고정하지 않아야 부모 flex 안에서 양옆으로 늘어남)
      className={`${className} -mx-3 -my-2.5 rounded-lg px-3 py-2.5 [--lift-scale:1.01] hover:bg-elevated`}
    >
      {content}
    </a>
  );
}
