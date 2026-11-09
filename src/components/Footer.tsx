import Divider from "@/components/Divider";
import FooterIcon, { footerIconLinkClass } from "@/components/FooterIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { localizePath, type Locale } from "@/i18n/config";

export default function Footer({ lang }: { lang: Locale }) {
  const year = new Date().getFullYear();
  const links = [
    { label: "GitHub", href: "https://github.com/SID12g", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/sid12g",
      icon: "linkedin",
    },
    { label: "Resume", href: localizePath(lang, "/resume"), icon: "file" },
  ];

  return (
    <footer className="flex flex-col gap-5">
      <Divider />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm leading-none text-secondary">
          © {year} sid12g - Sungmin Cho
        </p>
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className={footerIconLinkClass}
            >
              <FooterIcon name={link.icon} />
            </a>
          ))}
          <LanguageSwitcher lang={lang} />
        </div>
      </div>
    </footer>
  );
}
