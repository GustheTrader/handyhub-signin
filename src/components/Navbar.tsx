import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Building, Menu, X, LogOut, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import tmhLogo from "@/assets/tmh-logo.png";

const navItems = [
  { id: "about", label: "About Company", icon: Building },
  { id: "services", label: "Services" },
  { id: "how-it-works", label: "How It Works" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    setActive(sectionId);
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.scrollBy(0, -96);
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled ? "glass-nav border-b border-white/60 shadow-[0_10px_40px_-24px_hsl(20_50%_25%/0.45)]" : "bg-transparent border-b border-transparent",
      )}
    >
      {/* orange gradient hairline */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[hsl(28_100%_60%)] via-[hsl(14_92%_54%)] to-[hsl(340_78%_58%)]" />

      <div className="container mx-auto flex h-[72px] items-center justify-between gap-4 px-4 md:px-6">
        {/* Brand */}
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-white to-[hsl(36_60%_95%)] p-1 shadow-[0_8px_20px_-12px_hsl(20_60%_30%/0.55)] ring-1 ring-white/70 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
            <img
              src={tmhLogo}
              alt="Truckee Meadows Handyman logo"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Truckee Meadows
            </span>
            <span className="mt-1 text-lg font-extrabold tracking-tight text-foreground">
              Handyman
            </span>
          </span>
        </Link>

        {/* Desktop nav — glass pill group */}
        <nav className="hidden items-center gap-0.5 rounded-full border border-white/60 bg-white/45 p-1.5 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.7),0_8px_24px_-20px_hsl(20_50%_25%/0.5)] backdrop-blur-xl lg:flex">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.82rem] font-semibold text-muted-foreground transition-colors duration-300 hover:text-foreground",
                active === id && "text-foreground",
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 -z-10 rounded-full bg-white opacity-0 shadow-[0_4px_14px_-8px_hsl(20_50%_25%/0.6)] transition-opacity duration-300 group-hover:opacity-100",
                  active === id && "opacity-100",
                )}
              />
              <span className="pointer-events-none absolute bottom-1.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[hsl(30_100%_60%)] via-[hsl(16_92%_54%)] to-[hsl(340_80%_58%)] transition-all duration-300 group-hover:w-5" />
              {Icon && <Icon className="h-3.5 w-3.5 text-primary/80 transition-colors group-hover:text-primary" />}
              <span className="relative">{label}</span>
            </button>
          ))}
        </nav>

        {/* Auth + mobile toggle */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-semibold text-foreground shadow-[inset_0_1px_0_hsl(0_0%_100%/0.8)] backdrop-blur-xl transition-colors hover:bg-white/85">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[hsl(28_100%_62%)] to-[hsl(10_92%_50%)]">
                    <User className="h-3.5 w-3.5 text-white" />
                  </span>
                  Account
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl border-white/70 backdrop-blur-xl">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth")}
                className="hidden rounded-full border border-white/70 bg-white/55 px-5 py-2 text-sm font-semibold text-foreground shadow-[inset_0_1px_0_hsl(0_0%_100%/0.8)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/85 sm:block"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/auth?tab=signup")}
                className="group relative overflow-hidden rounded-full bg-gradient-to-br from-[hsl(26_100%_60%)] via-[hsl(16_92%_54%)] to-[hsl(4_88%_52%)] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_26px_-12px_hsl(14_92%_45%/0.95),inset_0_1px_0_hsl(0_0%_100%/0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-14px_hsl(14_92%_45%/1),inset_0_1px_0_hsl(0_0%_100%/0.5)]"
              >
                <span className="relative z-10 flex items-center gap-1">
                  Sign Up
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </>
          )}

          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-white/55 text-foreground backdrop-blur-xl transition-colors hover:bg-white/85 lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile glass sheet */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="glass-nav mx-4 mb-4 rounded-3xl border border-white/70 p-3 shadow-[0_24px_50px_-30px_hsl(20_50%_25%/0.6)]">
          <nav className="flex flex-col">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-foreground/85 transition-colors hover:bg-white/60"
              >
                {Icon && <Icon className="h-4 w-4 text-primary" />}
                {label}
              </button>
            ))}
            {!user && (
              <button
                onClick={() => navigate("/auth")}
                className="mt-2 rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-sm font-semibold sm:hidden"
              >
                Log In
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
