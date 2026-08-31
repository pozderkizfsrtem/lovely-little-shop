import InfoPage from "./InfoPage";
import { useLang } from "@/i18n/LanguageContext";

const Contact = () => {
  const { t } = useLang();
  const p = t.pages.contact;
  return (
    <InfoPage eyebrow={p.eyebrow} title={p.title}>
      {p.paragraphs.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
      <h2>{p.emailHeading}</h2>
      <p>{p.emailValue}</p>
    </InfoPage>
  );
};

export default Contact;
