import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="pt-10 pb-20 md:pt-16 md:pb-28 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] items-center gap-12 lg:gap-16">
          {/* ── Left: Tilted Photo Card matching the reference ────────────── */}
          <Reveal className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] transform -rotate-2 hover:rotate-0 transition-transform duration-300 ease-out">
              <div className="rounded-3xl bg-white p-3.5 shadow-2xl shadow-slate-200/80 border border-slate-100">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={`${import.meta.env.BASE_URL}images/valendra-profile.jpg`}
                    alt="Valendra Tsaury Vivaldi - Software Developer"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Right: Personal Intro matching the reference ──────────────── */}
          <Reveal delay={80} className="flex flex-col items-start">
            {/* Status text (clean, no pill border, no colored circle, pure typography) */}
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-sans">
              OPEN TO WORK
            </p>

            {/* Massive Heading */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
              {t('Halo! Saya', "Hello! I'm")} <br className="hidden sm:inline" />
              Valendra.
            </h1>

            {/* Subtitle / Role Pitch */}
            <p className="text-xl sm:text-2xl font-semibold text-slate-800 leading-snug mb-4 max-w-[48ch]">
              {t(
                'Software Developer yang Berfokus pada Solusi Digital.',
                'Software Developer Focused on Digital Solutions.',
              )}
            </p>

            {/* Secondary Bio / Description */}
            <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-[52ch]">
              {t(
                'Saya mengembangkan aplikasi dan solusi digital dengan mengutamakan fungsionalitas, kualitas kode, dan pengalaman pengguna. Saya terus belajar, mengeksplorasi teknologi baru, dan siap berkolaborasi untuk membangun produk yang bermanfaat serta menyelesaikan masalah nyata.',
                'I build applications and digital solutions with a strong focus on functionality, code quality, and user experience. Always learning and exploring new technologies, I am ready to collaborate to build impactful products that solve real problems.',
              )}
            </p>

            {/* Two Pill Buttons matching reference */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-7 py-3.5 text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm no-underline"
              >
                {t('Hubungi Saya', 'Contact Me')} <ArrowRight size={16} />
              </a>
              <a
                href="#work"
                className="inline-flex items-center rounded-full bg-white border border-slate-300 text-slate-800 px-7 py-3.5 text-sm font-semibold hover:bg-slate-50 transition-colors no-underline"
              >
                {t('Lihat Karya', 'View Work')}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
