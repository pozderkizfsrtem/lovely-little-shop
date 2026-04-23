import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

type Product = { id: string; name: string; desc: string; price: number };

const products: Product[] = [
  { id: "zooy", name: "ZOOY", desc: "Klasyk w lekkiej formule.", price: 40 },
  { id: "zooy2", name: "ZOOY 2", desc: "Subtelniejsza odsłona.", price: 30 },
  { id: "jed", name: "JED", desc: "Bogata, premium kompozycja.", price: 60 },
  { id: "jed2", name: "JED 2", desc: "Limitowana, głęboka edycja.", price: 60 },
];

const Index = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const sub = (id: string) =>
    setCart((c) => {
      const n = { ...c, [id]: (c[id] || 0) - 1 };
      if (n[id] <= 0) delete n[id];
      return n;
    });

  const total = Object.entries(cart).reduce(
    (s, [id, q]) => s + (products.find((p) => p.id === id)?.price ?? 0) * q,
    0,
  );
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

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
            <li key={p.id} className="py-6 flex items-center gap-6">
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-2xl">{p.name}</h2>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
              <span className="font-display text-xl text-gold whitespace-nowrap">
                {p.price} zł
              </span>
              {cart[p.id] ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => sub(p.id)}
                    className="w-8 h-8 rounded-full border border-border hover:border-gold flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-5 text-center text-sm">{cart[p.id]}</span>
                  <button
                    onClick={() => add(p.id)}
                    className="w-8 h-8 rounded-full border border-border hover:border-gold flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <Button
                  onClick={() => add(p.id)}
                  size="sm"
                  className="rounded-full bg-foreground text-background hover:bg-gold hover:text-primary-foreground"
                >
                  Dodaj
                </Button>
              )}
            </li>
          ))}
        </ul>

        {count > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-gold/40 rounded-full pl-6 pr-2 py-2 flex items-center gap-4 shadow-gold">
            <span className="text-sm text-muted-foreground">
              {count} {count === 1 ? "produkt" : "produkty"}
            </span>
            <span className="font-display text-lg text-gold">{total} zł</span>
            <Button size="sm" className="rounded-full gradient-gold text-primary-foreground">
              Zamów
            </Button>
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
