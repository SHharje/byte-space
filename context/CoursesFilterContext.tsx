"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";

export type CourseLevel = "All Levels" | "Beginner" | "Intermediate" | "Advanced";
export type CourseSort =
  | "Most relevant"
  | "Newest"
  | "Price: Low to High"
  | "Price: High to Low";
export type SearchScope = "Courses" | "Creators" | "All";

export interface CoursesFilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchScope: SearchScope;
  setSearchScope: (scope: SearchScope) => void;
  category: string;
  setCategory: (category: string) => void;
  level: CourseLevel;
  setLevel: (level: CourseLevel) => void;
  sort: CourseSort;
  setSort: (sort: CourseSort) => void;
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  resetFilters: () => void;
}

const CoursesFilterContext = createContext<CoursesFilterContextType | undefined>(
  undefined
);

export function CoursesFilterProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  const [searchQuery, setSearchQuery] = useState<string>(urlQuery);
  const [searchScope, setSearchScope] = useState<SearchScope>("Courses");
  const [category, setCategory] = useState<string>("Featured");
  const [level, setLevel] = useState<CourseLevel>("All Levels");
  const [sort, setSort] = useState<CourseSort>("Most relevant");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [minRating, setMinRating] = useState<number>(0);

  // Sync searchQuery when URL query param changes (e.g. from Home page search)
  useEffect(() => {
    setSearchQuery(urlQuery);
  }, [urlQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setSearchScope("Courses");
    setCategory("Featured");
    setLevel("All Levels");
    setSort("Most relevant");
    setPriceRange([0, 150]);
    setMinRating(0);

    // Also clear query from URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.delete("q");
      const newUrl = `${window.location.pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      window.history.replaceState(null, "", newUrl);
    }
  };

  return (
    <CoursesFilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchScope,
        setSearchScope,
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
      }}
    >
      {children}
    </CoursesFilterContext.Provider>
  );
}

export function useCoursesFilter() {
  const context = useContext(CoursesFilterContext);
  if (!context) {
    return {
      searchQuery: "",
      setSearchQuery: () => {},
      searchScope: "Courses" as SearchScope,
      setSearchScope: () => {},
      category: "Featured",
      setCategory: () => {},
      level: "All Levels" as CourseLevel,
      setLevel: () => {},
      sort: "Most relevant" as CourseSort,
      setSort: () => {},
      isFilterDrawerOpen: false,
      setIsFilterDrawerOpen: () => {},
      priceRange: [0, 150] as [number, number],
      setPriceRange: () => {},
      minRating: 0,
      setMinRating: () => {},
      resetFilters: () => {},
    };
  }
  return context;
}
