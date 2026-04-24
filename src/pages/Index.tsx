import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Minus, X } from "lucide-react";
import { products, findProduct } from "@/data/products";
import { useCart } from "@/context/useCart";

const Index = () => {
  const { items, add, sub, removeFlavor, count, total, unitPriceOfProduct } = useCart();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <header className="mb-16">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">— Sklep</p>
          <h1 className="font-display text-5xl md:text-6xl leading-tight">
            Cztery produkty.<br />
            <span className="italic text-gold">Nic więcej.</span>
          </h1>
        </header>

        <ul className="divide-y divide-border/60 border-y border-border/60">
          {products.map((p) => (
            <li key={p.id} className="py-6 flex items-center gap-4 sm:gap-6">
              <Link to={`/produkt/${p.id}`} className="shrink-0">
                <img
                  src={p.image}
                  alt={`Produkt ${p.name}`}
                  width={768}
                  height={768}
                  loading="lazy"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover border border-border/60 hover:border-gold transition-colors"
                />
              </Link>
              <Link to={`/produkt/${p.id}`} className="flex-1 min-w-0 group">
                <h2 className="font-display text-2xl group-hover:text-gold transition-colors">
                  {p.name}
                </h2>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </Link>
              <span className="font-display text-xl text-gold whitespace-nowrap">
                {p.tiers ? `od ${p.tiers[p.tiers.length - 1].price}` : p.price} zł
              </span>
              <Link to={`/produkt/${p.id}`}>
                <Button
                  size="sm"
                  className="rounded-full bg-foreground text-background hover:bg-gold hover:text-primary-foreground"
                >
                  Wybierz
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        {items.length > 0 && (
          <div className="mt-12 border border-border/60 rounded-lg p-6">
            <h3 className="font-display text-2xl mb-4">Twój koszyk</h3>
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
                  <li
                    key={pid}
                    className="py-3 border-b border-border/40 last:border-0"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-lg">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {unit} zł / szt. · {totalQty} szt.
                        </p>
                      </div>
                      <span className="text-sm text-gold whitespace-nowrap">
                        {unit * totalQty} zł
                      </span>
                    </div>
                    <ul className="space-y-2 pl-3 border-l border-border/40">
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
                              className="w-7 h-7 rounded-full border border-border hover:border-gold flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-sm">{i.qty}</span>
                            <button
                              onClick={() => add(i.productId, i.flavor)}
                              className="w-7 h-7 rounded-full border border-border hover:border-gold flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFlavor(i.productId, i.flavor)}
                              aria-label={`Usuń smak ${i.flavor}`}
                              className="ml-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="w-3 h-3" />
                              Usuń smak
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
                              className="px-3 py-1 rounded-full border border-border hover:border-gold text-xs text-muted-foreground hover:text-gold transition-colors inline-flex items-center gap-1"
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

        {count > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-gold/40 rounded-full pl-5 pr-2 py-2 flex items-center gap-3 sm:gap-4 shadow-gold z-40 whitespace-nowrap max-w-[calc(100vw-1.5rem)]">
            <span className="text-sm text-muted-foreground leading-none">
              {count} {count === 1 ? "produkt" : "produkty"}
            </span>
            <span className="font-display text-lg text-gold leading-none">{total} zł</span>
            <Link to="/zamowienie" className="shrink-0">
              <Button size="sm" className="rounded-full gradient-gold text-primary-foreground leading-none">
                Zamów
              </Button>
            </Link>
          </div>
        )}

        <footer className="mt-20 text-xs text-muted-foreground">
          © 2026 — kontakt: hello@maison.com
        </footer>
      </div>
    </main>
  );
};

export default Index;
