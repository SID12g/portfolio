export const chipClass =
  "rounded-lg px-3 py-1.5 text-xs leading-[normal] font-medium whitespace-nowrap";

export default function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className={`${chipClass} bg-invert-bg text-invert-fg`}>
      {children}
    </span>
  );
}
