export default function Profile() {
  return (
    <div className="flex w-full flex-col gap-3">
      <h1 className="flex flex-wrap gap-x-2 text-lg leading-[1.2] text-primary">
        <span className="font-mono font-semibold">Sungmin Cho</span>
        <span className="font-medium">(조성민)</span>
      </h1>
      <p className="font-mono text-sm leading-[1.2] font-medium text-secondary">
        Frontend Developer
      </p>
    </div>
  );
}
