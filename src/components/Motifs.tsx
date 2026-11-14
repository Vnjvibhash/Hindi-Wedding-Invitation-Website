import React from "react";

// Shree Ganesh Motif
export const GaneshMotif: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    role="img"
  >
    {/* Tilak and Trishul Crown */}
    <path d="M50 8 C48 12 45 14 45 18 C45 22 48 24 50 24 C52 24 55 22 55 18 C55 14 52 12 50 8 Z" fill="#e8741a" />
    <path d="M42 16 C42 19 44 21 46 22 L46 12 C44 13 42 14 42 16 Z" fill="#c8962b" />
    <path d="M58 16 C58 19 56 21 54 22 L54 12 C56 13 58 14 58 16 Z" fill="#c8962b" />
    {/* Forehead / Mukut */}
    <path d="M38 24 Q50 20 62 24 Q65 28 60 30 Q50 27 40 30 Q35 28 38 24 Z" fill="#c8962b" />
    <circle cx="50" cy="27" r="2.5" fill="#8a1c3c" />
    {/* Ears */}
    <path d="M37 28 C26 26 20 35 23 48 C25 56 32 60 38 57 C36 48 36 38 37 28 Z" fill="currentColor" opacity="0.9" />
    <path d="M63 28 C74 26 80 35 77 48 C75 56 68 60 62 57 C64 48 64 38 63 28 Z" fill="currentColor" opacity="0.9" />
    {/* Eyes */}
    <ellipse cx="43" cy="36" rx="2.5" ry="1.5" fill="#8a1c3c" />
    <ellipse cx="57" cy="36" rx="2.5" ry="1.5" fill="#8a1c3c" />
    {/* Trunk */}
    <path
      d="M46 38 C46 48 44 56 46 64 C48 72 54 75 60 74 C66 73 68 68 67 64 C66 60 62 61 62 64 C62 67 59 69 55 68 C51 67 49 61 49 54 C49 46 51 42 54 38 Z"
      fill="currentColor"
    />
    {/* Modak in hand */}
    <path d="M68 56 C70 52 74 52 75 56 C76 60 72 63 68 61 Z" fill="#e8741a" />
    <circle cx="72" cy="56" r="3" fill="#c8962b" />
  </svg>
);

// Mangal Kalash Motif with Coconut & Mango leaves
export const KalashMotif: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg
    viewBox="0 0 80 80"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    role="img"
  >
    {/* Coconut */}
    <path d="M40 10 C32 18 34 26 40 30 C46 26 48 18 40 10 Z" fill="#903614" />
    {/* Mango Leaves */}
    <path d="M40 26 C28 20 22 14 20 8 C26 12 34 18 38 25 Z" fill="#0d9488" />
    <path d="M40 26 C52 20 58 14 60 8 C54 12 46 18 42 25 Z" fill="#0d9488" />
    <path d="M40 26 C35 15 32 8 30 2 C36 8 40 16 40 26 Z" fill="#0f766e" />
    <path d="M40 26 C45 15 48 8 50 2 C44 8 40 16 40 26 Z" fill="#0f766e" />
    {/* Kalash Neck */}
    <ellipse cx="40" cy="30" rx="14" ry="4" fill="#c8962b" />
    {/* Swastik / Tilak on Pot */}
    <path
      d="M26 34 C24 45 22 58 30 66 C34 70 46 70 50 66 C58 58 56 45 54 34 Z"
      fill="#8a1c3c"
    />
    {/* Golden bands */}
    <path d="M26 40 Q40 46 54 40" stroke="#c8962b" strokeWidth="2" fill="none" />
    <path d="M25 50 Q40 56 55 50" stroke="#c8962b" strokeWidth="2" fill="none" />
    <circle cx="40" cy="50" r="3" fill="#e8741a" />
    {/* Base */}
    <ellipse cx="40" cy="68" rx="10" ry="3" fill="#c8962b" />
  </svg>
);

// Traditional Diya (Oil Lamp with Flame)
export const DiyaMotif: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    role="img"
  >
    {/* Outer Glow */}
    <circle cx="32" cy="18" r="14" fill="#e8741a" opacity="0.18" className="animate-pulse" />
    {/* Outer Flame */}
    <path
      d="M32 4 C32 4 23 18 24 24 C25 29 28 32 32 32 C36 32 39 29 40 24 C41 18 32 4 32 4 Z"
      fill="#e8741a"
    />
    {/* Inner Flame (Gold) */}
    <path
      d="M32 10 C32 10 26 20 27 24 C28 27 30 28 32 28 C34 28 36 27 37 24 C38 20 32 10 32 10 Z"
      fill="#c8962b"
    />
    {/* Flame Center (Bright Core) */}
    <ellipse cx="32" cy="24" rx="2" ry="3.5" fill="#fffdfa" />
    {/* Diya Clay Pot Base */}
    <path
      d="M12 34 C16 48 48 48 52 34 C54 30 52 28 47 30 C39 33 25 33 17 30 C12 28 10 30 12 34 Z"
      fill="#8a1c3c"
    />
    <path
      d="M16 33 Q32 39 48 33"
      stroke="#c8962b"
      strokeWidth="2"
      fill="none"
    />
    {/* Stand */}
    <path d="M26 47 L38 47 L41 53 L23 53 Z" fill="#c8962b" />
  </svg>
);

