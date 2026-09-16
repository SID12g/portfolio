import Separator from "@/components/Separator";
import Tag from "@/components/Tag";
import { stacks } from "@/data/stacks";

export default function Stacks() {
  return (
    <div>
      <Separator title="STACKS" />
      <div className="flex flex-row flex-wrap gap-3">
        {stacks.map((stack) => (
          <Tag key={stack} label={stack} />
        ))}
      </div>
    </div>
  );
}
