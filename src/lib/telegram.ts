// Telegram WebApp helper. Safe to import outside Telegram (returns null).
type TgUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
};

type TgWebApp = {
  ready: () => void;
  expand: () => void;
  initDataUnsafe?: { user?: TgUser };
  colorScheme?: "light" | "dark";
  themeParams?: Record<string, string>;
  setHeaderColor?: (c: string) => void;
  setBackgroundColor?: (c: string) => void;
  BackButton?: {
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
};

export const getTg = (): TgWebApp | null => {
  if (typeof window === "undefined") return null;
  const tg = (window as unknown as { Telegram?: { WebApp?: TgWebApp } }).Telegram?.WebApp;
  return tg ?? null;
};

export const initTelegram = () => {
  const tg = getTg();
  if (!tg) return;
  try {
    tg.ready();
    tg.expand();
    // Match the boutique dark theme
    tg.setHeaderColor?.("#0a0a0a");
    tg.setBackgroundColor?.("#0a0a0a");
  } catch {
    // ignore
  }
};

export const getTelegramUser = (): TgUser | null => {
  return getTg()?.initDataUnsafe?.user ?? null;
};
