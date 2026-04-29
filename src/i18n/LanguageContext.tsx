import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, type Lang, type Translation } from "./translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translation;
  tFlavor: (f: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (stored === "PL" || stored === "EN" || stored === "UA") return stored;
    return "PL";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const t = translations[lang];
  const tFlavor = (f: string) => t.flavors[f] ?? f;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tFlavor }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
