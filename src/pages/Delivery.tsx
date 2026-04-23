import InfoPage from "./InfoPage";

const Delivery = () => (
  <InfoPage eyebrow="Logistyka" title="Dostawa">
    <p>Wysyłamy zamówienia w ciągu 24 godzin w dni robocze.</p>
    <h2>Sposoby dostawy</h2>
    <p>
      <strong>Kurier InPost</strong> — 14,99 zł, 1–2 dni robocze<br />
      <strong>Paczkomat InPost</strong> — 12,99 zł, 1–2 dni robocze<br />
      <strong>Kurier DPD</strong> — 16,99 zł, 1–2 dni robocze
    </p>
    <h2>Darmowa dostawa</h2>
    <p>Przy zamówieniu powyżej <strong>200 zł</strong> dostawa jest bezpłatna.</p>
  </InfoPage>
);

export default Delivery;
