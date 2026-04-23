import zooyImg from "@/assets/zooy.jpg";
import zooy2Img from "@/assets/zooy2.jpg";
import jedImg from "@/assets/jed.jpg";
import jed2Img from "@/assets/jed2.jpg";

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
    image: zooyImg,
    flavors: ["Klasyczny", "Wanilia", "Cytrus", "Mięta"],
    tiers: zooyTiers,
  },
  {
    id: "zooy2",
    name: "ZOOY 2",
    desc: "Subtelniejsza odsłona.",
    longDesc:
      "Druga edycja kultowej linii — delikatniejsza, bardziej stonowana, z czystym profilem.",
    price: 40,
    image: zooy2Img,
    flavors: ["Klasyczny", "Bergamotka", "Zielona herbata"],
    tiers: zooyTiers,
  },
  {
    id: "jed",
    name: "JED",
    desc: "Bogata, premium kompozycja.",
    longDesc:
      "Bogata kompozycja stworzona z myślą o najbardziej wymagających. Pełnia smaku w każdym detalu.",
    price: 60,
    image: jedImg,
    flavors: ["Karmel", "Czekolada", "Espresso", "Whisky", "Tytoń"],
  },
  {
    id: "jed2",
    name: "JED 2",
    desc: "Limitowana, głęboka edycja.",
    longDesc:
      "Wyrafinowana wariacja klasyki. Głęboka, pełna i niepowtarzalna — dla kolekcjonerów.",
    price: 60,
    image: jed2Img,
    flavors: ["Wiśnia", "Dąb", "Kardamon", "Trufla"],
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
