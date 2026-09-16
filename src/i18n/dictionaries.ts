import type { Locale } from "./config";

export interface IntroSegment {
  text: string;
  bold?: boolean;
  href?: string;
}

export const dictionaries = {
  ko: {
    nav: {
      contact: "연락하기",
    },
    sections: {
      intro: "인트로",
      education: "학력",
      activities: "활동",
      certifications: "자격증",
      stack: "스택",
      contributions: "기여",
      links: "링크",
    },
    profile: {
      name: "조성민",
      role: "Frontend Developer",
      viewProjects: "프로젝트 보기",
      goToBlog: "블로그로 이동",
    },
    education: {
      current: "재학 중",
    },
    activities: {
      current: "활동 중",
    },
    intro: {
      paragraphs: [
        [
          { text: "안녕하세요, " },
          { text: "프론트엔드 개발자 " },
          { text: "조성민", bold: true },
          { text: "입니다." },
        ],
        [
          {
            text: "고등학생 때부터 웹 개발에 관심을 가지며 배우기 시작했고, 현재는 ",
          },
          { text: "React", bold: true },
          { text: "와 " },
          { text: "Next.js", bold: true },
          {
            text: " 등의 웹 개발 프레임워크를 중심으로 프로덕트를 개발하고 있습니다. ",
          },
          { text: "React Native", bold: true },
          { text: ", " },
          { text: "Expo", bold: true },
          { text: " 등 앱 기술에도 관심을 가지고 있습니다." },
        ],
        [
          {
            text: "한국디지털미디어고등학교 웹프로그래밍과를 졸업해 현재 서울시립대학교 자연과학대학 통계학과에 재학 중이고, 통계학을 학습하며 앞으로 만들어갈 프로덕트를 위해 데이터를 읽고 해석하는 관점을 쌓아가고 있습니다. ",
          },
          { text: "개발과 통계학이 만나는 지점", bold: true },
          { text: "에서 무엇을 만들 수 있을지 계속 고민하고 있습니다." },
        ],
        [
          {
            text: "화면을 만드는 일은 결국 사용자의 경험을 설계하는 일",
            bold: true,
          },
          {
            text: "이라고 생각합니다. 그래서 고등학생 때부터 Figma를 학습하며 디자인을 함께 익혔고, 그 시각을 넓혀가고 있습니다. ",
          },
          {
            text: "Figma로 책을 만들어 본 경험",
            bold: true,
            href: "https://blog.sid12g.dev/figma-book",
          },
          { text: "도 있습니다." },
        ],
        [
          { text: "동시에 " },
          {
            text: "좋은 경험은 보이는 것만으로 완성되지 않는다고 생각",
            bold: true,
          },
          {
            text: "합니다. 아무리 잘 설계된 화면이라도 첫 화면이 늦게 뜨거나 입력에 반응이 느리면 사용자는 그 설계를 경험하기 전에 떠납니다. 그래서 렌더링 방식과 번들 크기, 불필요한 리렌더를 함께 신경 쓰며, 측정할 수 있는 지표로 개선을 확인하려 합니다.",
          },
        ],
        [
          {
            text: "여러 프로젝트에서 개발뿐 아니라 기획과 디자인까지 함께 맡아왔습니다. 덕분에 ",
          },
          { text: "프로덕트를 한쪽 면이 아니라 전체로 바라보는 시선", bold: true },
          { text: "을 갖게 되었습니다." },
        ],
      ] satisfies IntroSegment[][],
    },
    notFound: {
      title: "페이지를 찾을 수 없습니다",
      description: "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
      button: "홈으로 이동",
      countdown: (seconds: number) => `${seconds}초 후 홈으로 이동합니다`,
    },
    mediaPreview: {
      previous: "이전",
      next: "다음",
      copied: "복사됨",
      copyLink: "링크 복사",
      download: "다운로드",
      openNewTab: "새 탭에서 열기",
      close: "닫기",
      pdf: "PDF",
      link: "링크",
    },
    projectsPage: {
      metaDescription: "sid12g의 프로젝트 목록입니다.",
      breadcrumb: "포트폴리오",
      title: "프로젝트",
      all: "전체",
      assets: "자료",
    },
    footer: {
      languageName: "한국어",
    },
  },
  en: {
    nav: {
      contact: "Contact",
    },
    sections: {
      intro: "Intro",
      education: "Education",
      activities: "Activities",
      certifications: "Certifications",
      stack: "Stack",
      contributions: "Contributions",
      links: "Links",
    },
    profile: {
      name: "Sungmin Cho",
      role: "Frontend Developer",
      viewProjects: "View Projects",
      goToBlog: "Go to Blog",
    },
    education: {
      current: "Enrolled",
    },
    activities: {
      current: "Active",
    },
    intro: {
      paragraphs: [
        [
          { text: "Hello, I'm " },
          { text: "Sungmin Cho", bold: true },
          { text: ", a frontend developer." },
        ],
        [
          {
            text: "I first got interested in web development in high school, and I now build products mainly with ",
          },
          { text: "React", bold: true },
          { text: " and " },
          { text: "Next.js", bold: true },
          { text: ". I'm also interested in app development with " },
          { text: "React Native", bold: true },
          { text: " and " },
          { text: "Expo", bold: true },
          { text: "." },
        ],
        [
          {
            text: "I graduated from the Web Programming department at Korea Digital Media High School and am currently studying Statistics in the College of Natural Sciences at the University of Seoul, building a perspective for reading and interpreting data that I can bring to future products. I keep exploring what can be built at ",
          },
          { text: "the intersection of development and statistics", bold: true },
          { text: "." },
        ],
        [
          {
            text: "Building a screen is ultimately about designing a user's experience",
            bold: true,
          },
          {
            text: ", I believe. That's why I've studied Figma alongside development since high school, and I keep broadening that perspective. I even ",
          },
          {
            text: "made a book using Figma",
            bold: true,
            href: "https://blog.sid12g.dev/figma-book",
          },
          { text: "." },
        ],
        [
          { text: "At the same time, I don't think " },
          {
            text: "a good experience is complete just because it looks good",
            bold: true,
          },
          {
            text: ". However well a screen is designed, if the first paint is slow or input feels laggy, users leave before they ever experience that design. So I pay close attention to rendering strategy, bundle size, and unnecessary re-renders, and confirm improvements with measurable metrics.",
          },
        ],
        [
          {
            text: "Across many projects I've handled not only development but also planning and design. That's given me ",
          },
          {
            text: "a perspective that looks at a product as a whole, not just one side of it",
            bold: true,
          },
          { text: "." },
        ],
      ] satisfies IntroSegment[][],
    },
    notFound: {
      title: "Page not found",
      description: "The page you requested doesn't exist or has been moved.",
      button: "Go Home",
      countdown: (seconds: number) => `Redirecting to home in ${seconds}s`,
    },
    mediaPreview: {
      previous: "Previous",
      next: "Next",
      copied: "Copied",
      copyLink: "Copy Link",
      download: "Download",
      openNewTab: "Open in New Tab",
      close: "Close",
      pdf: "PDF",
      link: "Link",
    },
    projectsPage: {
      metaDescription: "A list of sid12g's projects.",
      breadcrumb: "Portfolio",
      title: "Projects",
      all: "All",
      assets: "Assets",
    },
    footer: {
      languageName: "English",
    },
  },
} satisfies Record<Locale, unknown>;

export function getDictionary(lang: Locale) {
  return dictionaries[lang];
}
