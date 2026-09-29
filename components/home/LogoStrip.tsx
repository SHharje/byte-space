import { Waves, Sun, Zap, Wind, Radar } from "lucide-react";
import { Container } from "@/components/ui/Container";

/* ── Icon-in-circle wrappers ── */

/** Thin outlined circle with a stroke-style icon inside */
function OutlineCircle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#6B7280]"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

/** Solid filled dark-gray circle with a white icon inside */
function FilledCircle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#6B7280]"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

/* ── Logo lockup data ── */
const LOGOS = [
  {
    name: "Waves",
    icon: (
      <OutlineCircle>
        <Waves size={15} strokeWidth={2} className="text-[#6B7280]" />
      </OutlineCircle>
    ),
  },
  {
    name: "Sunburst",
    icon: (
      <OutlineCircle>
        <Sun size={15} strokeWidth={2} className="text-[#6B7280]" />
      </OutlineCircle>
    ),
  },
  {
    name: "Lightning Bolt",
    icon: (
      <FilledCircle>
        <Zap size={14} strokeWidth={0} fill="white" className="text-white" />
      </FilledCircle>
    ),
  },
  {
    name: "Wind",
    icon: (
      <OutlineCircle>
        <Wind size={15} strokeWidth={2} className="text-[#6B7280]" />
      </OutlineCircle>
    ),
  },
  {
    name: "Radar",
    icon: (
      <FilledCircle>
        <Radar size={15} strokeWidth={2} className="text-white" />
      </FilledCircle>
    ),
  },
];

export function LogoStrip() {
  return (
    <section
      className="w-full bg-[#F4F4F5] py-10"
      aria-label="Trusted by companies"
    >
      <Container>
        {/*
          Layout decision:
          The reference (Frame_2.png) features evenly distributed logos centered with ~64px gap
          rather than edge-to-edge space-between across the 1200px container width.
          Mobile (<640px): horizontal scroll-snap with hidden scrollbar.
        */}
        <div
          className="
            flex items-center
            justify-center gap-12 md:gap-14 lg:gap-16
            max-sm:justify-start max-sm:gap-8
            max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory
            max-sm:-mx-4 max-sm:px-4
            scrollbar-none
          "
        >
          {LOGOS.map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2.5 max-sm:snap-start"
            >
              {logo.icon}
              <span
                className="text-[19px] font-medium text-[#6B7280] tracking-tight select-none"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Logoipsum
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
