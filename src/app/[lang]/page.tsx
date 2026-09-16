import Activities from "@/components/section/Activities";
import Certifications from "@/components/section/Certifications";
import Contributions from "@/components/section/Contributions";
import Education from "@/components/section/Education";
import Info from "@/components/section/Info";
import Intro from "@/components/section/Intro";
import PostsLoader from "@/components/PostsLoader";
import Profile from "@/components/section/Profile";
import Stack from "@/components/section/Stacks";
import Projects from "@/components/section/Projects";
import type { Locale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Locale;

  return (
    <div className="flex flex-col gap-15">
      <Profile lang={lang} />
      <Intro lang={lang} />
      <Education lang={lang} />
      <Activities lang={lang} />
      <Stack />
      <Certifications lang={lang} />
      <Projects lang={lang} />
      <PostsLoader lang={lang} />
      <Contributions />
      <Info lang={lang} />
    </div>
  );
}
