import Image from "next/image";

export const footerIconLinkClass =
  "-m-1 block p-1 transition-opacity duration-150 hover:opacity-60";

// 아이콘은 Figma에서 내보낸 원본 색상 그대로 표시하고, 다크 모드에서는 반전해 배경 위에서 보이도록 함
export default function FooterIcon({ name }: { name: string }) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt=""
      width={16}
      height={16}
      className="size-4 dark:invert"
    />
  );
}
