import Activities from "@/components/section/Activities";
import Certifications from "@/components/section/Certifications";
import Contributions from "@/components/section/Contributions";
import Education from "@/components/section/Education";
import Intro from "@/components/section/Intro";
import Profile from "@/components/section/Profile";
import Stacks from "@/components/section/Stacks";
import type { Locale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Locale;

  return (
    <div className="flex flex-col gap-[60px]">
      <Profile />
      <Intro lang={lang} />
      <Education lang={lang} />
      <Activities lang={lang} />
      <Certifications lang={lang} />
      <Stacks lang={lang} />
      <Contributions lang={lang} />
    </div>
  );
}
