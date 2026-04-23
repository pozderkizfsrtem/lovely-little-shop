import InfoPage from "./InfoPage";

const Payment = () => (
  <InfoPage eyebrow="Płatności" title="Płatność">
    <p>Oferujemy bezpieczne i wygodne metody płatności.</p>
    <h2>Dostępne metody</h2>
    <p>
      <strong>BLIK</strong> — natychmiastowa płatność kodem<br />
      <strong>Karta płatnicza</strong> — Visa, Mastercard<br />
      <strong>Przelew online</strong> — wszystkie polskie banki<br />
      <strong>Apple Pay / Google Pay</strong>
    </p>
    <h2>Bezpieczeństwo</h2>
    <p>Wszystkie transakcje są szyfrowane i obsługiwane przez certyfikowanego operatora płatności.</p>
  </InfoPage>
);

export default Payment;
