export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 rounded-lg bg-foreground" />
        <div className="absolute inset-[3px] rounded-[6px] bg-background" />
        <div className="absolute left-[7px] top-[7px] h-2.5 w-2.5 rounded-sm bg-primary" />
        <div className="absolute bottom-[6px] right-[6px] h-3 w-3 rounded-sm border-2 border-dashed border-foreground" />
      </div>
      <span className="font-display text-[17px] font-semibold tracking-tight">
        DRAG<span className="text-primary">-N-</span>DROP
      </span>
    </div>
  );
}
