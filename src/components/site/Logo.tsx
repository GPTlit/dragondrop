import dragonMark from "@/assets/dragon-logo.png";

export function Logo({ className = "", showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={dragonMark}
        alt="DRAG-N-DROP dragon logo"
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
      />
      {showWordmark && (
        <span className="font-display text-[17px] font-semibold tracking-tight">
          DRAG<span className="text-primary">-N-</span>DROP
        </span>
      )}
    </div>
  );
}
