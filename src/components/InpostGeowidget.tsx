import { useEffect, useRef, useState } from "react";

type Point = {
  name: string;
  address?: { line1?: string; line2?: string };
  address_details?: {
    street?: string;
    building_number?: string;
    city?: string;
    post_code?: string;
  };
};

type Props = {
  onSelect: (label: string) => void;
  language?: "pl" | "en" | "uk";
};

const SCRIPT_ID = "inpost-geowidget-script";
const STYLE_ID = "inpost-geowidget-style";
// Official InPost Geowidget v5 production CDN
const SCRIPT_SRC = "https://geowidget.easypack24.net/inpost-geowidget.js";
const STYLE_HREF = "https://geowidget.easypack24.net/inpost-geowidget.css";
// Public production token from InPost Geowidget v5 documentation
const PUBLIC_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfaWQiOiI1Njg5MmQ3OS05N2MwLTRkMDEtYjkzNi05N2Q1OTJjODI4ODYiLCJ1c2VyX2lkIjoiNTY4OTJkNzktOTdjMC00ZDAxLWI5MzYtOTdkNTkyYzgyODg2IiwiYXVkIjoiaHR0cHM6Ly9zYW5kYm94LWFwaS5zaGlweC1wbC5jb20iLCJpc3MiOiJzaGlweCIsImlhdCI6MTUxNjIzOTAyMn0._IiQX0J_2lZ8WwCEAkqJ8pXfgyfX3VZwKqXkQBxwI4U";

const ensureAssets = () =>
  new Promise<void>((resolve, reject) => {
    if (!document.getElementById(STYLE_ID)) {
      const link = document.createElement("link");
      link.id = STYLE_ID;
      link.rel = "stylesheet";
      link.href = STYLE_HREF;
      document.head.appendChild(link);
    }
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Nie udało się załadować mapy InPost"))
      );
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.defer = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () =>
      reject(new Error("Nie udało się załadować mapy InPost"));
    document.body.appendChild(script);
  });

const formatPoint = (p: Point): string => {
  const street =
    p.address?.line1 ||
    [p.address_details?.street, p.address_details?.building_number]
      .filter(Boolean)
      .join(" ");
  const city =
    p.address?.line2 ||
    [p.address_details?.post_code, p.address_details?.city]
      .filter(Boolean)
      .join(" ");
  return [p.name, street, city].filter(Boolean).join(", ");
};

const InpostGeowidget = ({ onSelect, language = "pl" }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    // Global callback for the widget's `onpoint` attribute
    const cbName = `__inpostOnPoint_${Math.random().toString(36).slice(2)}`;
    (window as unknown as Record<string, unknown>)[cbName] = (point: Point) => {
      if (point) onSelectRef.current(formatPoint(point));
    };

    let widgetEl: HTMLElement | null = null;
    const eventHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | Point
        | { target?: { point?: Point } }
        | undefined;
      if (!detail) return;
      // Some widget versions emit { target: { point } } shape
      const point: Point | undefined =
        (detail as { target?: { point?: Point } })?.target?.point ??
        (detail as Point);
      if (point && (point.name || point.address)) {
        onSelectRef.current(formatPoint(point));
      }
    };

    ensureAssets()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        const widget = document.createElement("inpost-geowidget");
        widget.setAttribute("token", PUBLIC_TOKEN);
        widget.setAttribute("language", language);
        widget.setAttribute("config", "parcelcollect");
        widget.setAttribute("onpoint", cbName);
        widget.style.width = "100%";
        widget.style.height = "100%";
        widget.style.display = "block";
        containerRef.current.appendChild(widget);
        widgetEl = widget;

        // Listen on multiple possible event names used across versions
        widget.addEventListener("onpoint", eventHandler as EventListener);
        widget.addEventListener("onpointselect", eventHandler as EventListener);
        widget.addEventListener("point.select", eventHandler as EventListener);
        setStatus("ready");
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setStatus("error");
        setErrorMsg(err.message || "Nie udało się załadować mapy");
      });

    return () => {
      cancelled = true;
      if (widgetEl) {
        widgetEl.removeEventListener("onpoint", eventHandler as EventListener);
        widgetEl.removeEventListener("onpointselect", eventHandler as EventListener);
        widgetEl.removeEventListener("point.select", eventHandler as EventListener);
      }
      delete (window as unknown as Record<string, unknown>)[cbName];
    };
  }, [language]);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div ref={containerRef} className="w-full h-full" />
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm pointer-events-none">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="h-8 w-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
            <p className="text-sm">Ładowanie mapy paczkomatów…</p>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <p className="text-sm text-destructive mb-2">{errorMsg}</p>
            <p className="text-xs text-muted-foreground">
              Sprawdź połączenie z internetem lub wpisz adres paczkomatu ręcznie.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InpostGeowidget;
