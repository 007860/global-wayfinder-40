import { useState } from "react";
import { MessageCircle, CheckCircle2, GraduationCap, FileCheck2, ArrowRight, FolderCheck } from "lucide-react";
import { TopUtilityStrip } from "./TopUtilityStrip";
import { BurgerMenu } from "./BurgerMenu";
import { SiteFooter } from "./SiteFooter";
import { FloatingEmailButton } from "./FloatingEmailButton";
import { LeadForm } from "./LeadForm";
import { STUDY_WHATSAPP, getDocuments, type StudyDestination } from "@/lib/study-destinations";

function waLink(d: StudyDestination) {
  const text = `Assalam-o-Alaikum Al-Bahr Travels & Consultants,\n\nI want a FREE eligibility assessment for: ${d.title}.\nProgramme interest: (BS / Master's / PhD)\nLast qualification & CGPA:\n\nPlease guide me on the scholarship process.`;
  return `${STUDY_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function docsWaLink(d: StudyDestination) {
  const text = `Assalam-o-Alaikum Al-Bahr Travels & Consultants,\n\nI want to check my document eligibility for: ${d.title}.\nLast qualification & CGPA:\nDocuments ready: (degree / transcripts / IELTS or MOI / passport)\n\nPlease review my document checklist.`;
  return `${STUDY_WHATSAPP}?text=${encodeURIComponent(text)}`;
}


export function StudyDestinationPage({ destination: d }: { destination: StudyDestination }) {
  const [done, setDone] = useState(false);
  const docs = getDocuments(d.slug);


  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />

      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh border-b border-white/10">
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-20 sm:pt-24 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs tracking-wider mb-8">
            <span className="text-lg leading-none">{d.flag}</span>
            <span className="text-foreground/90">STUDY ABROAD — {d.country.toUpperCase()}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-gold font-semibold">AL-BAHR EDUCATION DESK</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl mx-auto">
            {d.heroHeadline}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">{d.heroSub}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={waLink(d)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[var(--midnight)] px-7 py-4 text-sm sm:text-base font-bold hover:opacity-90 transition-opacity shadow-elev"
            >
              <MessageCircle className="size-5" />
              Get Free Eligibility Assessment
            </a>
            <a
              href="#inquiry"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-4 text-sm sm:text-base font-semibold hover:bg-gold/10 transition-colors"
            >
              Quick Inquiry Form <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-20" aria-labelledby="benefits-heading">
        <p className="text-xs tracking-[0.3em] text-gold mb-3">01 — KEY BENEFITS</p>
        <h2 id="benefits-heading" className="font-display text-3xl sm:text-4xl">
          Why <span className="text-gold-gradient">{d.title.replace("Study in ", "")}</span> is worth your application
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.benefits.map((b) => (
            <div key={b.title} className="glass rounded-2xl p-6 border border-white/10 hover:border-gold/40 transition-colors">
              <GraduationCap className="size-6 text-gold" />
              <h3 className="mt-4 font-display text-xl">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section
        className="border-y border-white/10 bg-[var(--midnight-light)]/40"
        aria-labelledby="requirements-heading"
      >
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-xs tracking-[0.3em] text-gold mb-3">02 — ADMISSION &amp; VISA REQUIREMENTS</p>
          <h2 id="requirements-heading" className="font-display text-3xl sm:text-4xl">
            Eligibility <span className="text-gold-gradient">checklist</span>
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {d.requirements.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5">
                <CheckCircle2 className="size-5 text-gold shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-foreground/90">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-6xl mx-auto px-6 py-20" aria-labelledby="process-heading">
        <p className="text-xs tracking-[0.3em] text-gold mb-3">03 — STEP-BY-STEP APPLICATION PROCESS</p>
        <h2 id="process-heading" className="font-display text-3xl sm:text-4xl">
          Your <span className="text-gold-gradient">{d.country}</span> roadmap
        </h2>
        <ol className="mt-10 space-y-4">
          {d.process.map((step, i) => (
            <li key={step} className="flex items-start gap-5 rounded-2xl border border-white/10 p-5 hover:border-gold/40 transition-colors">
              <span className="size-10 shrink-0 rounded-full bg-gold-gradient text-[var(--midnight)] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg sm:text-xl">{step}</h3>
                <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                  <FileCheck2 className="size-4 text-gold" /> Handled with senior consultant review at our Arifwala branch.
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Required Documents Checklist */}
      {docs.length > 0 && (
        <section
          id="documents"
          className="border-y border-white/10 bg-[var(--midnight-light)]/40"
          aria-labelledby="documents-heading"
        >
          <div className="max-w-6xl mx-auto px-6 py-20">
            <p className="text-xs tracking-[0.3em] text-gold mb-3">04 — REQUIRED DOCUMENTS CHECKLIST</p>
            <h2 id="documents-heading" className="font-display text-3xl sm:text-4xl">
              {d.country} <span className="text-gold-gradient">document &amp; visa file</span> checklist
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Prepare these documents before your application. Our Arifwala desk verifies every file
              before submission.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {docs.map((g) => (
                <div key={g.group} className="glass rounded-2xl border border-white/10 p-6">
                  <h3 className="font-display text-xl flex items-center gap-2">
                    <FolderCheck className="size-5 text-gold shrink-0" />
                    {g.group}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="size-4 text-gold shrink-0 mt-1" />
                        <span className="text-sm text-foreground/90 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href={docsWaLink(d)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[var(--midnight)] px-7 py-4 text-sm sm:text-base font-bold text-center hover:opacity-90 transition-opacity shadow-elev"
              >
                <MessageCircle className="size-5 shrink-0" />
                Check Your Document Eligibility on WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}



      {/* Inquiry + WhatsApp CTA */}
      <section id="inquiry" className="border-t border-white/10 bg-[var(--midnight-light)]/40" aria-labelledby="inquiry-heading">
        <div className="max-w-5xl mx-auto px-6 py-20 grid lg:grid-cols-[1fr_1.1fr] gap-12">
          <div>
            <p className="text-xs tracking-[0.3em] text-gold mb-3">05 — GET STARTED</p>
            <h2 id="inquiry-heading" className="font-display text-3xl sm:text-4xl">
              Get your <span className="text-gold-gradient">free eligibility assessment</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Send us your academic details and our {d.country} desk will confirm your scholarship
              eligibility, intake deadlines, and document list — free of charge.
            </p>
            <a
              href={waLink(d)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[var(--midnight)] px-7 py-4 font-bold hover:opacity-90 transition-opacity shadow-elev"
            >
              <MessageCircle className="size-5" />
              WhatsApp: Get Free Eligibility Assessment
            </a>
          </div>

          <div className="glass rounded-2xl border border-white/10 p-6 sm:p-8">
            {done ? (
              <div className="text-center py-10">
                <CheckCircle2 className="size-10 text-gold mx-auto" />
                <h3 className="mt-4 font-display text-2xl">Inquiry received</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our {d.country} desk will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setDone(false)}
                  className="mt-6 text-sm text-gold hover:underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl mb-1">Quick Inquiry</h3>
                <p className="text-sm text-muted-foreground mb-6">{d.title} — scholarship counselling</p>
                <LeadForm
                  subject={`${d.title} — Free Eligibility Assessment`}
                  sourceType={`study_${d.slug.replace(/-/g, "_")}`}
                  requirePassport={false}
                  onDone={() => setDone(true)}
                />
              </>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingEmailButton />
    </main>
  );
}
