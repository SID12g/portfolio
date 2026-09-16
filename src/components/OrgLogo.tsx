import Image from "next/image";

// 기관 로고. 라이트 모드는 Figma 디자인 그대로 두고, 다크 모드에서는 흰색 둥근 타일 위에 올려
// 흰 배경 로고가 튀거나 어두운 색 로고가 배경에 묻히지 않도록 함 (눈부심을 줄이려 밝기를 약간 낮춤)
export default function OrgLogo({
  src,
  rounded = false,
}: {
  src: string;
  rounded?: boolean;
}) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center dark:rounded-xl dark:bg-white dark:p-1 dark:brightness-90">
      <Image
        src={src}
        alt=""
        width={40}
        height={40}
        className={`size-full object-contain ${rounded ? "rounded-full" : ""}`}
      />
    </span>
  );
}
