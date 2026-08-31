import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Minus, X, Globe, ShoppingCart, Menu, Info, Check } from "lucide-react";
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
import { findProduct, unitPriceFor } from "@/data/products";
import { useCart } from "@/context/useCart";
import { useLang } from "@/i18n/LanguageContext";

const LANGUAGES = [
  { code: "PL", label: "Polski", flag: "🇵🇱" },
  { code: "EN", label: "English", flag: "🇬🇧" },
  { code: "UA", label: "Українська", flag: "🇺🇦" },
] as const;

const FEATURED_PRODUCT_ID = "zooy";

const Index = () => {
  const { items, add, sub, removeFlavor, count, total, unitPriceOfProduct, qtyOfProduct } = useCart();
  const { lang, setLang, t, tFlavor } = useLang();
  const [flavor, setFlavor] = useState<string | null>(null);

  const product = findProduct(FEATURED_PRODUCT_ID)!;
  const currentQty = qtyOfProduct(product.id);
  const currentUnit = unitPriceFor(product, currentQty);

  const productLines = items.filter((i) => i.productId === product.id);
  const usedFlavors = new Set(productLines.map((l) => l.flavor));
  const remainingFlavors = product.flavors.filter((f) => !usedFlavors.has(f));

  const handleAdd = () => {
    if (!flavor) return;
    add(product.id, flavor);
    setFlavor(null);
  };

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
      <header className="relative max-w-3xl mx-auto px-4 pt-10 pb-6 text-center">
        <div className="relative inline-block puffbot-3d-wrap">
          {/* Back glow layer */}
          <span
            aria-hidden
            className="absolute inset-0 font-display font-black tracking-tight text-6xl sm:text-7xl md:text-8xl uppercase blur-2xl opacity-70 select-none"
            style={{
              color: "hsl(200 100% 60%)",
              letterSpacing: "-0.05em",
              transform: "translateY(6px)",
            }}
          >
            PuffBot
          </span>
          {/* Shadow / depth layer */}
          <span
            aria-hidden
            className="absolute inset-0 font-display font-black tracking-tight text-6xl sm:text-7xl md:text-8xl uppercase select-none"
            style={{
              color: "hsl(220 80% 8%)",
              letterSpacing: "-0.05em",
              transform: "translate(3px, 6px)",
              WebkitTextStroke: "1px hsl(210 90% 30% / 0.6)",
            }}
          >
            PuffBot
          </span>
          {/* Main gradient layer */}
          <h1
            className="relative font-display font-black tracking-tight text-6xl sm:text-7xl md:text-8xl uppercase bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, hsl(190 100% 92%) 0%, hsl(195 100% 78%) 30%, hsl(205 100% 58%) 55%, hsl(220 90% 42%) 80%, hsl(225 85% 30%) 100%)",
              letterSpacing: "-0.05em",
              filter:
                "drop-shadow(0 2px 0 hsl(210 90% 25%)) drop-shadow(0 4px 0 hsl(220 90% 18%)) drop-shadow(0 12px 30px hsl(205 100% 55% / 0.55))",
              WebkitTextStroke: "1px hsl(200 100% 85% / 0.35)",
            }}
          >
            PuffBot
          </h1>
          {/* Specular highlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 font-display font-black tracking-tight text-6xl sm:text-7xl md:text-8xl uppercase bg-clip-text text-transparent select-none"
            style={{
              backgroundImage:
                "linear-gradient(180deg, hsl(0 0% 100% / 0.9) 0%, hsl(0 0% 100% / 0.15) 35%, transparent 55%)",
              letterSpacing: "-0.05em",
              mixBlendMode: "screen",
            }}
          >
            PuffBot
          </span>
        </div>
        <span
          aria-hidden
          className="block mx-auto mt-4 h-1 w-32 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(195 100% 65%), transparent)",
            boxShadow: "0 0 20px hsl(195 100% 60% / 0.7)",
          }}
        />
      </header>


      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-end gap-4">
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
      </div>

      {/* Product view */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <article className="card-glow rounded-2xl overflow-hidden animate-fade-up">
          <div className="bg-secondary/40">
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="w-full aspect-square object-contain p-6"
            />
          </div>

          <div className="p-5">
            <h2 className="font-bold text-3xl uppercase tracking-wide">{product.name}</h2>
            <p className="text-orange font-bold text-2xl mt-2">
              {currentUnit} {t.currency}
              <span className="text-muted-foreground text-sm font-normal ml-1">/ {t.pcs}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{t.productDesc}</p>

            {product.tiers && product.tiers.length > 1 && (
              <div className="mt-5 rounded-xl border border-border/60 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-secondary/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.smartPrice}
                  </p>
                  <Popover>
                    <PopoverTrigger aria-label={t.smartPrice} className="text-muted-foreground hover:text-primary transition-colors">
                      <Info className="w-4 h-4" />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-72 text-sm leading-relaxed">
                      <p className="font-semibold mb-1.5 text-primary">{t.smartPrice}</p>
                      <p className="text-muted-foreground">{t.smartPriceInfo}</p>
                    </PopoverContent>
                  </Popover>
                </div>
                <ul className="divide-y divide-border/40">
                  {product.tiers.map((tier) => {
                    const active =
                      currentQty >= tier.minQty &&
                      !product.tiers!.some((x) => x.minQty > tier.minQty && currentQty >= x.minQty);
                    return (
                      <li
                        key={tier.minQty}
                        className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                          active ? "bg-primary/10 text-primary" : "text-muted-foreground"
                        }`}
                      >
                        <span>
                          {t.fromQty} {tier.minQty} {t.pieces}
                        </span>
                        <span className="font-semibold">
                          {tier.price} {t.currency}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
                {product.flavors.length > 0 ? t.pickFlavor : ""}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {product.flavors.map((f) => {
                  const active = flavor === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setFlavor(f)}
                      className={`px-3 py-2.5 rounded-lg border text-sm transition-colors inline-flex items-center justify-center gap-2 text-center ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {active && <Check className="w-3 h-3 shrink-0" />}
                      <span className="truncate">{tFlavor(f)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={handleAdd}
              disabled={!flavor}
              size="lg"
              className="w-full mt-6 gradient-orange text-primary-foreground font-semibold rounded-lg h-12 hover:opacity-95 disabled:opacity-40"
            >
              {flavor ? `${t.choose} — ${tFlavor(flavor)}` : t.choose}
            </Button>
          </div>
        </article>

        {/* CART */}
        {productLines.length > 0 && (
          <div className="mt-8 card-glow rounded-xl p-5 animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl uppercase">{t.yourCart}</h3>
              <span className="text-xs font-semibold text-orange">
                {count} {t.pcs}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <p className="font-bold uppercase">{product.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {currentUnit} {t.perPiece} · {currentQty} {t.pcs}
                </p>
              </div>
              <span className="font-bold text-orange whitespace-nowrap">
                {currentUnit * currentQty} {t.currency}
              </span>
            </div>
            <ul className="space-y-2 pl-3 border-l-2 border-primary/40">
              {productLines.map((i) => (
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
              <div className="mt-4 pl-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {t.availableFlavors}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {remainingFlavors.map((f) => (
                    <button
                      key={f}
                      onClick={() => add(product.id, f)}
                      className="px-3 py-1.5 rounded-md border border-border hover:border-primary text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center justify-center gap-1 text-center"
                    >
                      <Plus className="w-3 h-3 shrink-0" />
                      <span className="truncate">{tFlavor(f)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
