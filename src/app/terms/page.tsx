import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>

          <div className="mt-10 flex flex-col gap-8 text-[rgb(var(--muted))]">
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                1. Introduction
              </h2>
              <p className="text-justify leading-relaxed">
                These Terms And Conditions (these &quot;Terms&quot; or these &quot;Terms And Conditions&quot;) contained herein on this webpage, shall govern your use of this website, including all pages within this website (collectively referred to herein below as this &quot;Website&quot;). These Terms apply in full force and effect to your use of this Website and by using this Website, you expressly accept all Terms And Conditions contained herein in full. You must not use this Website, if you have any objection to any of these Terms And Conditions.
              </p>
              <p className="text-justify leading-relaxed">
                This Website is not for use by any minors (defined as those who are not at least 18 years of age), and you must not use this Website if you are a minor.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                2. Account
              </h2>
              <p className="text-justify leading-relaxed">
                When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p className="text-justify leading-relaxed">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>
              <p className="text-justify leading-relaxed">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                3. Restrictions
              </h2>
              <p className="text-justify leading-relaxed">
                You are expressly and emphatically restricted from all of the following:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li className="text-justify">Selling, sublicensing and/or otherwise commercializing any Website material</li>
                <li className="text-justify">Using this Website in any way that is, or may be, damaging to this Website</li>
                <li className="text-justify">Using this Website in any way that impacts user access to this Website</li>
                <li className="text-justify">Using this Website contrary to applicable laws and regulations</li>
                <li className="text-justify">Engaging in any data mining, data harvesting, data extracting or any other similar activity</li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                4. Links To Other Web Sites
              </h2>
              <p className="text-justify leading-relaxed">
                Our Service may contain links to third-party web sites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                5. Changes
              </h2>
              <p className="text-justify leading-relaxed">
                We reserve the right to modify or replace these terms at any time. In this case, we undertake to provide notice at least 30 days before the entry into force of the new conditions.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                6. Governing Law
              </h2>
              <p className="text-justify leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                7. Limitation
              </h2>
              <p className="text-justify leading-relaxed">
                In no event shall the company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                8. License
              </h2>
              <p className="text-justify leading-relaxed">
                Permission is granted to temporarily upload a copy of the material (information or software) on this website for personal viewing only. This is a license, not a transfer of ownership, and under this license you cannot attempt to decompile or reverse engineer any software contained on this website, or remove any copyright or other proprietary notations from the materials.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                9. Severability
              </h2>
              <p className="text-justify leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole, and such provisions shall be deleted without affecting the remaining provisions herein.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                10. Variation of Terms
              </h2>
              <p className="text-justify leading-relaxed">
                The company is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review such Terms on a regular basis to ensure you understand all Terms And Conditions governing use of this Website.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                11. Governing Law &amp; Jurisdiction
              </h2>
              <p className="text-justify leading-relaxed">
                These Terms will be governed by and construed in accordance with the laws of the Website Owner&apos;s jurisdiction, and you submit to the non-exclusive jurisdiction of the Website Owner&apos;s jurisdiction for the resolution of any disputes.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                12. Contact Us
              </h2>
              <p className="text-justify leading-relaxed">
                If you have any questions about these Terms, please contact us.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}