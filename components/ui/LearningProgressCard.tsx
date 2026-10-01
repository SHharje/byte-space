"use client";

import { useEffect, useState } from "react";

interface LearningProgressCardProps {
  value?: number;
  className?: string;
}

export function LearningProgressCard({
  value = 55,
  className = "",
}: LearningProgressCardProps) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    // Triggers smooth width animation when the component mounts / tab activates
    const timer = setTimeout(() => {
      setFilled(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`rounded-[14px] border border-card-border bg-white p-6 shadow-xs ${className}`}
      aria-label={`Learning progress: ${value}%`}
    >
      <p
        className="text-[14px] font-medium text-ink leading-none"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Learning Progress
      </p>
      <p
        className="mt-2 text-[40px] font-bold leading-none text-ink tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {value}%
      </p>
      <div
        className="mt-3.5 h-2 w-full rounded-full bg-[#EEF0F3] overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-lime transition-all duration-1000 ease-out"
          style={{
            width: filled ? `${value}%` : "0%",
          }}
        />
      </div>
    </div>
  );
}
