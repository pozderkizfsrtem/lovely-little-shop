import { createContext } from "react";

export type CartItem = { productId: string; flavor: string; qty: number };

export type CartContextValue = {
  items: CartItem[];
  add: (productId: string, flavor: string) => void;
  sub: (productId: string, flavor: string) => void;
  removeFlavor: (productId: string, flavor: string) => void;
  qtyOfProduct: (productId: string) => number;
  unitPriceOfProduct: (productId: string) => number;
  count: number;
  total: number;
};

export const CartContext = createContext<CartContextValue | null>(null);
