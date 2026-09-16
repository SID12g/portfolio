import type { Locale } from "./config";

export const dictionaries = {
  ko: {
    common: {
      more: "더보기 →",
    },
    education: {
      current: "재학 중",
    },
    activities: {
      current: "활동 중",
    },
    intro: {
      paragraphs: [
        "저는 한국디지털미디어고등학교 웹프로그래밍과를 졸업하고 서울시립대학교 통계학과에서 학업과 개발을 병행하며 꾸준히 성장하고 있는 주니어 개발자입니다.",
        "개발과 경제 · 금융 분야에 큰 관심을 가지고 있어 해당 분야와 관련된 책과 기사를 많이 접하며, 주변 분들과 이야기를 나누는 것을 좋아합니다. 최근에는 투자 및 자산관리에 대해 관심을 가지고 있어, 많은 분들께 제가 가지고 있는 경제 · 금융 분야에 대한 접근법에 대해 이야기하며, 생각을 넓혀나가고 있습니다.",
        "개발 프레임워크로는 Next.js와 React Native를 자주 사용합니다. 고등학생 시절 웹프로그래밍을 처음 접하며 전문적인 전공 수업을 통해 React를 익혔고, 더 나아가 Next.js와 React Native도 학습하였습니다. 프론트엔드 뿐 아니라 개발 및 IT 전반에 관심을 가지고 있으며, Nest.js와 Spring Boot 등 백엔드 프레임워크에도 관심을 가지고 있습니다.",
        "고등학생 시절부터 여러 프로젝트를 진행하며 협업 능력을 길러왔습니다. 프로덕트에 대해 개발 뿐 아니라 기획, 디자인 등 전반에 대해 다루어왔고, 덕분에 프로덕트를 바라볼 때 더욱 성숙한 시선으로 바라볼 수 있게 되었습니다.",
      ],
      figma:
        "특히 Figma를 통한 UI/UX 디자인에 큰 관심을 가지고 있으며, 개발자로서 좋은 UX를 위한 디자인을 이해하고 실행할 수 있어야 한다고 생각하여 Figma 또한 고등학생 당시부터 학습해 왔으며, 대학교에서도 웹디자인 수업을 수강하며 이러한 시각을 더욱 넓혀가고 있습니다. 고등학생 때 피그마를 사용하여 책을 만든 경험도 가지고 있습니다.",
      learnMore: "(자세히 보기)",
      closing:
        "그리고 현재, 통계학과에 재학하며 통계학을 학습하며, 개발과 통계학이 어떻게 잘 조화를 이룰 수 있을지 고민하고, 새로운 학습을 바탕으로 새로운 프로덕트를 개발해나가고 있습니다.",
    },
    notFound: {
      label: "404 Not Found",
      title: "페이지를 찾을 수 없습니다",
      description: "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
      button: "홈으로 이동 →",
      countdown: (seconds: number) => `${seconds}초 후 자동으로 이동합니다`,
    },
    mediaPreview: {
      viewDetails: "자세히 보기",
      previous: "이전",
      next: "다음",
      copied: "복사됨",
      copyLink: "링크 복사",
      download: "다운로드",
      openNewTab: "새 탭에서 열기",
      close: "닫기",
      goToLink: "링크 이동하기 ↗",
    },
    projectsPage: {
      metaDescription: "sid12g의 프로젝트 목록입니다.",
    },
    posts: {
      loadError: "포스트를 불러오는데 실패했습니다.",
    },
  },
  en: {
    common: {
      more: "More →",
    },
    education: {
      current: "Enrolled",
    },
    activities: {
      current: "Active",
    },
    intro: {
      paragraphs: [
        "I'm a junior developer who majored in web programming at Korea Digital Media High School. I’m now pursuing my ongoing interests in development projects along with my studies in Statistics at the University of Seoul.",
        "I have been dedicated to economics and finance as well, as I get to read books and articles regarding these topics and discuss them with colleagues. Lately I've been interested in investment and asset management. Sharing my perspective on those fields with others has let me effectively deepen my thinking.",
        "I frequently utilize Next.js and React Native. My first encounter with web development was in high school, where I learned React through specialized coursework and acquired skills in Next.js and React Native as well. Beyond just frontend fields, I'm pursuing my passion for development and IT as a whole, including backend frameworks like Nest.js and Spring Boot.",
        "Since high school, I've worked on multiple projects and built up my collaboration skills. I've handled not just development but also planning, design, and other aspects of building products, which has provided a more mature perspective when looking at a product as a whole.",
      ],
      figma:
        "When it comes to fields of design, I'm especially interested in UI/UX design with Figma. As I believe that developers should be able to understand and execute their own design for good UX, I've been learning Figma myself since high school, and I’m continuing to expand my viewpoint by taking web design courses in university. One of my significant experiences here was making a book using Figma back in high school. ",
      learnMore: "(Learn more)",
      closing:
        "Right now, majoring in Statistics, I'm studying it while constantly wondering how my development work could evolve when combined with it. Building new products based on what I learn is what drives me.",
    },
    notFound: {
      label: "404 Not Found",
      title: "Page Not Found",
      description: "The page you requested doesn't exist or has been moved.",
      button: "Go Home →",
      countdown: (seconds: number) =>
        `Redirecting automatically in ${seconds}s`,
    },
    mediaPreview: {
      viewDetails: "View Details",
      previous: "Previous",
      next: "Next",
      copied: "Copied",
      copyLink: "Copy Link",
      download: "Download",
      openNewTab: "Open in New Tab",
      close: "Close",
      goToLink: "Go to Link ↗",
    },
    projectsPage: {
      metaDescription: "A list of sid12g's projects.",
    },
    posts: {
      loadError: "Failed to load posts.",
    },
  },
} satisfies Record<Locale, unknown>;

export function getDictionary(lang: Locale) {
  return dictionaries[lang];
}
