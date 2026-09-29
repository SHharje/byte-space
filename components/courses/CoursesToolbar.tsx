"use client";

import { useState, useRef, useEffect } from "react";
import {
  Filter,
  BarChart2,
  Shapes,
  ListFilter,
  Check,
  X,
  Star,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui";
import {
  useCoursesFilter,
  type CourseLevel,
  type CourseSort,
} from "@/context/CoursesFilterContext";

const CATEGORIES = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Cooking",
] as const;

const LEVELS: CourseLevel[] = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
];

const SORT_OPTIONS: CourseSort[] = [
  "Most relevant",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
];

export function CoursesToolbar() {
  const {
    category,
    setCategory,
    level,
    setLevel,
    sort,
    setSort,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    resetFilters,
  } = useCoursesFilter();

  // Dropdown open states
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Temporary drawer state for price
  const [tempPriceMax, setTempPriceMax] = useState(priceRange[1]);
  const [tempRating, setTempRating] = useState(minRating);

  const levelRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (levelRef.current && !levelRef.current.contains(target)) {
        setLevelDropdownOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setCategoryDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(target)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close dropdowns & drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLevelDropdownOpen(false);
        setCategoryDropdownOpen(false);
        setSortDropdownOpen(false);
        setIsFilterDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsFilterDrawerOpen]);

  const outlinePillBase =
    "inline-flex items-center gap-2 rounded-full border border-card-border bg-white px-4 py-2 text-[14px] font-medium text-ink transition-all hover:bg-[#F9FAFB] active:bg-[#F3F4F6] cursor-pointer select-none shadow-[0_1px_2px_rgba(0,0,0,0.04)]";

  return (
    <section className="bg-white py-6 md:py-8 border-b border-card-border/60">
      <Container>
        <Reveal>
          {/* ══════════════════════════════════════════════════
              ROW 1: FILTER BUTTONS + SORT
              ══════════════════════════════════════════════════ */}
          <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left Group: Filter, Level, Category */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* 1 · Filter Button (Opens Drawer/Modal) */}
            <button
              type="button"
              onClick={() => {
                setTempPriceMax(priceRange[1]);
                setTempRating(minRating);
                setIsFilterDrawerOpen(true);
              }}
              className={outlinePillBase}
              style={{ fontFamily: "var(--font-body)" }}
              aria-label="Open filter settings"
            >
              <Filter size={16} className="text-ink" />
              <span>Filter</span>
            </button>

            {/* 2 · Level Dropdown */}
            <div className="relative" ref={levelRef}>
              <button
                type="button"
                onClick={() => {
                  setLevelDropdownOpen((prev) => !prev);
                  setCategoryDropdownOpen(false);
                  setSortDropdownOpen(false);
                }}
                className={`${outlinePillBase} ${
                  level !== "All Levels" ? "border-ink/50 bg-[#F9FAFB]" : ""
                }`}
                style={{ fontFamily: "var(--font-body)" }}
                aria-haspopup="listbox"
                aria-expanded={levelDropdownOpen}
              >
                <BarChart2 size={16} className="text-ink" />
                <span>{level === "All Levels" ? "Level" : level}</span>
              </button>

              {levelDropdownOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 top-full mt-2 w-[160px] rounded-2xl border border-card-border bg-white p-1.5 shadow-[0_12px_28px_rgba(0,20,80,0.12)] z-30 animate-in fade-in zoom-in-95 duration-150"
                >
                  {LEVELS.map((lvl) => {
                    const isSelected = level === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setLevel(lvl);
                          setLevelDropdownOpen(false);
                        }}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-left text-[14px] font-medium transition-colors ${
                          isSelected
                            ? "bg-lime/25 text-ink font-semibold"
                            : "text-ink/80 hover:bg-[#F4F4F5] hover:text-ink"
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <span>{lvl}</span>
                        {isSelected && <Check size={14} className="text-ink" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3 · Category Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                type="button"
                onClick={() => {
                  setCategoryDropdownOpen((prev) => !prev);
                  setLevelDropdownOpen(false);
                  setSortDropdownOpen(false);
                }}
                className={`${outlinePillBase} ${
                  category !== "Featured" ? "border-ink/50 bg-[#F9FAFB]" : ""
                }`}
                style={{ fontFamily: "var(--font-body)" }}
                aria-haspopup="listbox"
                aria-expanded={categoryDropdownOpen}
              >
                <Shapes size={16} className="text-ink" />
                <span>
                  {category === "Featured" ? "Category" : category}
                </span>
              </button>

              {categoryDropdownOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 top-full mt-2 w-[220px] max-h-[300px] overflow-y-auto rounded-2xl border border-card-border bg-white p-1.5 shadow-[0_12px_28px_rgba(0,20,80,0.12)] z-30 animate-in fade-in zoom-in-95 duration-150 scrollbar-none"
                >
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setCategory(cat);
                          setCategoryDropdownOpen(false);
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
          </div>

          {/* Right Group: Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => {
                setSortDropdownOpen((prev) => !prev);
                setLevelDropdownOpen(false);
                setCategoryDropdownOpen(false);
              }}
              className={outlinePillBase}
              style={{ fontFamily: "var(--font-body)" }}
              aria-haspopup="listbox"
              aria-expanded={sortDropdownOpen}
            >
              <ListFilter size={16} className="text-ink" />
              <span>{sort}</span>
            </button>

            {sortDropdownOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-2 w-[190px] rounded-2xl border border-card-border bg-white p-1.5 shadow-[0_12px_28px_rgba(0,20,80,0.12)] z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = sort === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSort(opt);
                        setSortDropdownOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-left text-[14px] font-medium transition-colors ${
                        isSelected
                          ? "bg-lime/25 text-ink font-semibold"
                          : "text-ink/80 hover:bg-[#F4F4F5] hover:text-ink"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check size={14} className="text-ink" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            ROW 2: CATEGORY PILLS (Horizontal Scrollable Row)
            ══════════════════════════════════════════════════ */}
        <div className="mt-5 flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1 pt-1">
          {CATEGORIES.map((cat) => {
            const isActive = category === cat;
            return (
              <div key={cat} className="shrink-0">
                <Pill
                  active={isActive}
                  onClick={() => setCategory(cat)}
                  className="whitespace-nowrap px-4 py-2 text-[14px]"
                >
                  {cat}
                </Pill>
              </div>
            );
          })}
        </div>
        </Reveal>
      </Container>

      {/* ══════════════════════════════════════════════════
          FILTER DRAWER / MODAL STUB
          ══════════════════════════════════════════════════ */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          {/* Dialog Container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-dialog-title"
            className="relative z-10 w-full max-w-[480px] rounded-3xl bg-white p-6 shadow-2xl transition-all sm:p-7"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <h2
                id="filter-dialog-title"
                className="text-[20px] font-bold text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Filter Courses
              </h2>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="cursor-pointer rounded-full p-1.5 text-muted hover:bg-[#F4F4F5] hover:text-ink transition-colors"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="mt-5 space-y-6">
              {/* Max Price Range */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[14px] font-semibold text-ink">
                    Max Price
                  </label>
                  <span className="text-[14px] font-bold text-ink">
                    ${tempPriceMax}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={tempPriceMax}
                  onChange={(e) => setTempPriceMax(Number(e.target.value))}
                  className="mt-3 w-full accent-lime cursor-pointer"
                />
                <div className="mt-1 flex justify-between text-[12px] text-muted">
                  <span>$20</span>
                  <span>$200</span>
                </div>
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="block text-[14px] font-semibold text-ink">
                  Minimum Rating
                </label>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[0, 3.5, 4.0, 4.5].map((rate) => {
                    const isSelected = tempRating === rate;
                    return (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setTempRating(rate)}
                        className={`flex cursor-pointer items-center justify-center gap-1 rounded-xl py-2 text-[13px] font-medium border transition-colors ${
                          isSelected
                            ? "border-ink bg-ink text-white"
                            : "border-card-border text-ink hover:bg-[#F9FAFB]"
                        }`}
                      >
                        {rate === 0 ? (
                          "All"
                        ) : (
                          <>
                            <span>{rate}</span>
                            <Star
                              size={12}
                              className={
                                isSelected ? "fill-lime text-lime" : "text-muted"
                              }
                            />
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Level Selector */}
              <div>
                <label className="block text-[14px] font-semibold text-ink">
                  Difficulty Level
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {LEVELS.map((lvl) => {
                    const isSelected = level === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setLevel(lvl)}
                        className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium border transition-colors ${
                          isSelected
                            ? "border-ink bg-ink text-white"
                            : "border-card-border text-ink hover:bg-[#F9FAFB]"
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-8 flex items-center justify-between border-t border-card-border pt-4">
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setTempPriceMax(150);
                  setTempRating(0);
                  setIsFilterDrawerOpen(false);
                }}
                className="cursor-pointer text-[14px] font-medium text-muted hover:text-ink transition-colors"
              >
                Reset All
              </button>
              <Button
                variant="primary"
                onClick={() => {
                  setPriceRange([priceRange[0], tempPriceMax]);
                  setMinRating(tempRating);
                  setIsFilterDrawerOpen(false);
                }}
                className="h-[42px] px-6 text-[14px]"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
