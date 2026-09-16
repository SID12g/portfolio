import Image from "next/image";
import Separator from "@/components/Separator";
import Link from "next/link";
import { contributions, type ContributionItem } from "@/data/contributions";

export default function Contributions() {
  return (
    <div>
      <Separator title="CONTRIBUTIONS" />
      <div className="flex flex-col gap-5">
        {contributions.map((item) => (
          <ContributionItemView key={item.href} item={item} />
        ))}
      </div>
    </div>
  );
}

function ContributionItemView({ item }: { item: ContributionItem }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <Link
          href={item.repositoryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-1.5 group"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
            <Image
              src={item.image}
              alt={`${item.repository} owner`}
              width={64}
              height={64}
            />
          </div>
          <span className="font-jetbrains-mono text-xs sm:text-sm text-accent group-hover:underline transition-all duration-150">
            {item.repository}
          </span>
        </Link>
        <span className="font-jetbrains-mono text-muted text-[10px] sm:text-xs whitespace-nowrap">
          {item.date}
        </span>
      </div>
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-jetbrains-mono text-xs sm:text-sm hover:text-accent transition-colors duration-150"
      >
        {item.title}
      </Link>
    </div>
  );
}
