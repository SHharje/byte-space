"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown, Check, X } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { GridBackground } from "@/components/ui/GridBackground";
import {
  useCoursesFilter,
  type SearchScope,
} from "@/context/CoursesFilterContext";

const CATEGORIES: SearchScope[] = ["Courses", "Creators", "All"];

export function CoursesHero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQ = searchParams.get("q")?.trim() ?? "";

  const {
    setSearchQuery,
    searchScope,
    setSearchScope,
  } = useCoursesFilter();

  const [inputValue, setInputValue] = useState(urlQ);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input value and context with URL parameter
  useEffect(() => {
    setInputValue(urlQ);
    setSearchQuery(urlQ);
  }, [urlQ, setSearchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dropdownOpen]);

  // Clear search link action (below heading or inline button)
  const handleClearSearch = () => {
    setInputValue("");
    setSearchQuery("");
    router.replace("/courses");
    inputRef.current?.focus();
  };

  // Form submit handler
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = inputValue.trim();
    setSearchQuery(q);
    if (q) {
      router.push(`/courses?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/courses");
    }

    // Smoothly scroll down to grid
    const gridEl = document.getElementById("courses-grid");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-blue min-h-[330px] pb-12 sm:pb-14">
      {/* ── Reused Faint Grid Background ── */}
      <GridBackground />

      {/* ── Shared Navbar (exact same component, automatically highlights 'Courses') ── */}
      <div className="relative z-20 mx-auto max-w-[1440px]">
        <Navbar variant="light" />
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center sm:px-6">
        {/* Dynamic Heading based on q */}
        {urlQ ? (
          <div className="mt-8 sm:mt-10 md:mt-12 text-center">
            <h1
              className="mx-auto max-w-[800px] text-center text-[28px] font-bold text-white tracking-[-0.01em] sm:text-[32px] md:text-[34px] line-clamp-1"
              style={{ fontFamily: "var(--font-heading)" }}
              title={`Results for "${urlQ}"`}
            >
              Results for &ldquo;{urlQ}&rdquo;
            </h1>
            <button
              type="button"
              onClick={handleClearSearch}
              className="mt-2.5 inline-block text-[14px] text-white/90 transition-colors hover:text-white hover:underline cursor-pointer"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <h1
            className="mt-8 text-center text-[28px] font-bold text-white tracking-[-0.01em] sm:mt-10 sm:text-[32px] md:mt-12 md:text-[34px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Find Your Next Course
          </h1>
        )}

        {/* Search + Category Dropdown Row */}
        <form
          role="search"
          onSubmit={handleSearch}
          className="mx-auto mt-7 flex max-w-[400px] flex-col items-center justify-center gap-3.5 sm:max-w-none sm:flex-row"
        >
          {/* White Pill Input */}
          <div className="relative w-full sm:w-[460px]">
            <label htmlFor="courses-search-input" className="sr-only">
              Search
            </label>
            <button
              type="submit"
              className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted hover:text-ink transition-colors p-1"
              aria-label="Submit search"
            >
              <Search size={20} />
            </button>
            <input
              ref={inputRef}
              id="courses-search-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search"
              className="h-[52px] w-full rounded-full bg-white pl-12 pr-11 text-[16px] text-ink outline-none transition-all placeholder:text-muted focus:ring-[3px] focus:ring-lime/60 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              style={{ fontFamily: "var(--font-body)" }}
            />

            {/* Clear button (X) when query is not empty */}
            {inputValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search query"
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#F3F4F6] text-muted hover:bg-card-border hover:text-ink transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Lime Pill Dropdown Button */}
          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label="Filter search scope"
              className="flex h-[48px] sm:h-[52px] w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-full bg-lime px-5 text-[15px] sm:text-[16px] font-medium text-ink transition-all hover:brightness-95 active:brightness-90 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>{searchScope}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Popover Menu */}
            {dropdownOpen && (
              <div
                role="listbox"
                className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-full sm:w-[150px] rounded-2xl border border-card-border bg-white p-1.5 shadow-[0_12px_28px_rgba(0,20,80,0.15)] z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                {CATEGORIES.map((cat) => {
                  const isSelected = searchScope === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSearchScope(cat);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-left text-[14px] font-medium transition-colors ${
                        isSelected
                          ? "bg-lime/25 text-ink font-semibold"
                          : "text-ink/80 hover:bg-[#F4F4F5] hover:text-ink"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <span>{cat}</span>
                      {isSelected && <Check size={14} className="text-ink" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
