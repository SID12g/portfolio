import { redirect } from "next/navigation";

export default async function Resume({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  if ((await params).lang === "en") {
    redirect(
      "https://drive.google.com/file/d/1koB97tCYispWp8DfKJWuYFWIKkbRcm3i/view?usp=sharing",
    );
  } else {
    redirect(
      "https://drive.google.com/file/d/1h5CyQFuVjlpp5GRi-YgNBx0Q0RFtakdg/view?usp=sharing",
    );
  }
}
