export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={`${className} aspect-square w-[40px] animate-spin self-center rounded-[50%] border-4 border-b-orange-400 border-t-orange-400`}></div>
  );
}
