export interface ContributionItem {
  repository: string;
  title: string;
  href: string;
  date: string;
}

export const contributions: ContributionItem[] = [
  {
    repository: "toss/suspensive",
    title:
      "docs(suspensive.org): add punctuation marks to a document #1168",
    href: "https://github.com/toss/suspensive/pull/1168",
    date: "2024-08-01",
  },
  {
    repository: "toss/suspensive",
    title:
      "docs(suspensive.org): modify punctuation marks and spaces in the document #1179",
    href: "https://github.com/toss/suspensive/pull/1179",
    date: "2024-08-03",
  },
  {
    repository: "shuding/nextra",
    title: "docs: fix meta tag theme color #3214",
    href: "https://github.com/shuding/nextra/pull/3214",
    date: "2024-09-09",
  },
];