// Marigold Flower Motif (Genda Phool)
export const MarigoldMotif: React.FC<{ className?: string; size?: number }> = ({
  className = "w-8 h-8",
  size = 48,
}) => (
  <svg
    viewBox="0 0 60 60"
    width={size}
    height={size}
    aria-hidden="true"
    className={className}
    role="img"
  >
    <g transform="translate(30, 30)">
      {/* Outer Petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-20"
          rx="6"
          ry="10"
          fill="#e8741a"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Mid Petals */}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-14"
          rx="5"
          ry="8"
          fill="#c8962b"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Inner Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <circle
          key={deg}
          cx="0"
          cy="-8"
          r="4"
          fill="#e8741a"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Center Core */}
      <circle cx="0" cy="0" r="5" fill="#8a1c3c" />
      <circle cx="0" cy="0" r="2.5" fill="#c8962b" />
    </g>
  </svg>
);

// Traditional Paisley / Kalka Motif
export const PaisleyMotif: React.FC<{ className?: string; flip?: boolean }> = ({
  className = "w-10 h-10",
  flip = false,
}) => (
  <svg
    viewBox="0 0 80 100"
    fill="currentColor"
    aria-hidden="true"
    className={`${className} ${flip ? "-scale-x-100" : ""}`}
    role="img"
  >
    {/* Paisley Body */}
    <path
      d="M40 90 C18 90 8 72 8 50 C8 28 28 14 42 6 C40 18 48 24 54 22 C62 20 62 10 52 4 C64 6 74 18 74 34 C74 46 66 54 58 58 C68 64 72 74 68 82 C62 90 52 90 40 90 Z"
      fill="#c8962b"
      opacity="0.85"
    />
    {/* Inner decorative cutout */}
    <path
      d="M38 78 C24 78 18 64 18 48 C18 36 28 26 38 18 C36 26 42 30 46 28 C42 38 48 44 48 52 C48 68 44 78 38 78 Z"
      fill="#8a1c3c"
    />
    <circle cx="36" cy="50" r="4" fill="#e8741a" />
    <circle cx="34" cy="62" r="3" fill="#c8962b" />
    <circle cx="38" cy="38" r="2.5" fill="#c8962b" />
  </svg>
);

// Marigold Garland Border
export const MarigoldGarland: React.FC<{ className?: string }> = ({ className = "w-full" }) => (
  <div className={`flex items-center justify-center overflow-hidden py-1 ${className}`}>
    <div className="flex items-center gap-1.5 sm:gap-3 flex-nowrap animate-pulse-slow">
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="flex items-center">
          <MarigoldMotif size={i % 2 === 0 ? 22 : 18} className="drop-shadow-sm" />
          {i % 3 === 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mx-0.5" />
          )}
        </div>
      ))}
    </div>
  </div>
);

// Ornamental Floral Section Divider with Kalash or Diya in center
export const OrnamentalDivider: React.FC<{
  title?: string;
  icon?: "kalash" | "diya" | "ganesh" | "marigold";
  className?: string;
}> = ({ title, icon = "kalash", className = "my-6" }) => (
  <div className={`flex items-center justify-center gap-3 w-full max-w-xl mx-auto ${className}`}>
    <div className="flex-1 flex items-center">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold-400 to-gold-500" />
      <PaisleyMotif className="w-5 h-6 text-gold-500 -mr-1 hidden sm:block" />
    </div>

    <div className="flex items-center gap-2 px-2">
      {icon === "kalash" && <KalashMotif className="w-8 h-8 text-gold-500" />}
      {icon === "diya" && <DiyaMotif className="w-8 h-8 text-saffron-500" />}
      {icon === "ganesh" && <GaneshMotif className="w-8 h-8 text-maroon-700 dark:text-gold-400" />}
      {icon === "marigold" && <MarigoldMotif size={28} className="text-saffron-500" />}
      {title && (
        <span className="font-heading text-lg sm:text-xl font-bold text-maroon-800 dark:text-gold-300 tracking-wide">
          {title}
        </span>
      )}
    </div>

    <div className="flex-1 flex items-center">
      <PaisleyMotif className="w-5 h-6 text-gold-500 -ml-1 hidden sm:block" flip />
      <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-gold-400 to-gold-500" />
    </div>
  </div>
);

// Mandap Corner Ornamental Frame for Cards
export const CardCornerMotif: React.FC<{
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}> = ({ position }) => {
  const classes = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180",
    "bottom-left": "bottom-0 left-0 -rotate-90",
  }[position];

  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={`absolute w-7 h-7 sm:w-9 sm:h-9 text-gold-500/70 pointer-events-none ${classes}`}
    >
      <path
        d="M2 2 L2 24 Q6 16 16 16 Q24 16 24 2 L2 2 Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M2 38 L2 2 L38 2"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      <circle cx="6" cy="6" r="2.5" fill="#8a1c3c" />
      <circle cx="14" cy="6" r="1.5" fill="#e8741a" />
      <circle cx="6" cy="14" r="1.5" fill="#e8741a" />
    </svg>
  );
};

// Shehnai & Dholak traditional musical motif
export const MusicalMotif: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    role="img"
  >
    {/* Shehnai pipe */}
    <path
      d="M12 12 L44 38 L48 35 L14 8 Z"
      fill="#c8962b"
    />
    {/* Shehnai bell flare */}
    <path
      d="M44 38 Q56 46 58 54 Q48 54 44 38 Z"
      fill="#e8741a"
    />
    <circle cx="53" cy="50" r="3" fill="#8a1c3c" />
    {/* Finger holes */}
    <circle cx="22" cy="19" r="1" fill="#8a1c3c" />
    <circle cx="28" cy="24" r="1" fill="#8a1c3c" />
    <circle cx="34" cy="29" r="1" fill="#8a1c3c" />
    <circle cx="40" cy="34" r="1" fill="#8a1c3c" />
  </svg>
);
