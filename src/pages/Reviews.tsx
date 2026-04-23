import InfoPage from "./InfoPage";
import { Star } from "lucide-react";

const reviews = [
  { name: "Anna K.", rating: 5, text: "Doskonała jakość, szybka wysyłka. ZOOY to mój nowy ulubieniec." },
  { name: "Marek W.", rating: 5, text: "JED przerósł moje oczekiwania. Polecam każdemu." },
  { name: "Karolina S.", rating: 4, text: "Bardzo elegancko zapakowane, świetna obsługa." },
  { name: "Tomasz L.", rating: 5, text: "Wreszcie sklep, który stawia na jakość, a nie ilość." },
];

const Reviews = () => (
  <InfoPage eyebrow="Społeczność" title="Opinie klientów">
    <div className="not-prose space-y-4 mt-4">
      {reviews.map((r, i) => (
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
    </div>
  </InfoPage>
);

export default Reviews;
