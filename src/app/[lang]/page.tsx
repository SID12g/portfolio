import Activities from "@/components/section/Activities";
import Certifications from "@/components/section/Certifications";
import Contributions from "@/components/section/Contributions";
import Divider from "@/components/Divider";
import Education from "@/components/section/Education";
import Info from "@/components/section/Info";
import Intro from "@/components/section/Intro";
import Profile from "@/components/section/Profile";
import Stack from "@/components/section/Stacks";
import type { Locale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Locale;

  return (
    <div className="flex flex-col gap-11">
      <Profile lang={lang} />
      <Divider />
      <Intro lang={lang} />
      <Divider />
      <Education lang={lang} />
      <Divider />
      <Activities lang={lang} />
      <Divider />
      <Certifications lang={lang} />
      <Divider />
      <Stack lang={lang} />
      <Divider />
      <Contributions lang={lang} />
      <Divider />
      <Info lang={lang} />
    </div>
  );
}
