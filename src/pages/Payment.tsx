import InfoPage from "./InfoPage";
import { useLang } from "@/i18n/LanguageContext";

const Payment = () => {
  const { t } = useLang();
  const p = t.pages.payment;
  return (
    <InfoPage eyebrow={p.eyebrow} title={p.title}>
      {p.paragraphs.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </InfoPage>
  );
};

export default Payment;
