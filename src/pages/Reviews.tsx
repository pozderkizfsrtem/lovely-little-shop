import InfoPage from "./InfoPage";
import { Star } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const Reviews = () => {
  const { t } = useLang();
  const p = t.pages.reviews;
  return (
    <InfoPage eyebrow={p.eyebrow} title={p.title}>
      <div className="not-prose space-y-4 mt-4">
        {p.items.map((r, i) => (
          <div key={i} className="border border-border/60 rounded-md p-6 bg-card">
            <div className="flex items-center gap-1 mb-3 text-gold">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-foreground mb-3 italic">„{r.text}"</p>
            <p className="text-sm text-muted-foreground">— {r.name}</p>
          </div>
        ))}
        <div className="pt-2">
          <a
            href="https://t.me/+aRSk2tlzymgxYWY0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:underline font-medium"
          >
            {p.channelLink} -&gt;
          </a>
        </div>
      </div>
    </InfoPage>
  );
};

export default Reviews;
