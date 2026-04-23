import zooyImg from "@/assets/zooy.jpg";
import zooy2Img from "@/assets/zooy2.jpg";
import jedImg from "@/assets/jed.jpg";
import jed2Img from "@/assets/jed2.jpg";

export type Product = {
  id: string;
  name: string;
  desc: string;
  longDesc: string;
  price: number;
  image: string;
  flavors: string[];
};

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
  },
  {
    id: "zooy2",
    name: "ZOOY 2",
    desc: "Subtelniejsza odsłona.",
    longDesc:
      "Druga edycja kultowej linii — delikatniejsza, bardziej stonowana, z czystym profilem.",
    price: 30,
    image: zooy2Img,
    flavors: ["Klasyczny", "Bergamotka", "Zielona herbata"],
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
