export function StrengthMeter({ value }: { value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-semibold">
        <span>Tea Strength</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-brand-forest/10">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-gold via-brand-ember to-brand-forest" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
