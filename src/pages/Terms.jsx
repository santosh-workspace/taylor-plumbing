import LegalLayout, { LegalSection } from './LegalLayout.jsx'

export default function Terms() {
  return (
    <LegalLayout title="Terms of Use" updated="1 July 2026">
      <p>
        Welcome to the Taylor Plumbing &amp; Heating website. By accessing or using this site, you agree to
        the terms set out below. Please read them carefully.
      </p>

      <LegalSection heading="Quotes and call-outs">
        <p>
          Quotes provided through this website or by phone are estimates based on the information you give
          us and may change once an engineer has inspected the job on site. Booking requests submitted
          through this website are subject to confirmation by our team.
        </p>
      </LegalSection>

      <LegalSection heading="Emergency call-outs">
        <p>
          Our 24-hour emergency line targets a response within 2 hours of your call, but response times can
          vary depending on demand, location and weather conditions. For a gas leak, please contact the
          National Gas Emergency Service on 0800 111 999 in addition to calling us.
        </p>
      </LegalSection>

      <LegalSection heading="Guarantee">
        <p>
          All workmanship carried out by Taylor Plumbing &amp; Heating is guaranteed for 12 months from the
          date of completion, covering defects in our work. This guarantee does not cover faults caused by
          misuse, third-party interference, or parts not supplied by us.
        </p>
      </LegalSection>

      <LegalSection heading="Use of the website">
        <p>
          You agree to use this website lawfully and not to misuse, disrupt or attempt unauthorised access
          to any part of it. All content, logos and materials remain the property of Taylor Plumbing &amp;
          Heating Installation Ltd.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          While we strive to keep information accurate and up to date, we make no warranties about the
          completeness or reliability of website content and are not liable for any loss arising from its
          use.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Questions about these terms may be directed to info@taylor-plumbing.com.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
