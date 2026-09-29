import { PencilRuler, Laptop } from "lucide-react";
import { Container } from "@/components/ui/Container";

/* ══════════════════════════════════════════════════════
   IconTile — lime circle with an icon inside
   Pass a lucide component via `icon` or raw SVG via `svg`.
   Swap any icon later with a one-line change.
   ══════════════════════════════════════════════════════ */

interface IconTileProps {
  /** Lucide icon component */
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  /** Custom SVG element (overrides `icon`) */
  svg?: React.ReactNode;
  label: string;
}

function IconTile({ icon: Icon, svg, label }: IconTileProps) {
  return (
    <div
      className="
        group flex flex-col items-center gap-4 rounded-[14px] border border-card-border
        bg-white px-4 py-7
        transition-all duration-200
        hover:border-lime hover:-translate-y-1
      "
    >
      {/* Lime circle */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime">
        {svg ??
          (Icon ? (
            <Icon size={26} strokeWidth={2} className="text-ink" />
          ) : null)}
      </div>

      {/* Label */}
      <span
        className="text-[15px] font-medium text-ink"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Custom SVG Icons ── */

/** Design — crossed ruler + pencil (X shape) */
// PencilRuler from lucide is an excellent match

/** Development — smartphone with two curved refresh arrows */
function DevIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-ink"
      aria-hidden="true"
    >
      {/* Phone body */}
      <rect x="8" y="5" width="8" height="14" rx="1.5" />
      {/* Screen line */}
      <line x1="10" y1="7" x2="14" y2="7" strokeWidth="1.5" />
      {/* Top curved arrow (clockwise, going right) */}
      <path d="M16.5 8 a5 5 0 0 1 0 8" />
      <polyline points="16.5 16 16.5 13.5 19 15.5" strokeWidth="1.5" />
      {/* Bottom curved arrow (counter-clockwise, going left) */}
      <path d="M7.5 16 a5 5 0 0 1 0 -8" />
      <polyline points="7.5 8 7.5 10.5 5 8.5" strokeWidth="1.5" />
    </svg>
  );
}

/** Business — building/office with grid windows */
function BusinessIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-ink"
      aria-hidden="true"
    >
      {/* Main building */}
      <rect x="3" y="3" width="13" height="18" rx="1" />
      {/* Side wing */}
      <path d="M16 10h4a1 1 0 0 1 1 1v10H16" />
      {/* Windows - top row */}
      <rect x="6" y="6" width="2.5" height="2" rx="0.3" fill="currentColor" />
      <rect x="10.5" y="6" width="2.5" height="2" rx="0.3" fill="currentColor" />
      {/* Windows - middle row */}
      <rect x="6" y="10.5" width="2.5" height="2" rx="0.3" fill="currentColor" />
      <rect x="10.5" y="10.5" width="2.5" height="2" rx="0.3" fill="currentColor" />
      {/* Side building windows */}
      <rect x="18" y="13" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="18" y="16.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
      {/* Door */}
      <rect x="8" y="16" width="3" height="5" rx="0.5" />
    </svg>
  );
}

/** Marketing — megaphone with radiating signal dots */
function MarketingIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-ink"
      aria-hidden="true"
    >
      {/* Megaphone body */}
      <path d="M11 6a13 13 0 0 0 8.4 -2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
      <path d="M8 6v8" />
      {/* Handle */}
      <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
      {/* Signal dots */}
      <circle cx="2" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="2.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="1.5" cy="1.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Photography — camera with portrait silhouette inside */
function PhotographyIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-ink"
      aria-hidden="true"
    >
      {/* Camera body */}
      <path d="M14 4a2 2 0 0 1 1.76 1.05l.49.9A2 2 0 0 0 18 7h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2a2 2 0 0 0 1.76-1.05l.49-.9A2 2 0 0 1 10 4z" />
      {/* Person silhouette (head + shoulders) instead of lens circle */}
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <path
        d="M8.5 18 c0-2 1.6-3.2 3.5-3.2s3.5 1.2 3.5 3.2"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/* ── Card data ── */
const PATHS: IconTileProps[] = [
  { label: "Design", icon: PencilRuler },
  { label: "Development", svg: <DevIcon /> },
  { label: "IT & Software", icon: Laptop },
  { label: "Business", svg: <BusinessIcon /> },
  { label: "Marketing", svg: <MarketingIcon /> },
  { label: "Photography", svg: <PhotographyIcon /> },
];

/* ── Section ── */
export function LearningPaths() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        {/* ── Heading ── */}
        <div className="mx-auto max-w-[700px] text-center">
          <h2
            className="text-ink text-[28px] sm:text-[32px] lg:text-[34px] font-bold leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Explore Diverse Learning Paths at Bytespace
          </h2>
          <p
            className="mt-4 text-muted text-[15px] sm:text-[16px] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            At Bytespace, we believe in empowering individuals through knowledge.
            Our diverse range of courses spans various fields, ensuring
            there&rsquo;s something for everyone. Unleash your potential and
            explore our carefully curated categories.
          </p>
        </div>

        {/* ── Icon Grid ── */}
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {PATHS.map((p) => (
            <IconTile key={p.label} {...p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
