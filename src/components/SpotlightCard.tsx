import { useRef, useState, MouseEvent, HTMLAttributes, ReactNode } from "react";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  id?: string;
  className?: string;
  glowColor?: string; // e.g. "rgba(59, 130, 246, 0.15)"
  onClick?: (e: any) => void;
  key?: any;
}

export default function SpotlightCard({
  children,
  id,
  className = "",
  glowColor = "rgba(6, 182, 212, 0.15)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative overflow-hidden rounded-2xl bg-slate-900/45 p-6 border border-slate-800/80 transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Radial glow background tracking mouse */}
      {isFocused && (
        <div
          className="pointer-events-none absolute -inset-px transition duration-300"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Decorative inner light reflection */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
