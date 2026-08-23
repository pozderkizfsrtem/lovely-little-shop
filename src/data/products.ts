const zooyImg = "/zooy-transparent.png";

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
  { minQty: 1, price: 50 },
  { minQty: 3, price: 40 },
  { minQty: 5, price: 36 },
  { minQty: 10, price: 32 },
  { minQty: 20, price: 30 },
  { minQty: 50, price: 28 },
];

export const products: Product[] = [
  {
    id: "zooy",
    name: "ZOOY",
    desc: "Klasyk w lekkiej formule.",
    longDesc:
      "Starannie opracowany liquid do e-papierosów o wyrazistym aromacie i dopracowanej kompozycji smakowej.",
    price: 40,
    image: zooyImg,
    flavors: [
      "Mixed Berry",
      "Grape Cherry",
      "Rainbow Candy",
      "Cola Ice",
      "Mr Blue",
      "Dragon Fruit",
      "Watermelon Ice",
      "Strawberry Watermelon",
      "Mango Peach Watermelon",
      "Kiwi Passion Guava",
      "Watermelon Redbull",
      "Apple Peach Ice",
      "Strawberry Raspberry",
      "Blueberry Strawberry Cranberry",
    ],
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
