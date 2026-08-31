import InfoPage from "./InfoPage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLang } from "@/i18n/LanguageContext";

const Faq = () => {
  const { t } = useLang();
  const p = t.pages.faq;
  return (
    <InfoPage eyebrow={p.eyebrow} title={p.title}>
      <Accordion type="single" collapsible className="w-full">
        {p.items.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
            <AccordionTrigger className="text-foreground hover:text-gold text-left">{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </InfoPage>
  );
};

export default Faq;
