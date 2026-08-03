import zooyAsset from "@/assets/zooy-transparent.png.asset.json";

export type PriceTier = { minQty: number; price: number };

export type Product = {
  id: string;
  name: string;
  desc: string;
  longDesc: string;
  price: number;
  image: string;
  flavors: string[];
  /** Volume pricing tiers (per unit). Sorted ascending by minQty. */
  tiers?: PriceTier[];
};

const zooyTiers: PriceTier[] = [
  { minQty: 1, price: 40 },
  { minQty: 20, price: 38 },
  { minQty: 50, price: 35 },
];

export const products: Product[] = [
  {
    id: "zooy",
    name: "ZOOY",
    desc: "Klasyk w lekkiej formule.",
    longDesc:
      "Kultowa receptura w nowoczesnej odsłonie. Lekka, zrównoważona kompozycja na każdą okazję.",
    price: 40,
    image: zooyAsset.url,
    flavors: ["Klasyczny", "Wanilia", "Cytrus", "Mięta"],
    tiers: zooyTiers,
  },
];

export const findProduct = (id: string) => products.find((p) => p.id === id);

/** Returns unit price for a given product at a given total quantity. */
export const unitPriceFor = (product: Product, qty: number): number => {
  if (!product.tiers || product.tiers.length === 0) return product.price;
  const sorted = [...product.tiers].sort((a, b) => a.minQty - b.minQty);
  let price = sorted[0].price;
  for (const t of sorted) {
    if (qty >= t.minQty) price = t.price;
  }
  return price;
};
