import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { products, unitPriceFor } from "@/data/products";

export type CartItem = { productId: string; flavor: string; qty: number };

type CartContextValue = {
  items: CartItem[];
  add: (productId: string, flavor: string) => void;
  sub: (productId: string, flavor: string) => void;
  /** Total quantity across all flavors of a product. */
  qtyOfProduct: (productId: string) => number;
  /** Current per-unit price for the product based on volume tiers. */
  unitPriceOfProduct: (productId: string) => number;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const keyOf = (i: CartItem) => `${i.productId}::${i.flavor}`;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (productId: string, flavor: string) =>
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId && i.flavor === flavor);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { productId, flavor, qty: 1 }];
    });

  const sub = (productId: string, flavor: string) =>
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.flavor === flavor ? { ...i, qty: i.qty - 1 } : i,
        )
        .filter((i) => i.qty > 0),
    );

  const value = useMemo(() => {
    const qtyOfProduct = (productId: string) =>
      items.filter((i) => i.productId === productId).reduce((s, i) => s + i.qty, 0);

    const unitPriceOfProduct = (productId: string) => {
      const p = products.find((p) => p.id === productId);
      if (!p) return 0;
      return unitPriceFor(p, qtyOfProduct(productId));
    };

    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce(
      (s, i) => s + unitPriceOfProduct(i.productId) * i.qty,
      0,
    );

    return { items, add, sub, count, total, qtyOfProduct, unitPriceOfProduct };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export { keyOf };
