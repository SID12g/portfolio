import Link from "next/link";

export default function MoreLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="py-2 sm:py-2.5 rounded-lg border border-faint bg-muted-5 text-center hover:border-accent hover:bg-hover transition-colors duration-150"
    >
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </Link>
  );
}
