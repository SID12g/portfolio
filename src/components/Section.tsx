import type { ReactNode } from "react";

export default function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="flex w-full flex-col gap-5">
      <h2 className="flex items-center gap-4 text-sm leading-[1.2] font-medium whitespace-nowrap text-secondary">
        {title}
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </h2>
      {children}
    </section>
  );
}
