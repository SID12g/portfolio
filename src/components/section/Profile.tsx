import Image from "next/image";
import ProfileImage from "@/../public/images/profile.png";
import type { Locale } from "@/i18n/config";

const nameByLang: Record<Locale, string> = {
  ko: "조성민",
  en: "Sungmin Cho",
};

export default function Profile({ lang }: { lang: Locale }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-[4px]">
        <h3 className="text-2xl sm:text-3xl font-semibold">
          {nameByLang[lang]}
        </h3>
        <p className="text-base sm:text-xl text-muted font-normal">Frontend Developer</p>
      </div>
      <div className="w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] rounded-full overflow-hidden">
        <Image
          src={ProfileImage}
          alt="Profile Image"
          width={512}
          height={512}
        />
      </div>
    </div>
  );
}
