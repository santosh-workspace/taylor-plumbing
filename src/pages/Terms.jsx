import LegalLayout, { LegalSection } from './LegalLayout.jsx'

export default function Terms() {
  return (
    <LegalLayout title="Terms of Use" updated="1 July 2026">
      <p>
        Welcome to the Santkrupa Hospital website. By accessing or using this site, you agree to
        the terms set out below. Please read them carefully.
      </p>

      <LegalSection heading="No medical advice">
        <p>
          The content on this website is provided for general information only and is not a
          substitute for professional medical advice, diagnosis or treatment. Always seek the
          guidance of a qualified doctor for any health concern. In an emergency, call our 24/7
          line or your nearest emergency service immediately.
        </p>
      </LegalSection>

      <LegalSection heading="Appointments">
        <p>
          Appointment requests submitted through this website are subject to confirmation by our
          team. Submitting a request does not guarantee a specific slot or doctor until confirmed.
        </p>
      </LegalSection>

      <LegalSection heading="Use of the website">
        <p>
          You agree to use this website lawfully and not to misuse, disrupt or attempt
          unauthorised access to any part of it. All content, logos and materials remain the
          property of Santkrupa Hospital.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          While we strive to keep information accurate and up to date, we make no warranties about
          the completeness or reliability of website content and are not liable for any loss
          arising from its use.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Questions about these terms may be directed to care@santkrupahospital.in.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
