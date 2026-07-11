import LegalLayout, { LegalSection } from './LegalLayout.jsx'

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updated="1 July 2026">
      <p>
        Santkrupa Hospital ("we", "our", "us") is committed to protecting the privacy of every
        patient and visitor. This policy explains how we collect, use and safeguard your
        personal and health information when you use our website or services.
      </p>

      <LegalSection heading="Information we collect">
        <p>
          We may collect your name, contact details, appointment preferences and any information
          you voluntarily share through our appointment or enquiry forms. Clinical and medical
          records are collected only during the course of your treatment.
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <p>
          Your information is used to schedule and confirm appointments, provide medical care,
          respond to enquiries, and improve our services. We do not sell your personal data to
          third parties.
        </p>
      </LegalSection>

      <LegalSection heading="Data security">
        <p>
          We follow strict administrative, physical and technical safeguards to protect your
          information. Access to medical records is limited to authorised hospital staff involved
          in your care.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You may request access to, or correction of, your personal information held by us.
          To exercise these rights, please contact our front desk at care@santkrupahospital.in.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          For any questions about this Privacy Policy, please write to us at
          care@santkrupahospital.in or visit us at Alandi Road, Near Alandi Devachi, Pune,
          Maharashtra 412105.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
