import { useEffect, useMemo, useState, ReactNode } from "react";
import { products, unitPriceFor } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { CartContext, CartItem } from "./cart-context";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [stock, setStock] = useState<Record<string, number>>({});

  const refreshStock = async () => {
    const { data } = await supabase.functions.invoke("get-stock");
    if (data?.stock) setStock(data.stock);
  };

  useEffect(() => {
    refreshStock();
  }, []);

  const stockOf = (flavor: string) => stock[flavor.toLowerCase()] ?? 0;

  const add = (productId: string, flavor: string) =>
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId && i.flavor === flavor);
      const current = idx >= 0 ? prev[idx].qty : 0;
      if (current + 1 > stockOf(flavor)) return prev;
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: current + 1 };
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
    const total = items.reduce((s, i) => s + unitPriceOfProduct(i.productId) * i.qty, 0);

    return {
      items, add, sub, removeFlavor, clear, count, total, qtyOfProduct, unitPriceOfProduct,
      stock, stockOf, refreshStock,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, stock]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
