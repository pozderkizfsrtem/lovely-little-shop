import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

type Props = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

const InfoPage = ({ eyebrow, title, children }: Props) => {
  const { t } = useLang();
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backToShop ?? "← Wróć do sklepu"}
      </Link>
      <p className="text-primary text-xs uppercase tracking-[0.3em] mb-4">— {eyebrow}</p>
      <h1 className="font-display text-5xl md:text-6xl leading-tight mb-10">{title}</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_strong]:text-foreground">
        {children}
      </div>
      <div className="mt-12 pt-6 border-t border-border/50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backToShop ?? "Wróć do sklepu"}
        </Link>
      </div>
    </div>
  );
};

export default InfoPage;
