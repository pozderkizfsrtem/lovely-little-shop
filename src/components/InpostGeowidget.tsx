import { useEffect, useRef } from "react";

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
const SCRIPT_SRC = "https://geowidget.inpost.pl/inpost-geowidget.js";
const STYLE_HREF = "https://geowidget.inpost.pl/inpost-geowidget.css";
// Public sandbox token from InPost documentation
const PUBLIC_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEifQ.eyJqdGkiOiI2ODY1OWY0Ny01NTBlLTQyMmYtYTRlMi05Y2NjMTg4ZjBkOWMiLCJpYXQiOjE3MDU2NjU2OTUsInVzZXIiOnsiZW1haWwiOiJzYW5kYm94QGV4YW1wbGUuY29tIn19.";

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

  useEffect(() => {
    let cancelled = false;
    // Register global callback referenced by the widget's onpoint attr
    const cbName = `__inpostOnPoint_${Math.random().toString(36).slice(2)}`;
    (window as unknown as Record<string, unknown>)[cbName] = (point: Point) => {
      if (point) onSelectRef.current(formatPoint(point));
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

        // Fallback: also listen for the onpointselect event
        const handler = (e: Event) => {
          const detail = (e as CustomEvent).detail as Point | undefined;
          if (detail) onSelectRef.current(formatPoint(detail));
        };
        widget.addEventListener("onpointselect", handler);
      })
      .catch((err) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div style="padding:1rem;color:#fff">${err.message}</div>`;
        }
      });

    return () => {
      cancelled = true;
      delete (window as unknown as Record<string, unknown>)[cbName];
    };
  }, [language]);

  return <div ref={containerRef} className="w-full h-full min-h-[500px]" />;
};

export default InpostGeowidget;
