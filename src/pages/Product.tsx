import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { findProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? findProduct(id) : undefined;
  const { add } = useCart();
  const [flavor, setFlavor] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-muted-foreground mb-6">Nie znaleziono produktu.</p>
        <Link to="/" className="text-gold underline underline-offset-4">
          Wróć do sklepu
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (!flavor) return;
    add(product.id, flavor);
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Wróć do sklepu
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          width={768}
          height={768}
          className="w-full aspect-square object-cover rounded-lg border border-border/60"
        />

        <div>
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-3">— Produkt</p>
          <h1 className="font-display text-5xl mb-2">{product.name}</h1>
          <p className="font-display text-2xl text-gold mb-6">{product.price} zł</p>
          <p className="text-muted-foreground leading-relaxed mb-8">{product.longDesc}</p>

          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Wybierz smak
            </p>
            <div className="flex flex-wrap gap-2">
              {product.flavors.map((f) => {
                const active = flavor === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFlavor(f)}
                    className={`px-4 py-2 rounded-full border text-sm transition-colors flex items-center gap-2 ${
                      active
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-border hover:border-gold/60"
                    }`}
                  >
                    {active && <Check className="w-3 h-3" />}
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            onClick={handleAdd}
            disabled={!flavor}
            size="lg"
            className="w-full rounded-full gradient-gold text-primary-foreground shadow-gold disabled:opacity-50"
          >
            {flavor ? `Dodaj — ${flavor}` : "Wybierz smak"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
