"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import { GridBackground } from "@/components/ui/GridBackground";
import { Button } from "@/components/ui/Button";
import type { Creator } from "@/data/creators";

/* ── Small Reusable InfoBadge Component ── */
interface InfoBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function InfoBadge({ children, className = "" }: InfoBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-white px-[18px] py-[10px] text-[15px] font-medium text-ink shadow-sm ${className}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {children}
    </div>
  );
}

interface CreatorHeroProps {
  creator: Creator;
}

export function CreatorHero({ creator }: CreatorHeroProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    // Optimistic UI state toggle — real follow/auth wiring needed later when backend is integrated.
    setIsFollowing((prev) => !prev);
  };

  return (
    <section className="relative overflow-hidden bg-brand-blue pb-14 sm:pb-16">
      {/* ── Reused Faint Grid Background ── */}
      <GridBackground />

      {/* ── Shared Navbar (automatically highlights 'Creators' on this route) ── */}
      <div className="relative z-20 mx-auto max-w-[1440px]">
        <Navbar variant="light" />
      </div>

      {/* ── Main Content Container (Aligned with Navbar) ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-[60px] pt-10 sm:pt-[50px]">
        {/* ── Top Row: Avatar + Name Block (~70px below navbar links, gap ~22px) ── */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-[22px]">
          {/* Avatar: ~90px, rounded-2xl (squircle radius ~20px, not circle) */}
          <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden rounded-[20px] shadow-md bg-white/10">
            <Image
              src={creator.avatar}
              alt={creator.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Name + Badge + Tagline */}
          <div className="flex-1 min-w-0">
            {/* Name + Lime Pill Badge Row */}
            <div className="flex flex-wrap items-center gap-[14px]">
              <h1
                className="text-white text-[26px] sm:text-[28px] md:text-[30px] font-bold leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {creator.name}
              </h1>

              {/* Small Active-Style Lime Pill Badge */}
              <span
                className="inline-flex items-center justify-center rounded-full bg-lime px-4 py-1.5 text-[14px] font-medium text-ink leading-tight shadow-sm"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                {creator.role}
              </span>
            </div>

            {/* Tagline */}
            <p
              className="mt-[6px] text-white/85 text-[15px] sm:text-[16px] font-medium leading-normal"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {creator.tagline}
            </p>
          </div>
        </div>

        {/* ── Bio Block (margin-top ~28px, max-width ~1150px) ── */}
        <div className="mt-[28px] max-w-[1150px] space-y-1">
          {creator.bioParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-white/90 text-[16px] sm:text-[17px] leading-[1.6]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* ── Bottom Row: Stat Badges Left, Follow Button Right (margin-top ~32px) ── */}
        <div className="mt-[32px] flex flex-wrap items-center justify-between gap-4">
          {/* Left: Two White Pill Stat Badges (gap ~14px) */}
          <div className="flex flex-wrap items-center gap-[14px]">
            {/* 1. Products */}
            <InfoBadge>
              <span
                className="font-bold text-brand-blue text-[16px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {creator.productCount}
              </span>
              <span
                className="font-normal text-ink text-[15px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Products
              </span>
            </InfoBadge>

            {/* 2. Followers */}
            <InfoBadge>
              <span
                className="font-bold text-brand-blue text-[16px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {creator.followerCount}
              </span>
              <span
                className="font-normal text-ink text-[15px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Followers
              </span>
            </InfoBadge>
          </div>

          {/* Right: Sized-to-content Follow Button (~110px) */}
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleFollowToggle}
            className="min-w-[110px] px-6 py-2.5 text-[15px] font-medium text-ink shadow-sm cursor-pointer transition-transform hover:scale-105 active:scale-95"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            aria-label={isFollowing ? `Unfollow ${creator.name}` : `Follow ${creator.name}`}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </section>
  );
}
