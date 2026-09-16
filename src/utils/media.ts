export type AssetType = "image" | "video" | "pdf" | "link" | "other";

const IMAGE_EXTS = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg"]);
const VIDEO_EXTS = new Set(["mp4", "webm", "mov", "avi"]);

// 파일 이름(또는 경로)의 확장자로 에셋 종류를 판별
export function getAssetType(file: string): AssetType {
  const ext = file.split(".").pop()?.toLowerCase() ?? "";
  if (IMAGE_EXTS.has(ext)) return "image";
  if (VIDEO_EXTS.has(ext)) return "video";
  if (ext === "pdf") return "pdf";
  return "other";
}
