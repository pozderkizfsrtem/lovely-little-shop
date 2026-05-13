import { useMemo, useState, ReactNode } from "react";
import { products, unitPriceFor } from "@/data/products";
import { CartContext, CartItem } from "./cart-context";

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

  const removeFlavor = (productId: string, flavor: string) =>
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.flavor === flavor)));

  const clear = () => setItems([]);

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

    return { items, add, sub, removeFlavor, clear, count, total, qtyOfProduct, unitPriceOfProduct };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
