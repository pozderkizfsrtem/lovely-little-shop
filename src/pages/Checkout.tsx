import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/useCart";
import { findProduct } from "@/data/products";
import { toast } from "sonner";

const schema = z.object({
  firstName: z.string().trim().min(1, "Podaj imię").max(60),
  lastName: z.string().trim().min(1, "Podaj nazwisko").max(60),
  email: z.string().trim().email("Nieprawidłowy email").max(255),
  phone: z
    .string()
    .trim()
    .min(9, "Podaj numer telefonu")
    .max(20)
    .regex(/^[+\d\s-]+$/, "Nieprawidłowy numer"),
  paczkomat: z.string().trim().min(3, "Podaj adres paczkomatu").max(120),
});

const Checkout = () => {
  const { items, total, count, unitPriceOfProduct } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paczkomat: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    toast.success("Zamówienie złożone — dziękujemy!");
    navigate("/");
  };

  if (count === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">— Zamówienie</p>
        <h1 className="font-display text-4xl mb-6">Twój koszyk jest pusty</h1>
        <Link to="/">
          <Button className="rounded-full">Wróć do sklepu</Button>
        </Link>
      </div>
    );
  }

  const grouped = Array.from(new Set(items.map((i) => i.productId)));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">— Zamówienie</p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-10">
          Dane do <span className="italic text-gold">wysyłki</span>
        </h1>

        <div className="border border-border/60 rounded-lg p-6 mb-8">
          <h2 className="font-display text-xl mb-4">Podsumowanie</h2>
          <ul className="space-y-2 text-sm">
            {grouped.map((pid) => {
              const p = findProduct(pid);
              if (!p) return null;
              const lines = items.filter((i) => i.productId === pid);
              const qty = lines.reduce((s, i) => s + i.qty, 0);
              const unit = unitPriceOfProduct(pid);
              return (
                <li key={pid} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {p.name} · {lines.map((l) => `${l.flavor} ×${l.qty}`).join(", ")}
                  </span>
                  <span className="text-gold whitespace-nowrap">{unit * qty} zł</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 pt-4 border-t border-border/40 flex justify-between font-display text-lg">
            <span>Razem</span>
            <span className="text-gold">{total} zł</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Imię</Label>
              <Input id="firstName" value={form.firstName} onChange={set("firstName")} className="mt-1.5" />
              {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Nazwisko</Label>
              <Input id="lastName" value={form.lastName} onChange={set("lastName")} className="mt-1.5" />
              {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={set("email")} className="mt-1.5" />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Numer telefonu</Label>
            <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} className="mt-1.5" />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>
          <div>
            <Label htmlFor="paczkomat">Adres paczkomatu</Label>
            <Input
              id="paczkomat"
              placeholder="np. WAW123M, ul. Przykładowa 1"
              value={form.paczkomat}
              onChange={set("paczkomat")}
              className="mt-1.5"
            />
            {errors.paczkomat && <p className="text-xs text-destructive mt-1">{errors.paczkomat}</p>}
          </div>

          <div className="flex items-center justify-between pt-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-gold">
              ← Wróć do sklepu
            </Link>
            <Button type="submit" className="rounded-full gradient-gold text-primary-foreground px-8">
              Złóż zamówienie · {total} zł
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
