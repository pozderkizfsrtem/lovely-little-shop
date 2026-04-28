import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Minus, X, Sparkles, ArrowRight } from "lucide-react";
import { products, findProduct } from "@/data/products";
import { useCart } from "@/context/useCart";

const Index = () => {
  const { items, add, sub, removeFlavor, count, total, unitPriceOfProduct } = useCart();

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="glow-orb animate-float-slow"
          style={{
            width: "560px",
            height: "560px",
            background: "hsl(var(--vapor-lavender))",
            top: "-10%",
            left: "-15%",
          }}
        />
        <div
          className="glow-orb animate-float"
          style={{
            width: "480px",
            height: "480px",
            background: "hsl(var(--vapor-cyan))",
            top: "30%",
            right: "-20%",
            animationDelay: "2s",
          }}
        />
        <div
          className="glow-orb animate-float-slow"
          style={{
            width: "420px",
            height: "420px",
            background: "hsl(var(--vapor-pink))",
            bottom: "-10%",
            left: "20%",
            animationDelay: "4s",
            opacity: 0.35,
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 sm:py-20">
        {/* HERO */}
        <header className="mb-14 sm:mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <Sparkles className="w-3.5 h-3.5 text-vapor" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-vapor font-semibold">
              PuffBot
            </span>
          </div>
          <h1 className="font-display text-6xl sm:text-8xl leading-[0.9] uppercase">
            Cztery <br />
            <span className="text-vapor">produkty.</span>
            <br />
            Zero <br />
            kompromisów.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-md font-light">
            Wybrana selekcja. Mocne smaki. Szybka dostawa prosto do Ciebie.
          </p>
        </header>

        {/* Marquee strip */}
        <div className="relative mb-12 overflow-hidden rounded-full glass py-3">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex items-center gap-8 px-4 shrink-0">
                {["Premium", "Świeże dostawy", "Mocne smaki", "Bez ściemy", "Szybka wysyłka", "PuffBot ✦"].map((t, i) => (
                  <span
                    key={`${dup}-${i}`}
                    className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
                  >
                    {t} <span className="text-vapor mx-2">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <section className="space-y-4">
          {products.map((p, idx) => (
            <article
              key={p.id}
              className="group relative glass rounded-3xl p-4 sm:p-5 hover:border-[hsl(var(--vapor-cyan)/0.6)] transition-all duration-500 hover:-translate-y-1 hover:shadow-cyan animate-fade-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <Link to={`/produkt/${p.id}`} className="shrink-0 relative">
                  <div className="absolute inset-0 rounded-2xl gradient-vapor opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500" />
                  <img
                    src={p.image}
                    alt={`Produkt ${p.name}`}
                    width={768}
                    height={768}
                    loading="lazy"
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-border group-hover:border-[hsl(var(--vapor-cyan))] transition-all duration-500 group-hover:scale-105"
                  />
                </Link>

                <Link to={`/produkt/${p.id}`} className="flex-1 min-w-0">
                  <h2 className="font-display text-2xl sm:text-3xl uppercase group-hover:text-vapor transition-colors leading-none">
                    {p.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                    {p.desc}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-display text-xl sm:text-2xl text-vapor">
                      {p.tiers ? `od ${p.tiers[p.tiers.length - 1].price}` : p.price} zł
                    </span>
                  </div>
                </Link>

                <Link to={`/produkt/${p.id}`} className="shrink-0">
                  <Button
                    size="icon"
                    className="rounded-full w-11 h-11 sm:w-12 sm:h-12 gradient-vapor text-primary-foreground hover:scale-110 transition-transform shadow-cyan"
                    aria-label={`Wybierz ${p.name}`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* CART */}
        {items.length > 0 && (
          <div className="mt-14 glass-strong rounded-3xl p-6 sm:p-8 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-3xl uppercase">Twój koszyk</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-vapor">
                {count} szt.
              </span>
            </div>
            <ul className="space-y-5">
              {Array.from(new Set(items.map((i) => i.productId))).map((pid) => {
                const p = findProduct(pid);
                if (!p) return null;
                const unit = unitPriceOfProduct(pid);
                const lines = items.filter((i) => i.productId === pid);
                const totalQty = lines.reduce((s, i) => s + i.qty, 0);
                const usedFlavors = new Set(lines.map((l) => l.flavor));
                const remainingFlavors = p.flavors.filter((f) => !usedFlavors.has(f));
                return (
                  <li
                    key={pid}
                    className="py-4 border-b border-border/40 last:border-0"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-xl uppercase">{p.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {unit} zł / szt. · {totalQty} szt.
                        </p>
                      </div>
                      <span className="font-display text-lg text-vapor whitespace-nowrap">
                        {unit * totalQty} zł
                      </span>
                    </div>
                    <ul className="space-y-2 pl-3 border-l-2 border-[hsl(var(--vapor-cyan)/0.4)]">
                      {lines.map((i) => (
                        <li
                          key={`${i.productId}-${i.flavor}`}
                          className="flex items-center gap-3"
                        >
                          <span className="flex-1 text-sm text-muted-foreground">
                            {i.flavor}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => sub(i.productId, i.flavor)}
                              className="w-7 h-7 rounded-full border border-border hover:border-[hsl(var(--vapor-cyan))] hover:text-vapor flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-sm font-semibold">{i.qty}</span>
                            <button
                              onClick={() => add(i.productId, i.flavor)}
                              className="w-7 h-7 rounded-full border border-border hover:border-[hsl(var(--vapor-cyan))] hover:text-vapor flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFlavor(i.productId, i.flavor)}
                              aria-label={`Usuń smak ${i.flavor}`}
                              className="ml-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="w-3 h-3" />
                              Usuń
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {remainingFlavors.length > 0 && (
                      <div className="mt-3 pl-3">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                          Dostępne smaki
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {remainingFlavors.map((f) => (
                            <button
                              key={f}
                              onClick={() => add(pid, f)}
                              className="px-3 py-1 rounded-full border border-border hover:border-[hsl(var(--vapor-cyan))] text-xs text-muted-foreground hover:text-vapor transition-all hover:scale-105 inline-flex items-center gap-1"
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

        {/* FLOATING BAR */}
        {count > 0 && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 glass-strong rounded-full px-2 py-2 flex items-center gap-1.5 sm:gap-2 shadow-cyan z-40 whitespace-nowrap max-w-[calc(100vw-1.5rem)] min-h-12 animate-scale-in">
            <span className="inline-flex h-9 items-center px-3 text-xs uppercase tracking-wider text-muted-foreground">
              {count} {count === 1 ? "produkt" : "szt."}
            </span>
            <span className="inline-flex h-9 items-center px-1 font-display text-xl text-vapor">
              {total} zł
            </span>
            <Link to="/zamowienie" className="shrink-0 inline-flex">
              <Button
                size="sm"
                className="h-9 rounded-full gradient-vapor text-primary-foreground px-5 font-semibold uppercase tracking-wider hover:scale-105 transition-transform"
              >
                Zamów
              </Button>
            </Link>
          </div>
        )}

        <footer className="mt-24 pt-8 border-t border-border/40 text-xs text-muted-foreground flex items-center justify-between">
          <span>© 2026 PuffBot</span>
          <span className="text-vapor">hello@maison.com</span>
        </footer>
      </div>
    </main>
  );
};

export default Index;
