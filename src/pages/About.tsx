import InfoPage from "./InfoPage";
import { useLang } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useLang();
  const p = t.pages.about;
  return (
    <InfoPage eyebrow={p.eyebrow} title={p.title}>
      {p.paragraphs.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
      <h2>{p.contactHeading}</h2>
      <p>{p.contactValue}</p>
    </InfoPage>
  );
};

export default About;
