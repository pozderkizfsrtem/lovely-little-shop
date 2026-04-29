import { useState } from "react";
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
import { products, findProduct } from "@/data/products";
import { useCart } from "@/context/useCart";

const LANGUAGES = [
  { code: "PL", label: "Polski", flag: "🇵🇱" },
  { code: "EN", label: "English", flag: "🇬🇧" },
  { code: "UA", label: "Українська", flag: "🇺🇦" },
] as const;

const MENU_ITEMS = [
  { label: "Sklep", to: "/" },
  { label: "O sklepie", to: "/o-sklepie" },
  { label: "Dostawa", to: "/dostawa" },
  { label: "Płatność", to: "/platnosc" },
  { label: "Zwroty i wymiany", to: "/zwroty" },
  { label: "Zasady promocji", to: "/promocje" },
  { label: "Najczęstsze pytania", to: "/faq" },
  { label: "Opinie klientów", to: "/opinie" },
  { label: "Kontakt", to: "/kontakt" },
];

const Index = () => {
  const { items, add, sub, removeFlavor, count, total, unitPriceOfProduct } = useCart();
  const [lang, setLang] = useState<"PL" | "EN" | "UA">("PL");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Szukaj produktów..."
              className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button className="flex items-center gap-1 text-sm" aria-label="Język">
            <Globe className="w-5 h-5" />
            <span className="font-semibold">PL</span>
          </button>
          <Link to="/zamowienie" className="relative" aria-label="Koszyk">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="max-w-3xl mx-auto px-4 pb-3 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 bg-secondary border border-border rounded-lg py-2.5 text-sm">
            Sortowanie <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center gap-2 bg-secondary border border-border rounded-lg py-2.5 text-sm">
            Smart Cena <Info className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {products.map((p, idx) => {
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
                  <p className="text-orange font-bold text-base mt-1">{basePrice} zł</p>
                </div>

                {p.tiers && p.tiers.length > 1 && (
                  <div className="px-3 py-3 border-t border-border/60">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Smart Cena</p>
                    <ul className="space-y-1">
                      {p.tiers
                        .filter((t) => t.minQty > 1)
                        .map((t) => (
                          <li key={t.minQty} className="text-xs text-muted-foreground">
                            od {t.minQty} szt – <span className="text-foreground">{t.price} zł</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                <div className="px-3 pb-3 mt-auto">
                  <Link to={`/produkt/${p.id}`} className="block">
                    <Button className="w-full gradient-orange text-primary-foreground font-semibold rounded-lg h-10 hover:opacity-95">
                      Wybierz
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
              <h3 className="font-bold text-xl uppercase">Twój koszyk</h3>
              <span className="text-xs font-semibold text-orange">{count} szt.</span>
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
                          {unit} zł / szt. · {totalQty} szt.
                        </p>
                      </div>
                      <span className="font-bold text-orange whitespace-nowrap">
                        {unit * totalQty} zł
                      </span>
                    </div>
                    <ul className="space-y-2 pl-3 border-l-2 border-primary/40">
                      {lines.map((i) => (
                        <li key={`${i.productId}-${i.flavor}`} className="flex items-center gap-3">
                          <span className="flex-1 text-sm text-muted-foreground">{i.flavor}</span>
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
                              aria-label={`Usuń smak ${i.flavor}`}
                              className="ml-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="w-3 h-3" /> Usuń
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {remainingFlavors.length > 0 && (
                      <div className="mt-3 pl-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                          Dostępne smaki
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {remainingFlavors.map((f) => (
                            <button
                              key={f}
                              onClick={() => add(pid, f)}
                              className="px-3 py-1 rounded-md border border-border hover:border-primary text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              {f}
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
          © 2026 PuffBot — hello@maison.com
        </footer>

        {count > 0 && <div className="h-24" aria-hidden />}
      </div>

      {/* Floating order bar */}
      {count > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full px-2 py-2 flex items-center gap-2 shadow-orange z-40 whitespace-nowrap max-w-[calc(100vw-1.5rem)]">
          <span className="inline-flex h-9 items-center px-3 text-xs font-semibold text-muted-foreground">
            {count} szt.
          </span>
          <span className="inline-flex h-9 items-center px-1 font-bold text-lg text-orange">
            {total} zł
          </span>
          <Link to="/zamowienie" className="shrink-0 inline-flex">
            <Button
              size="sm"
              className="h-9 rounded-full gradient-orange text-primary-foreground px-6 font-semibold uppercase tracking-wide"
            >
              Zamów
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Index;
