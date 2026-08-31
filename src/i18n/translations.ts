export type Lang = "PL" | "EN" | "UA";

type InfoPageDict = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

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
  backToShop: string;
  pickFlavor: string;
  productDesc: string;
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
  pages: {
    about: InfoPageDict & { contactHeading: string; contactValue: string };
    delivery: InfoPageDict;
    payment: InfoPageDict;
    returns: InfoPageDict;
    promotions: InfoPageDict;
    contact: InfoPageDict & { emailHeading: string; emailValue: string };
    faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
    reviews: {
      eyebrow: string;
      title: string;
      items: { name: string; rating: number; text: string }[];
      channelLink: string;
    };
  };
  checkout: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    emptyTitle: string;
    summary: string;
    totalLabel: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    locker: string;
    lockerPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    failPrefix: string;
    unknownError: string;
    sendError: string;
    errFirstName: string;
    errLastName: string;
    errEmail: string;
    errPhone: string;
    errPhoneFormat: string;
    errLocker: string;
  };
  flavors: Record<string, string>;
};

const FLAVORS = {
  "Mixed Berry": "Mixed Berry",
  "Grape Cherry": "Grape Cherry",
  "Rainbow Candy": "Rainbow Candy",
  "Cola Ice": "Cola Ice",
  "Mr Blue": "Mr Blue",
  "Dragon Fruit": "Dragon Fruit",
  "Watermelon Ice": "Watermelon Ice",
  "Strawberry Watermelon": "Strawberry Watermelon",
  "Mango Peach Watermelon": "Mango Peach Watermelon",
  "Kiwi Passion Guava": "Kiwi Passion Guava",
  "Watermelon Redbull": "Watermelon Redbull",
  "Apple Peach Ice": "Apple Peach Ice",
  "Strawberry Raspberry": "Strawberry Raspberry",
  "Blueberry Strawberry Cranberry": "Blueberry Strawberry Cranberry",
} as Record<string, string>;

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
    smartPriceInfo:
      "Smart Cena to automatyczna zniżka ilościowa — im więcej sztuk zamówisz, tym niższa cena za sztukę. Progi rabatowe są widoczne na karcie produktu.",
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
    footer: "© 2026 PuffBot",
    backToShop: "Wróć do sklepu",
    pickFlavor: "Wybierz smak",
    productDesc:
      "Starannie opracowany liquid do e-papierosów o wyrazistym aromacie i dopracowanej kompozycji smakowej.",
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
    pages: {
      about: {
        eyebrow: "Sklep",
        title: "O sklepie",
        paragraphs: [
          "Najlepsze liquidy w jednym miejscu. Szeroki wybór smaków, mocne aromaty i sprawdzone produkty w dobrych cenach. Szybka realizacja zamówień i regularne nowości dla każdego vape enjoyera.",
        ],
        contactHeading: "Kontakt",
        contactValue: "@PuffBotMenager",
      },
      delivery: {
        eyebrow: "Informacje",
        title: "Dostawa",
        paragraphs: [
          "Wysyłamy zamówienia na terenie całego kraju wygodnymi metodami dostawy.",
          "Standardowy czas dostawy to 1-3 dni robocze od momentu potwierdzenia zamówienia.",
          "Koszt dostawy zależy od wybranej opcji i widoczny jest w trakcie składania zamówienia.",
          "Po wysłaniu przesyłki otrzymasz numer śledzenia, aby sprawdzać status paczki.",
        ],
      },
      payment: {
        eyebrow: "Informacje",
        title: "Płatność",
        paragraphs: [
          "Możesz zapłacić z góry online lub przy odbiorze — wybierz dogodną metodę.",
          "Akceptujemy płatności kartą, bezpieczne serwisy online oraz pobranie.",
          "Wszystkie transakcje są zabezpieczone nowoczesnymi technologiami szyfrowania.",
          "Po udanej płatności otrzymasz potwierdzenie oraz paragon na e-mail.",
        ],
      },
      returns: {
        eyebrow: "Polityka",
        title: "Zwroty i wymiany",
        paragraphs: [
          "Masz 14 dni na zwrot produktu, o ile nie był używany.",
          "Zachowaj oryginalne opakowanie i akcesoria, aby przyspieszyć proces.",
          "Skontaktuj się z naszym wsparciem, które wyjaśni, jak krok po kroku dokonać zwrotu.",
          "Każdą sprawę rozpatrujemy indywidualnie, aby jak najszybciej znaleźć rozwiązanie.",
        ],
      },
      promotions: {
        eyebrow: "Informacje",
        title: "Zasady promocji",
        paragraphs: [
          "Promocje obowiązują przez ograniczony czas lub do wyczerpania zapasów.",
          "Zniżki nie sumują się, chyba że warunki promocji mówią inaczej.",
          "Niektóre akcje wymagają kodu rabatowego lub minimalnej wartości zamówienia.",
          "Śledź nasze aktualizacje — regularnie przygotowujemy nowe oferty.",
        ],
      },
      contact: {
        eyebrow: "Skontaktuj się",
        title: "Kontakt",
        paragraphs: ["Masz pytania? Chętnie pomożemy."],
        emailHeading: "Kontakt",
        emailValue: "@PuffBotMenager",
      },
      faq: {
        eyebrow: "Pomoc",
        title: "Najczęstsze pytania",
        items: [
          { q: "Jak długo trwa wysyłka?", a: "Standardowo 1–2 dni robocze od momentu zaksięgowania płatności." },
          {
            q: "Czy mogę zmienić zamówienie po jego złożeniu?",
            a: "Tak, jeśli skontaktujesz się z nami w ciągu 12 godzin od złożenia.",
          },
          { q: "Czy wysyłacie za granicę?", a: "Obecnie wysyłamy zamówienia tylko na terenie Polski." },
          { q: "Czy produkty są oryginalne?", a: "Tak, wszystkie produkty pochodzą bezpośrednio od producentów." },
          {
            q: "Jak skorzystać z gwarancji?",
            a: "Skontaktuj się z nami, dołączając numer zamówienia i opis problemu.",
          },
        ],
      },
      reviews: {
        eyebrow: "Społeczność",
        title: "Opinie klientów",
        items: [
          { name: "Anna K.", rating: 5, text: "Doskonała jakość, szybka wysyłka. ZOOY to mój nowy ulubieniec." },
          { name: "Marek W.", rating: 5, text: "Smaki przerosły moje oczekiwania. Polecam każdemu." },
          { name: "Karolina S.", rating: 4, text: "Bardzo elegancko zapakowane, świetna obsługa." },
          { name: "Tomasz L.", rating: 5, text: "Wreszcie sklep, który stawia na jakość, a nie ilość." },
        ],
        channelLink: "kanał z opiniami",
      },
    },
    checkout: {
      eyebrow: "Zamówienie",
      titlePrefix: "Dane do",
      titleAccent: "wysyłki",
      emptyTitle: "Twój koszyk jest pusty",
      summary: "Podsumowanie",
      totalLabel: "Razem",
      firstName: "Imię",
      lastName: "Nazwisko",
      email: "Email",
      phone: "Numer telefonu",
      locker: "Adres paczkomatu",
      lockerPlaceholder: "np. WAW123M, ul. Przykładowa 1",
      submit: "Złóż zamówienie",
      submitting: "Wysyłanie…",
      success: "Menadżer niedługo się z Tobą skontaktuje",
      failPrefix: "Nie udało się wysłać zamówienia",
      unknownError: "Nieznany błąd",
      sendError: "Błąd wysyłki",
      errFirstName: "Podaj imię",
      errLastName: "Podaj nazwisko",
      errEmail: "Nieprawidłowy email",
      errPhone: "Podaj numer telefonu",
      errPhoneFormat: "Nieprawidłowy numer",
      errLocker: "Podaj adres paczkomatu",
    },
    flavors: FLAVORS,
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
    smartPrice: "Smart Price",
    smartPriceInfo:
      "Smart Price is an automatic volume discount — the more units you order, the lower the price per piece. Discount tiers are shown on the product card.",
    pickFromMap: "Pick from map",
    pickParcelLocker: "Choose InPost parcel locker",
    selectedLocker: "Selected locker",
    close: "Close",
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
    footer: "© 2026 PuffBot",
    backToShop: "Back to shop",
    pickFlavor: "Choose a flavor",
    productDesc:
      "A carefully crafted e-liquid with a bold aroma and a refined flavor composition.",
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
    pages: {
      about: {
        eyebrow: "Store",
        title: "About the store",
        paragraphs: [
          "The best e-liquids in one place. A wide choice of flavors, strong aromas and proven products at good prices. Fast order processing and regular new arrivals for every vape enjoyer.",
        ],
        contactHeading: "Contact",
        contactValue: "@PuffBotMenager",
      },
      delivery: {
        eyebrow: "Information",
        title: "Delivery",
        paragraphs: [
          "We ship orders nationwide using convenient delivery methods.",
          "Standard delivery time is 1-3 business days from order confirmation.",
          "Delivery cost depends on the option you choose and is shown during checkout.",
          "Once shipped, you will receive a tracking number to follow your parcel.",
        ],
      },
      payment: {
        eyebrow: "Information",
        title: "Payment",
        paragraphs: [
          "You can pay online in advance or on delivery — pick whatever suits you.",
          "We accept card payments, secure online services and cash on delivery.",
          "All transactions are protected with modern encryption technologies.",
          "After a successful payment you will receive a confirmation and a receipt by email.",
        ],
      },
      returns: {
        eyebrow: "Policy",
        title: "Returns & exchanges",
        paragraphs: [
          "You have 14 days to return a product as long as it has not been used.",
          "Keep the original packaging and accessories to speed up the process.",
          "Contact our support and we will explain the return process step by step.",
          "We handle every case individually to find a solution as quickly as possible.",
        ],
      },
      promotions: {
        eyebrow: "Information",
        title: "Promotion rules",
        paragraphs: [
          "Promotions are valid for a limited time or while stocks last.",
          "Discounts do not stack unless the promotion terms say otherwise.",
          "Some campaigns require a discount code or a minimum order value.",
          "Follow our updates — we prepare new offers regularly.",
        ],
      },
      contact: {
        eyebrow: "Get in touch",
        title: "Contact",
        paragraphs: ["Have questions? We are happy to help."],
        emailHeading: "Contact",
        emailValue: "@PuffBotMenager",
      },
      faq: {
        eyebrow: "Help",
        title: "Frequently asked questions",
        items: [
          { q: "How long does shipping take?", a: "Usually 1–2 business days after the payment is registered." },
          { q: "Can I change my order after placing it?", a: "Yes, if you contact us within 12 hours of placing it." },
          { q: "Do you ship abroad?", a: "Currently we ship orders within Poland only." },
          { q: "Are the products original?", a: "Yes, all products come directly from the manufacturers." },
          { q: "How do I use the warranty?", a: "Contact us with your order number and a description of the issue." },
        ],
      },
      reviews: {
        eyebrow: "Community",
        title: "Customer reviews",
        items: [
          { name: "Anna K.", rating: 5, text: "Excellent quality, fast shipping. ZOOY is my new favorite." },
          { name: "Marek W.", rating: 5, text: "The flavors exceeded my expectations. Highly recommended." },
          { name: "Karolina S.", rating: 4, text: "Very neatly packed, great service." },
          { name: "Tomasz L.", rating: 5, text: "Finally a store that focuses on quality, not quantity." },
        ],
        channelLink: "reviews channel",
      },
    },
    checkout: {
      eyebrow: "Order",
      titlePrefix: "Shipping",
      titleAccent: "details",
      emptyTitle: "Your cart is empty",
      summary: "Summary",
      totalLabel: "Total",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone number",
      locker: "Parcel locker address",
      lockerPlaceholder: "e.g. WAW123M, Example St. 1",
      submit: "Place order",
      submitting: "Sending…",
      success: "A manager will contact you shortly",
      failPrefix: "Could not send the order",
      unknownError: "Unknown error",
      sendError: "Sending error",
      errFirstName: "Enter your first name",
      errLastName: "Enter your last name",
      errEmail: "Invalid email",
      errPhone: "Enter your phone number",
      errPhoneFormat: "Invalid number",
      errLocker: "Enter the parcel locker address",
    },
    flavors: FLAVORS,
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
    smartPrice: "Smart Ціна",
    smartPriceInfo:
      "Smart Ціна — це автоматична знижка за кількість: чим більше штук ви замовляєте, тим нижча ціна за штуку. Пороги знижок показані на картці товару.",
    pickFromMap: "Обрати на мапі",
    pickParcelLocker: "Оберіть поштомат InPost",
    selectedLocker: "Обраний поштомат",
    close: "Закрити",
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
    footer: "© 2026 PuffBot",
    backToShop: "Повернутися до магазину",
    pickFlavor: "Оберіть смак",
    productDesc:
      "Ретельно розроблена рідина для електронних сигарет з виразним ароматом і продуманою смаковою композицією.",
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
    pages: {
      about: {
        eyebrow: "Магазин",
        title: "Про магазин",
        paragraphs: [
          "Найкращі рідини в одному місці. Широкий вибір смаків, насичені аромати та перевірені товари за хорошими цінами. Швидке виконання замовлень і регулярні новинки для кожного вейпера.",
        ],
        contactHeading: "Контакти",
        contactValue: "@PuffBotMenager",
      },
      delivery: {
        eyebrow: "Інформація",
        title: "Доставка",
        paragraphs: [
          "Надсилаємо замовлення по всій країні зручними способами доставки.",
          "Стандартний час доставки — 1-3 робочі дні з моменту підтвердження замовлення.",
          "Вартість доставки залежить від обраного способу та показується під час оформлення.",
          "Після відправлення ви отримаєте номер для відстеження посилки.",
        ],
      },
      payment: {
        eyebrow: "Інформація",
        title: "Оплата",
        paragraphs: [
          "Можна оплатити онлайн наперед або при отриманні — обирайте зручний спосіб.",
          "Приймаємо оплату картою, безпечні онлайн-сервіси та оплату при отриманні.",
          "Усі транзакції захищені сучасними технологіями шифрування.",
          "Після успішної оплати ви отримаєте підтвердження та чек на e-mail.",
        ],
      },
      returns: {
        eyebrow: "Політика",
        title: "Повернення та обмін",
        paragraphs: [
          "У вас є 14 днів на повернення товару, якщо він не був використаний.",
          "Збережіть оригінальну упаковку та аксесуари, щоб прискорити процес.",
          "Зв'яжіться з нашою підтримкою — ми крок за кроком пояснимо процедуру повернення.",
          "Кожен випадок розглядаємо індивідуально, щоб швидше знайти рішення.",
        ],
      },
      promotions: {
        eyebrow: "Інформація",
        title: "Правила акцій",
        paragraphs: [
          "Акції діють обмежений час або до вичерпання запасів.",
          "Знижки не сумуються, якщо умови акції не вказують інше.",
          "Деякі акції вимагають промокод або мінімальну суму замовлення.",
          "Слідкуйте за оновленнями — ми регулярно готуємо нові пропозиції.",
        ],
      },
      contact: {
        eyebrow: "Звʼяжіться з нами",
        title: "Контакти",
        paragraphs: ["Маєте питання? Ми з радістю допоможемо."],
        emailHeading: "Контакти",
        emailValue: "@PuffBotMenager",
      },
      faq: {
        eyebrow: "Допомога",
        title: "Часті запитання",
        items: [
          { q: "Скільки триває доставка?", a: "Зазвичай 1–2 робочі дні після зарахування оплати." },
          { q: "Чи можу я змінити замовлення після оформлення?", a: "Так, якщо звернетеся до нас протягом 12 годин." },
          { q: "Чи надсилаєте за кордон?", a: "Наразі надсилаємо замовлення лише на території Польщі." },
          { q: "Чи товари оригінальні?", a: "Так, усі товари надходять безпосередньо від виробників." },
          { q: "Як скористатися гарантією?", a: "Напишіть нам, додавши номер замовлення та опис проблеми." },
        ],
      },
      reviews: {
        eyebrow: "Спільнота",
        title: "Відгуки клієнтів",
        items: [
          { name: "Анна К.", rating: 5, text: "Відмінна якість, швидка доставка. ZOOY — мій новий улюбленець." },
          { name: "Марек В.", rating: 5, text: "Смаки перевищили мої очікування. Рекомендую всім." },
          { name: "Кароліна С.", rating: 4, text: "Дуже гарно запаковано, чудовий сервіс." },
          { name: "Томаш Л.", rating: 5, text: "Нарешті магазин, що робить ставку на якість, а не кількість." },
        ],
        channelLink: "канал з відгуками",
      },
    },
    checkout: {
      eyebrow: "Замовлення",
      titlePrefix: "Дані для",
      titleAccent: "доставки",
      emptyTitle: "Ваш кошик порожній",
      summary: "Підсумок",
      totalLabel: "Разом",
      firstName: "Імʼя",
      lastName: "Прізвище",
      email: "Email",
      phone: "Номер телефону",
      locker: "Адреса поштомату",
      lockerPlaceholder: "напр. WAW123M, вул.Приклад 1",
      submit: "Оформити замовлення",
      submitting: "Надсилання…",
      success: "Менеджер незабаром звʼяжеться з вами",
      failPrefix: "Не вдалося надіслати замовлення",
      unknownError: "Невідома помилка",
      sendError: "Помилка надсилання",
      errFirstName: "Вкажіть імʼя",
      errLastName: "Вкажіть прізвище",
      errEmail: "Некоректний email",
      errPhone: "Вкажіть номер телефону",
      errPhoneFormat: "Некоректний номер",
      errLocker: "Вкажіть адресу поштомату",
    },
    flavors: FLAVORS,
  },
};

export type Translation = Dict;
