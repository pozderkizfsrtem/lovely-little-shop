import InfoPage from "./InfoPage";
import { useLang } from "@/i18n/LanguageContext";

const Promotions = () => {
  const { t } = useLang();
  const p = t.pages.promotions;
  return (
    <InfoPage eyebrow={p.eyebrow} title={p.title}>
      {p.paragraphs.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </InfoPage>
  );
};

export default Promotions;
