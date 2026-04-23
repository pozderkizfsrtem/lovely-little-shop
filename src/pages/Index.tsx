import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Plus, Minus, X } from "lucide-react";

type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: string;
};

const products: Product[] = [
  {
    id: "zooy",
    name: "ZOOY",
    tagline: "Esencja codzienności",
    description: "Kultowy klasyk w nowej odsłonie. Lekka formuła, ponadczasowy charakter.",
    price: 40,
    category: "01 — Signature",
  },
  {
    id: "zooy2",
    name: "ZOOY 2",
    tagline: "Lżejsza odsłona",
    description: "Druga edycja kultowej linii. Subtelniejszy profil, ten sam charakter.",
    price: 30,
    category: "02 — Light",
  },
  {
    id: "jed",
    name: "JED",
    tagline: "Premium w czystej formie",
    description: "Bogata kompozycja stworzona z myślą o najbardziej wymagających.",
    price: 60,
    category: "03 — Premium",
  },
  {
    id: "jed2",
    name: "JED 2",
    tagline: "Limitowana edycja",
    description: "Wyrafinowana wariacja klasyki. Głęboka, pełna, niepowtarzalna.",
    price: 60,
    category: "04 — Limited",
  },
];

const Index = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id: string) =>
    setCart((c) => {
      const next = { ...c, [id]: (c[id] || 0) - 1 };
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="font-display text-2xl tracking-tight">
            Maison<span className="text-gold">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#kolekcja" className="hover:text-foreground transition-colors">Kolekcja</a>
            <a href="#historia" className="hover:text-foreground transition-colors">Historia</a>
            <a href="#kontakt" className="hover:text-foreground transition-colors">Kontakt</a>
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:border-gold transition-colors text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Koszyk</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-primary-foreground text-xs flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 grain overflow-hidden">
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-6">— Kolekcja 2026</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.95] mb-8">
              Cztery formy.<br />
              <span className="italic text-gold">Jedno</span> rzemiosło.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Starannie wyselekcjonowana kolekcja czterech produktów. Każdy ma swój charakter,
              swoją historię, swoje miejsce.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#kolekcja">
                <Button size="lg" className="rounded-full gradient-gold text-primary-foreground hover:opacity-90 shadow-gold">
                  Odkryj kolekcję
                </Button>
              </a>
              <a href="#historia">
                <Button size="lg" variant="outline" className="rounded-full border-border hover:border-gold">
                  Nasza historia
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute -right-32 top-1/4 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      </section>

      {/* Products */}
      <section id="kolekcja" className="py-24 border-t border-border/40">
        <div className="container">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <div>
              <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">— Kolekcja</p>
              <h2 className="font-display text-5xl md:text-6xl">Cztery wybory</h2>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Każdy produkt projektowany z osobną filozofią i przeznaczeniem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <article
                key={p.id}
                className="group relative bg-card border border-border/60 rounded-lg p-8 md:p-10 hover:border-gold/60 transition-all duration-500 hover:shadow-deep overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/15 transition-all duration-700" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {p.category}
                    </span>
                    <span className="font-display text-2xl text-gold">{p.price} zł</span>
                  </div>

                  {/* Visual placeholder */}
                  <div className="aspect-[4/3] rounded-md mb-8 relative overflow-hidden bg-gradient-to-br from-secondary to-background grain flex items-center justify-center">
                    <span className="font-display text-7xl md:text-8xl text-gold/30 group-hover:text-gold/50 transition-colors duration-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display text-4xl mb-2">{p.name}</h3>
                  <p className="text-gold text-sm italic mb-4">{p.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">{p.description}</p>

                  <div className="flex items-center justify-between gap-4">
                    <Button
                      onClick={() => addToCart(p.id)}
                      className="rounded-full bg-foreground text-background hover:bg-gold hover:text-primary-foreground transition-colors flex-1"
                    >
                      Dodaj do koszyka
                    </Button>
                    {cart[p.id] && (
                      <span className="text-sm text-gold font-medium">
                        ×{cart[p.id]}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="historia" className="py-24 border-t border-border/40 grain">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-6">— Historia</p>
            <h2 className="font-display text-5xl md:text-6xl mb-8 leading-tight">
              Mniej, ale <span className="italic text-gold">lepiej</span>.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Wierzymy, że prawdziwa jakość rodzi się z ograniczeń. Dlatego nasza kolekcja
              to tylko cztery produkty — każdy dopracowany w najmniejszym detalu.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Bez kompromisów. Bez nadmiaru. Tylko to, co naprawdę istotne.
            </p>
          </div>
          <div className="relative aspect-square rounded-lg bg-gradient-to-br from-secondary via-background to-secondary border border-border/40 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 grain" />
            <span className="font-display text-9xl text-gold/40 italic">M.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="border-t border-border/40 py-16">
        <div className="container grid md:grid-cols-3 gap-12">
          <div>
            <a href="#" className="font-display text-2xl">Maison<span className="text-gold">.</span></a>
            <p className="text-muted-foreground text-sm mt-4 max-w-xs">
              Kolekcja czterech wyselekcjonowanych produktów.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Kontakt</p>
            <p className="text-muted-foreground text-sm">hello@maison.com</p>
            <p className="text-muted-foreground text-sm">+48 600 000 000</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Newsletter</p>
            <p className="text-muted-foreground text-sm">Bądź na bieżąco z nowościami.</p>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-border/40 flex justify-between text-xs text-muted-foreground">
          <span>© 2026 Maison. Wszelkie prawa zastrzeżone.</span>
          <span>Made with care.</span>
        </div>
      </footer>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-card border-l border-border h-full flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-display text-2xl">Twój koszyk</h3>
              <button onClick={() => setCartOpen(false)} className="hover:text-gold transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6 space-y-4">
              {cartCount === 0 && (
                <p className="text-muted-foreground text-center py-12">Koszyk jest pusty</p>
              )}
              {Object.entries(cart).map(([id, qty]) => {
                const p = products.find((x) => x.id === id)!;
                return (
                  <div key={id} className="flex items-center gap-4 pb-4 border-b border-border/40">
                    <div className="w-16 h-16 rounded bg-secondary flex items-center justify-center font-display text-gold">
                      {p.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-lg">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.price} zł</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeFromCart(id)} className="w-7 h-7 rounded-full border border-border hover:border-gold flex items-center justify-center">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{qty}</span>
                      <button onClick={() => addToCart(id)} className="w-7 h-7 rounded-full border border-border hover:border-gold flex items-center justify-center">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {cartCount > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between font-display text-xl">
                  <span>Razem</span>
                  <span className="text-gold">{cartTotal} zł</span>
                </div>
                <Button className="w-full rounded-full gradient-gold text-primary-foreground shadow-gold">
                  Przejdź do kasy
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
