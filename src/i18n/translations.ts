export type Lang = "PL" | "EN" | "UA";

type Dict = {
  searchPlaceholder: string;
  cart: string;
  menu: string;
  language: string;
  sort: string;
  sortNameAsc: string;
  sortNameDesc: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  smartPrice: string;
  smartPriceInfo: string;
  pickFromMap: string;
  pickParcelLocker: string;
  selectedLocker: string;
  close: string;
  choose: string;
  order: string;
  pcs: string;
  perPiece: string;
  currency: string;
  yourCart: string;
  fromQty: string;
  pieces: string;
  availableFlavors: string;
  remove: string;
  removeFlavor: string;
  footer: string;
  nav: {
    shop: string;
    about: string;
    delivery: string;
    payment: string;
    returns: string;
    promotions: string;
    faq: string;
    reviews: string;
    contact: string;
  };
  flavors: Record<string, string>;
};

export const translations: Record<Lang, Dict> = {
  PL: {
    searchPlaceholder: "Szukaj produktów...",
    cart: "Koszyk",
    menu: "Menu",
    language: "Język",
    sort: "Sortowanie",
    sortNameAsc: "Nazwa: A → Z",
    sortNameDesc: "Nazwa: Z → A",
    sortPriceAsc: "Cena: rosnąco",
    sortPriceDesc: "Cena: malejąco",
    smartPrice: "Smart Cena",
    smartPriceInfo: "Smart Cena to automatyczna zniżka ilościowa — im więcej sztuk zamówisz, tym niższa cena za sztukę. Progi rabatowe są widoczne na karcie produktu.",
    pickFromMap: "Wybierz z mapy",
    pickParcelLocker: "Wybierz paczkomat InPost",
    selectedLocker: "Wybrany paczkomat",
    close: "Zamknij",
    choose: "Wybierz",
    order: "Zamów",
    pcs: "szt.",
    perPiece: "zł / szt.",
    currency: "zł",
    yourCart: "Twój koszyk",
    fromQty: "od",
    pieces: "szt",
    availableFlavors: "Dostępne smaki",
    remove: "Usuń",
    removeFlavor: "Usuń smak",
    footer: "© 2026 PuffBot — hello@maison.com",
    nav: {
      shop: "Sklep",
      about: "O sklepie",
      delivery: "Dostawa",
      payment: "Płatność",
      returns: "Zwroty i wymiany",
      promotions: "Zasady promocji",
      faq: "Najczęstsze pytania",
      reviews: "Opinie klientów",
      contact: "Kontakt",
    },
    flavors: {
      Klasyczny: "Klasyczny",
      Wanilia: "Wanilia",
      Cytrus: "Cytrus",
      Mięta: "Mięta",
      Bergamotka: "Bergamotka",
      "Zielona herbata": "Zielona herbata",
      Karmel: "Karmel",
      Czekolada: "Czekolada",
      Espresso: "Espresso",
      Whisky: "Whisky",
      Tytoń: "Tytoń",
      Wiśnia: "Wiśnia",
      Dąb: "Dąb",
      Kardamon: "Kardamon",
      Trufla: "Trufla",
    } as Record<string, string>,
  },
  EN: {
    searchPlaceholder: "Search products...",
    cart: "Cart",
    menu: "Menu",
    language: "Language",
    sort: "Sort",
    sortNameAsc: "Name: A → Z",
    sortNameDesc: "Name: Z → A",
    sortPriceAsc: "Price: low to high",
    sortPriceDesc: "Price: high to low",
    smartPriceInfo: "Smart Price is an automatic volume discount — the more units you order, the lower the price per piece. Discount tiers are shown on each product card.",
    pickFromMap: "Pick from map",
    pickParcelLocker: "Choose InPost parcel locker",
    selectedLocker: "Selected locker",
    close: "Close",
    smartPrice: "Smart Price",
    choose: "Choose",
    order: "Order",
    pcs: "pcs",
    perPiece: "PLN / pc",
    currency: "PLN",
    yourCart: "Your cart",
    fromQty: "from",
    pieces: "pcs",
    availableFlavors: "Available flavors",
    remove: "Remove",
    removeFlavor: "Remove flavor",
    footer: "© 2026 PuffBot — hello@maison.com",
    nav: {
      shop: "Shop",
      about: "About",
      delivery: "Delivery",
      payment: "Payment",
      returns: "Returns & exchanges",
      promotions: "Promotions",
      faq: "FAQ",
      reviews: "Reviews",
      contact: "Contact",
    },
    flavors: {
      Klasyczny: "Classic",
      Wanilia: "Vanilla",
      Cytrus: "Citrus",
      Mięta: "Mint",
      Bergamotka: "Bergamot",
      "Zielona herbata": "Green tea",
      Karmel: "Caramel",
      Czekolada: "Chocolate",
      Espresso: "Espresso",
      Whisky: "Whisky",
      Tytoń: "Tobacco",
      Wiśnia: "Cherry",
      Dąb: "Oak",
      Kardamon: "Cardamom",
      Trufla: "Truffle",
    } as Record<string, string>,
  },
  UA: {
    searchPlaceholder: "Пошук товарів...",
    cart: "Кошик",
    menu: "Меню",
    language: "Мова",
    sort: "Сортування",
    sortNameAsc: "Назва: А → Я",
    sortNameDesc: "Назва: Я → А",
    sortPriceAsc: "Ціна: за зростанням",
    sortPriceDesc: "Ціна: за спаданням",
    smartPriceInfo: "Smart Ціна — це автоматична знижка за кількість: чим більше штук ви замовляєте, тим нижча ціна за штуку. Пороги знижок показані на картці товару.",
    pickFromMap: "Обрати на мапі",
    pickParcelLocker: "Оберіть поштомат InPost",
    selectedLocker: "Обраний поштомат",
    close: "Закрити",
    smartPrice: "Smart Ціна",
    choose: "Обрати",
    order: "Замовити",
    pcs: "шт.",
    perPiece: "zł / шт.",
    currency: "zł",
    yourCart: "Ваш кошик",
    fromQty: "від",
    pieces: "шт",
    availableFlavors: "Доступні смаки",
    remove: "Видалити",
    removeFlavor: "Видалити смак",
    footer: "© 2026 PuffBot — hello@maison.com",
    nav: {
      shop: "Магазин",
      about: "Про магазин",
      delivery: "Доставка",
      payment: "Оплата",
      returns: "Повернення та обмін",
      promotions: "Правила акцій",
      faq: "Часті запитання",
      reviews: "Відгуки клієнтів",
      contact: "Контакти",
    },
    flavors: {
      Klasyczny: "Класичний",
      Wanilia: "Ваніль",
      Cytrus: "Цитрус",
      Mięta: "М'ята",
      Bergamotka: "Бергамот",
      "Zielona herbata": "Зелений чай",
      Karmel: "Карамель",
      Czekolada: "Шоколад",
      Espresso: "Еспресо",
      Whisky: "Віскі",
      Tytoń: "Тютюн",
      Wiśnia: "Вишня",
      Dąb: "Дуб",
      Kardamon: "Кардамон",
      Trufla: "Трюфель",
    } as Record<string, string>,
  },
};

export type Translation = Dict;
