import type { CSSProperties } from "react";

// public/icons/*.svg는 Figma에서 내보낸 원본 에셋입니다.
// SVG를 마스크로 사용해 모양은 원본 그대로, 색상은 currentColor(텍스트 색)를 따르게 해
// 다크 모드와 호버 상태에서도 색이 자연스럽게 바뀌도록 합니다.
interface IconProps {
  className?: string;
}

function Icon({ src, className = "" }: IconProps & { src: string }) {
  const style: CSSProperties = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
  };
  return <span aria-hidden="true" style={style} className={`icon ${className}`} />;
}

export const ArrowUpRightIcon = ({ className }: IconProps) => (
  <Icon src="/icons/arrow-up-right.svg" className={className} />
);

export const ArrowUpRight16Icon = ({ className }: IconProps) => (
  <Icon src="/icons/arrow-up-right-16.svg" className={className} />
);

export const ArrowLeftIcon = ({ className }: IconProps) => (
  <Icon src="/icons/arrow-left.svg" className={className} />
);

export const CodeIcon = ({ className }: IconProps) => (
  <Icon src="/icons/code.svg" className={className} />
);

export const CalendarIcon = ({ className }: IconProps) => (
  <Icon src="/icons/calendar.svg" className={className} />
);

export const UsersIcon = ({ className }: IconProps) => (
  <Icon src="/icons/users.svg" className={className} />
);

export const GitPullRequestIcon = ({ className }: IconProps) => (
  <Icon src="/icons/git-pull-request.svg" className={className} />
);

export const GlobeIcon = ({ className }: IconProps) => (
  <Icon src="/icons/globe.svg" className={className} />
);

export const FileIcon = ({ className }: IconProps) => (
  <Icon src="/icons/file.svg" className={className} />
);

export const MailIcon = ({ className }: IconProps) => (
  <Icon src="/icons/mail.svg" className={className} />
);

export const GitHubIcon = ({ className }: IconProps) => (
  <Icon src="/icons/github.svg" className={className} />
);
