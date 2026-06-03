export function FlavorWheel({ notes }: { notes: string[] }) {
  return (
    <div className="relative mx-auto grid aspect-square w-52 place-items-center rounded-full border border-brand-gold/40 bg-brand-cream">
      <div className="absolute inset-4 rounded-full border border-brand-forest/15" />
      <div className="absolute inset-12 rounded-full bg-brand-forest text-white" />
      {notes.map((note, index) => {
        const angle = (360 / notes.length) * index - 90;
        return (
          <span
            key={note}
            className="absolute rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-forest shadow"
            style={{
              transform: `rotate(${angle}deg) translate(82px) rotate(${-angle}deg)`
            }}
          >
            {note}
          </span>
        );
      })}
      <span className="relative z-10 text-center font-display text-lg leading-tight text-brand-accent">Flavor<br />Wheel</span>
    </div>
  );
}
