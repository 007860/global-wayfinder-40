import { Link } from "@tanstack/react-router";
import {
  GraduationCap,
  MessageCircle,
  BookOpen,
  Award,
  FileText,
  Stamp,
  FolderCheck,
  ArrowRight,
} from "lucide-react";
import { STUDY_DESTINATIONS, STUDY_WHATSAPP } from "@/lib/study-destinations";

const SUB_SERVICES = [
  { icon: BookOpen, title: "Course & University Selection", detail: "Shortlists matched to your CGPA, budget and intake." },
  { icon: Award, title: "Scholarship Guidance", detail: "DSU, CSC, Stipendium Hungaricum and GKS applications." },
  { icon: FileText, title: "SOP & CV Writing", detail: "Statement of purpose, study plan and Europass CV drafting." },
  { icon: Stamp, title: "Document Attestation Support", detail: "IBCC, HEC, MOFA and embassy legalization handling." },
  { icon: FolderCheck, title: "Visa File Preparation", detail: "Complete file audit before embassy submission." },
];

const WA_LINK = `${STUDY_WHATSAPP}?text=${encodeURIComponent(
  "Assalam-o-Alaikum Al-Bahr Travels & Consultants,\n\nI want a FREE assessment for Study Abroad & University Admissions.\nLast qualification & CGPA:\nPreferred country:\n\nPlease guide me on scholarships and the visa file process.",
)}`;

export function StudyAbroadService() {
  return (
    <section
      id="study-abroad"
      className="border-t border-white/10 bg-[var(--midnight-light)]/40"
      aria-labelledby="study-abroad-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-xs tracking-[0.3em] text-gold mb-3">04 — STUDY ABROAD</p>
        <h2 id="study-abroad-heading" className="font-display text-4xl sm:text-5xl max-w-3xl">
          <span className="text-gold-gradient">Study Abroad</span> &amp; University Admissions
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Fully funded scholarship applications, admission files and student visa preparation for
          Italy, China, Hungary, South Korea and Turkey — managed by senior consultants in Lahore.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUB_SERVICES.map(({ icon: Icon, title, detail }) => (
            <div
              key={title}
              className="glass rounded-2xl border border-white/10 p-6 hover:border-gold/40 transition-colors"
            >
              <Icon className="size-6 text-gold" strokeWidth={2.2} />
              <h3 className="mt-4 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
            </div>
          ))}

          <div className="glass rounded-2xl border border-gold/30 p-6 flex flex-col justify-between">
            <div>
              <GraduationCap className="size-6 text-gold" strokeWidth={2.2} />
              <h3 className="mt-4 font-display text-xl">Free eligibility check</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Send your CGPA and documents — we confirm scholarship eligibility at no cost.
              </p>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient text-[var(--midnight)] px-6 py-3 text-sm font-bold hover:opacity-90 transition-opacity shadow-elev"
            >
              <MessageCircle className="size-4 shrink-0" />
              Get Free Assessment
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {STUDY_DESTINATIONS.map((d) => (
            <Link
              key={d.slug}
              to={d.route}
              className="glass rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium hover:bg-white/10 hover:border-gold/40 transition-colors"
            >
              <span className="text-base leading-none">{d.flag}</span>
              {d.title}
              <ArrowRight className="size-4 text-gold" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
