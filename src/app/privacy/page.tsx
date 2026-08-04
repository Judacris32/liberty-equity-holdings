import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar transparentOnTop={false} />
      <main className="min-h-screen pt-32">
        <article className="mx-auto max-w-3xl px-6 pb-24">
          <Link
            href="/"
            className="mb-8 flex w-fit items-center gap-1.5 text-sm font-medium text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--foreground))]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
            Privacy Policy
          </h1>

          <div className="mt-10 flex flex-col gap-8 text-[rgb(var(--muted))]">
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                Our Commitment to You
              </h2>
              <p className="text-justify leading-relaxed">
                Thank you for showing interest in our service. In order for us to provide you with a smooth and secure experience, we need to collect and process certain personal data about you and your activity.
              </p>
              <p className="text-justify leading-relaxed">
                By entrusting us with your personal data, we want to assure you of our total commitment to keeping your information private and operating strictly in accordance with all regulatory requirements and EU data protection laws, including the General Data Protection Regulation (GDPR) 679/2016 (EU). We have taken robust, measurable steps to protect the confidentiality, security, and integrity of your data. We encourage you to review the following details carefully.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                Grounds for Data Collection
              </h2>
              <p className="text-justify leading-relaxed">
                The processing of your personal information (meaning any data that can reasonably help identify you; hereinafter &ldquo;Personal Data&rdquo;) is necessary for us to fulfill our contractual obligations to you, deliver our services effectively, protect our legitimate business interests, and comply with essential legal and financial regulations.
              </p>
              <p className="text-justify leading-relaxed">
                When you use our services, you consent to the collection, storage, use, and disclosure of your Personal Data as outlined in this Privacy Policy.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                How Do We Receive Data About You?
              </h2>
              <p className="text-justify leading-relaxed">
                We gather your Personal Data through a few direct and automated channels:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li className="text-justify">When you voluntarily provide your details to create an account with us (such as your name and email address).</li>
                <li className="text-justify">When you access or interact with our site and services, particularly during financial transactions or platform activity.</li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                What Type of Data Do We Collect?
              </h2>
              <p className="text-justify leading-relaxed">
                To open your account and provide our services reliably, we collect specific categories of data:
              </p>
              <p className="text-justify leading-relaxed font-medium text-[rgb(var(--foreground))]">
                Personal Data
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Registration data:</strong> Your name, email address, phone number, occupation, country of residence, and age (to verify you are over 18 and eligible to use our services).</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Voluntary data:</strong> Information you share when you communicate with us via email or contact forms.</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Financial data:</strong> Details related to financial transactions on our platform, including payment information such as bank account details.</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Technical data:</strong> Automatically recorded connection data such as your IP address, MAC address, and approximate device location.</li>
              </ul>
              <p className="text-justify leading-relaxed font-medium text-[rgb(var(--foreground))] mt-2">
                Non-Personal Data &amp; Tracking Technologies
              </p>
              <p className="text-justify leading-relaxed">
                We also record non-personal information about your device when you visit our site, including login credentials, UDIDs, advertising IDs, cookie identifiers, browser type, operating system version, language preferences, and visit duration. This helps us optimize performance and personalize your experience. If non-personal data is combined with personal data, we treat the combined information as Personal Data. We and authorized third parties also use pixels, cookies, and similar tracking technologies to analyze site traffic and enhance navigation.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                How Do We Use the Data We Collect?
              </h2>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Provision of service:</strong> To deliver, maintain, and continuously improve our platform features.</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Marketing purposes:</strong> To send you helpful tips, platform announcements, or promotional materials via email or phone. You can easily opt out at any time by clicking the &ldquo;unsubscribe&rdquo; link in our emails, though we may still send critical service-related updates.</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Analytics and research:</strong> To run surveys, test features, and evaluate performance data to build better tools.</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Protecting our interests &amp; enforcing policies:</strong> To defend against legal claims, prevent fraud, protect platform security, and enforce our Terms &amp; Conditions.</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Compliance:</strong> To perform due diligence, prevent money laundering, and fulfill legal or governmental mandates.</li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                With Whom Do We Share Your Personal Data?
              </h2>
              <p className="text-justify leading-relaxed">
                We respect your privacy and only share your data under strict, controlled circumstances:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Internal teams:</strong> Group companies and authorized personnel who need the information to service your account.</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Financial providers:</strong> Payment processors and financial partners to handle deposits and conduct required risk evaluations.</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Business partners:</strong> Trusted storage and analytics providers who support our operations.</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Legal entities:</strong> Regulatory bodies or law enforcement agencies when required by law or to protect platform security.</li>
                <li className="text-justify"><strong className="text-[rgb(var(--foreground))]">Corporate transactions:</strong> In the event of a merger, acquisition, or asset sale, where data terms remain protected.</li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                Transfer of Data Outside the EEA
              </h2>
              <p className="text-justify leading-relaxed">
                If data recipients are located outside the European Economic Area (EEA), we ensure transfers are made only to countries approved by the European Commission as offering adequate protection, or we put formal legal safeguards in place to guarantee your data remains secure.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                How We Protect Your Data
              </h2>
              <p className="text-justify leading-relaxed">
                We utilize robust administrative, technical, and physical safeguards to prevent unauthorized access or disclosure. Your information is stored on secure servers with restricted access limited strictly to personnel who need it to fulfill our agreement. While we maintain rigorous security standards, transmitting data over the internet always carries inherent risks, so you also play a role by keeping your password confidential and signing out after your sessions.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                Data Retention
              </h2>
              <p className="text-justify leading-relaxed">
                We retain your personal data only for as long as needed to provide our services, resolve disputes, enforce agreements, and comply with legal or regulatory obligations (such as keeping records of account opening documents and trading information). Outdated data is securely destroyed when no longer required.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                Your User Rights
              </h2>
              <p className="text-justify leading-relaxed">
                Under applicable regulations, you have the right to request access to your data, receive a structured copy of information you provided, request rectifications or erasure, and object to or restrict processing. Please note these rights may be balanced against our own legitimate legal and regulatory obligations.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                How to Contact Us
              </h2>
              <p className="text-justify leading-relaxed">
                If you wish to exercise any of your rights or have questions about our privacy practices, you can reach our Data Protection Officer at:
              </p>
              <p className="leading-relaxed font-medium text-[rgb(var(--foreground))]">
                Email: libertyequityholdings.com<br />
                Attn: GDPO Compliance Officer
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}