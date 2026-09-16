"use client";

import Separator from "@/components/Separator";
import MoreLink from "@/components/MoreLink";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface Post {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    tag: string[];
  };
  slug: string;
}

async function fetchLatestPosts(errorMessage: string): Promise<Post[]> {
  const res = await fetch("/api/posts/latest");
  if (!res.ok) throw new Error(errorMessage);
  const data: Post[] = await res.json();
  return data.slice(0, 4);
}

export default function Posts({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const { data: posts } = useSuspenseQuery({
    queryKey: ["posts", "latest"],
    queryFn: () => fetchLatestPosts(dict.posts.loadError),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <div>
      <Separator title="POSTS" />
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <PostItem
            key={post.slug}
            title={post.metadata.title}
            description={post.metadata.summary}
            date={post.metadata.publishedAt}
            tags={post.metadata.tag}
            href={`https://blog.sid12g.dev/${post.slug}`}
          />
        ))}
        <MoreLink
          href="https://blog.sid12g.dev"
          label={dict.common.more}
          external
        />
      </div>
    </div>
  );
}

function PostItem({
  title,
  description,
  date,
  tags,
  href,
}: {
  title: string;
  description: string;
  date: string;
  tags: string[];
  href: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-4 px-5 py-6 rounded-2xl border border-faint bg-muted-5 hover:border-accent hover:bg-hover transition-colors duration-150"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm sm:text-base font-medium">{title}</span>
        <span className="text-xs sm:text-sm text-muted">{description}</span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-[10px] sm:text-xs text-muted font-jetbrains-mono">
          {date}
        </span>
        <div className="flex flex-wrap gap-2 justify-end">
          {tags.map((tag) => (
            <span
              className="text-[10px] sm:text-xs text-muted font-jetbrains-mono px-3 py-[6px] bg-muted-15 rounded-full border border-faint w-fit"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
