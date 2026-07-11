import LegalLayout, { LegalSection } from './LegalLayout.jsx'

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updated="1 July 2026">
      <p>
        Taylor Plumbing &amp; Heating Installation Ltd ("we", "our", "us") is committed to protecting the
        privacy of every customer and visitor. This policy explains how we collect, use and safeguard your
        personal information when you use our website or services.
      </p>

      <LegalSection heading="Information we collect">
        <p>
          We may collect your name, contact details, address and any information you voluntarily share
          through our quote, booking or enquiry forms - including photos of a leak, fault or job you send us
          to help with diagnosis.
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <p>
          Your information is used to provide quotes, schedule call-outs, carry out plumbing and heating
          work, respond to enquiries, and improve our services. We do not sell your personal data to third
          parties.
        </p>
      </LegalSection>

      <LegalSection heading="Data security">
        <p>
          We follow appropriate administrative and technical safeguards to protect your information. Access
          to customer records is limited to authorised staff involved in arranging or carrying out your job.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You may request access to, or correction of, your personal information held by us. To exercise
          these rights, please contact us at info@taylor-plumbing.com.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          For any questions about this Privacy Policy, please write to us at info@taylor-plumbing.com or
          visit us at 9 St Marys Plain, Norwich, Norfolk NR3 3AF.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
