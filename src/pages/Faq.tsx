import InfoPage from "./InfoPage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Jak długo trwa wysyłka?", a: "Standardowo 1–2 dni robocze od momentu zaksięgowania płatności." },
  { q: "Czy mogę zmienić zamówienie po jego złożeniu?", a: "Tak, jeśli skontaktujesz się z nami w ciągu 12 godzin od złożenia." },
  { q: "Czy wysyłacie za granicę?", a: "Obecnie wysyłamy zamówienia tylko na terenie Polski." },
  { q: "Czy produkty są oryginalne?", a: "Tak, wszystkie produkty pochodzą bezpośrednio od producentów." },
  { q: "Jak skorzystać z gwarancji?", a: "Skontaktuj się z nami mailowo, dołączając numer zamówienia i opis problemu." },
];

const Faq = () => (
  <InfoPage eyebrow="Pomoc" title="Najczęstsze pytania">
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
          <AccordionTrigger className="text-foreground hover:text-gold text-left">{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </InfoPage>
);

export default Faq;
