import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Minus, X, Search, Globe, ShoppingCart, Menu, ChevronDown, Info, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { products, findProduct } from "@/data/products";
import { useCart } from "@/context/useCart";
import { useLang } from "@/i18n/LanguageContext";

type SortKey = "name-asc" | "name-desc" | "price-asc" | "price-desc";

const LANGUAGES = [
  { code: "PL", label: "Polski", flag: "🇵🇱" },
  { code: "EN", label: "English", flag: "🇬🇧" },
  { code: "UA", label: "Українська", flag: "🇺🇦" },
] as const;

const Index = () => {
  const { items, add, sub, removeFlavor, count, total, unitPriceOfProduct } = useCart();
  const { lang, setLang, t, tFlavor } = useLang();
  const [sortKey, setSortKey] = useState<SortKey>("name-asc");

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "name-asc", label: t.sortNameAsc },
    { key: "name-desc", label: t.sortNameDesc },
    { key: "price-asc", label: t.sortPriceAsc },
    { key: "price-desc", label: t.sortPriceDesc },
  ];

  const sortedProducts = useMemo(() => {
    const arr = [...products];
    const priceOf = (p: typeof products[number]) => (p.tiers ? p.tiers[0].price : p.price);
    switch (sortKey) {
      case "name-asc":
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return arr.sort((a, b) => priceOf(a) - priceOf(b));
      case "price-desc":
        return arr.sort((a, b) => priceOf(b) - priceOf(a));
    }
  }, [sortKey]);

  const currentSortLabel = sortOptions.find((o) => o.key === sortKey)?.label ?? t.sort;

  const menuItems = [
    { label: t.nav.shop, to: "/" },
    { label: t.nav.about, to: "/o-sklepie" },
    { label: t.nav.delivery, to: "/dostawa" },
    { label: t.nav.payment, to: "/platnosc" },
    { label: t.nav.returns, to: "/zwroty" },
    { label: t.nav.promotions, to: "/promocje" },
    { label: t.nav.faq, to: "/faq" },
    { label: t.nav.reviews, to: "/opinie" },
    { label: t.nav.contact, to: "/kontakt" },
  ];

  return (
    <main className="min-h-screen text-foreground">
      {/* Brand header */}
      <header className="relative max-w-3xl mx-auto px-4 pt-8 pb-4 text-center">
        <h1
          className="font-display font-extrabold tracking-tight text-5xl sm:text-6xl md:text-7xl uppercase bg-clip-text text-transparent inline-block"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(185 100% 70%), hsl(205 100% 60%) 45%, hsl(225 100% 65%))",
            filter: "drop-shadow(0 6px 24px hsl(205 100% 55% / 0.55))",
            letterSpacing: "-0.04em",
          }}
        >
          PuffBot
        </h1>
        <span
          aria-hidden
          className="block mx-auto mt-2 h-1 w-24 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(195 100% 65%), transparent)",
          }}
        />
      </header>

      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">

        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm hover:text-primary transition-colors outline-none" aria-label={t.language}>
              <Globe className="w-5 h-5" />
              <span className="font-semibold">{lang}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>{t.language}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LANGUAGES.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <span className="text-base">{l.flag}</span>
                  <span className="flex-1">{l.label}</span>
                  {lang === l.code && <Check className="w-4 h-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/zamowienie" className="relative" aria-label={t.cart}>
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <Sheet>
            <SheetTrigger aria-label={t.menu} className="hover:text-primary transition-colors outline-none">
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-card border-border">
              <SheetHeader>
                <SheetTitle className="text-left text-xl uppercase tracking-wide">{t.menu}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col">
                {menuItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      className="py-3 px-2 text-sm font-medium border-b border-border/50 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Filter bar */}
        <div className="max-w-3xl mx-auto px-4 pb-3 grid grid-cols-2 gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center gap-2 bg-secondary border border-border rounded-lg py-2.5 text-sm hover:border-primary transition-colors outline-none">
              <span className="truncate">{currentSortLabel}</span>
              <ChevronDown className="w-4 h-4 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>{t.sort}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((opt) => (
                <DropdownMenuItem
                  key={opt.key}
                  onClick={() => setSortKey(opt.key)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <span className="flex-1">{opt.label}</span>
                  {sortKey === opt.key && <Check className="w-4 h-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover>
            <PopoverTrigger className="flex items-center justify-center gap-2 bg-secondary border border-border rounded-lg py-2.5 text-sm hover:border-primary transition-colors outline-none">
              {t.smartPrice} <Info className="w-4 h-4 text-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 text-sm leading-relaxed">
              <p className="font-semibold mb-1.5 text-primary">{t.smartPrice}</p>
              <p className="text-muted-foreground">{t.smartPriceInfo}</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {sortedProducts.map((p, idx) => {
            const basePrice = p.tiers ? p.tiers[0].price : p.price;
            return (
              <article
                key={p.id}
                className="card-glow rounded-xl overflow-hidden flex flex-col animate-fade-up"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <Link to={`/produkt/${p.id}`} className="block bg-secondary/40 aspect-square">
                  <img
                    src={p.image}
                    alt={`Produkt ${p.name}`}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="w-full h-full object-contain p-3"
                  />
                </Link>

                <div className="px-3 pt-3 pb-2">
                  <Link to={`/produkt/${p.id}`}>
                    <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide truncate">
                      {p.name}
                    </h2>
                  </Link>
                  <p className="text-orange font-bold text-base mt-1">{basePrice} {t.currency}</p>
                </div>

                {p.tiers && p.tiers.length > 1 && (
                  <div className="px-3 py-3 border-t border-border/60">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">{t.smartPrice}</p>
                    <ul className="space-y-1">
                      {p.tiers
                        .filter((tier) => tier.minQty > 1)
                        .map((tier) => (
                          <li key={tier.minQty} className="text-xs text-muted-foreground">
                            {t.fromQty} {tier.minQty} {t.pieces} – <span className="text-foreground">{tier.price} {t.currency}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                <div className="px-3 pb-3 mt-auto">
                  <Link to={`/produkt/${p.id}`} className="block">
                    <Button className="w-full gradient-orange text-primary-foreground font-semibold rounded-lg h-10 hover:opacity-95">
                      {t.choose}
                    </Button>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* CART */}
        {items.length > 0 && (
          <div className="mt-8 card-glow rounded-xl p-5 animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl uppercase">{t.yourCart}</h3>
              <span className="text-xs font-semibold text-orange">{count} {t.pcs}</span>
            </div>
            <ul className="space-y-4">
              {Array.from(new Set(items.map((i) => i.productId))).map((pid) => {
                const p = findProduct(pid);
                if (!p) return null;
                const unit = unitPriceOfProduct(pid);
                const lines = items.filter((i) => i.productId === pid);
                const totalQty = lines.reduce((s, i) => s + i.qty, 0);
                const usedFlavors = new Set(lines.map((l) => l.flavor));
                const remainingFlavors = p.flavors.filter((f) => !usedFlavors.has(f));
                return (
                  <li key={pid} className="py-3 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold uppercase">{p.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {unit} {t.perPiece} · {totalQty} {t.pcs}
                        </p>
                      </div>
                      <span className="font-bold text-orange whitespace-nowrap">
                        {unit * totalQty} {t.currency}
                      </span>
                    </div>
                    <ul className="space-y-2 pl-3 border-l-2 border-primary/40">
                       {lines.map((i) => (
                        <li key={`${i.productId}-${i.flavor}`} className="flex items-center gap-3">
                          <span className="flex-1 text-sm text-muted-foreground">{tFlavor(i.flavor)}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => sub(i.productId, i.flavor)}
                              className="w-7 h-7 rounded-md border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-sm font-semibold">{i.qty}</span>
                            <button
                              onClick={() => add(i.productId, i.flavor)}
                              className="w-7 h-7 rounded-md border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFlavor(i.productId, i.flavor)}
                              aria-label={`${t.removeFlavor} ${tFlavor(i.flavor)}`}
                              className="ml-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="w-3 h-3" /> {t.remove}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {remainingFlavors.length > 0 && (
                      <div className="mt-3 pl-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                          {t.availableFlavors}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {remainingFlavors.map((f) => (
                            <button
                              key={f}
                              onClick={() => add(pid, f)}
                              className="px-3 py-1 rounded-md border border-border hover:border-primary text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              {tFlavor(f)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <footer className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground text-center">
          {t.footer}
        </footer>

        {count > 0 && <div className="h-24" aria-hidden />}
      </div>

      {/* Floating order bar */}
      {count > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full px-2 py-2 flex items-center gap-2 shadow-orange z-40 whitespace-nowrap max-w-[calc(100vw-1.5rem)]">
          <span className="inline-flex h-9 items-center px-3 text-xs font-semibold text-muted-foreground">
            {count} {t.pcs}
          </span>
          <span className="inline-flex h-9 items-center px-1 font-bold text-lg text-orange">
            {total} {t.currency}
          </span>
          <Link to="/zamowienie" className="shrink-0 inline-flex">
            <Button
              size="sm"
              className="h-9 rounded-full gradient-orange text-primary-foreground px-6 font-semibold uppercase tracking-wide"
            >
              {t.order}
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Index;
