"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  /** "light" = white text on dark/blue bg, "dark" = ink text on white/light bg */
  variant?: "light" | "dark";
  /** Optional active link override (defaults to matching current pathname) */
  active?: "Home" | "Courses" | "Creators";
  className?: string;
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Creators", href: "/creators" },
];

export function Navbar({
  variant = "light",
  active,
  className = "",
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const isLight = variant === "light";
  const textColor = isLight ? "text-white" : "text-ink";
  const textMutedColor = isLight ? "text-white/90" : "text-muted";

  /* ── Mobile menu: focus-trap + Escape ── */
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    if (!menu) return;
    const els = menu.querySelectorAll<HTMLElement>(
      'a,button,input,[tabindex]:not([tabindex="-1"])'
    );
    const first = els[0];
    const last = els[els.length - 1];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isLinkActive = (item: (typeof NAV_ITEMS)[0]) => {
    if (active) return active.toLowerCase() === item.label.toLowerCase();
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* ────────── Desktop Navbar ────────── */}
      <nav
        aria-label="Primary"
        className={`hidden md:flex h-[120px] items-center justify-between px-6 lg:px-[60px] ${className}`}
      >
        <Link href="/" aria-label="ByteSpace home">
          <Logo variant={isLight ? "light" : "dark"} />
        </Link>

        {/* Center navigation links */}
        <div className="flex items-center justify-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = isLinkActive(item);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[16px] transition-colors ${
                  isActive
                    ? `font-medium ${textColor}`
                    : `${textMutedColor} hover:underline hover:underline-offset-[6px]`
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right action items */}
        <div className="flex items-center gap-6">
          <Link
            href="/signin"
            className={`text-[16px] ${textColor}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Sign In
          </Link>
          <Link
            href="/join"
            className={`text-[16px] ${textColor}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Join Us
          </Link>
          <button
            aria-label="Cart"
            className={`cursor-pointer ${textColor}`}
          >
            <ShoppingBag size={24} />
          </button>
        </div>
      </nav>

      {/* ────────── Mobile Navbar ────────── */}
      <nav
        aria-label="Primary Mobile"
        className={`flex md:hidden h-16 items-center justify-between px-4 ${className}`}
      >
        <Link href="/" aria-label="ByteSpace home">
          <Logo variant={isLight ? "light" : "dark"} />
        </Link>

        <button
          ref={hamburgerRef}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className={`cursor-pointer ${textColor}`}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* ────────── Mobile Slide-Down Drawer ────────── */}
      {menuOpen && (
        <div
          ref={menuRef}
          className={`fixed inset-0 z-50 flex flex-col ${
            isLight ? "bg-brand-blue" : "bg-white"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{ animation: "hero-slide-down 200ms ease-out both" }}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              aria-label="ByteSpace home"
            >
              <Logo variant={isLight ? "light" : "dark"} />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className={`cursor-pointer ${textColor}`}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = isLinkActive(item);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg ${
                    isActive ? `font-medium ${textColor}` : textMutedColor
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.label}
                </Link>
              );
            })}
            <hr
              className={`w-40 ${
                isLight ? "border-white/20" : "border-card-border"
              }`}
            />
            <Link
              href="/signin"
              onClick={() => setMenuOpen(false)}
              className={`text-lg ${textColor}`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              Sign In
            </Link>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setMenuOpen(false);
                router.push("/join");
              }}
            >
              Join Us
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
