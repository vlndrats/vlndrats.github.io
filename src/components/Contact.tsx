import { Mail, ArrowUpRight } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
        <Reveal>
          {/* Label kecil */}
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            {t('HUBUNGI SAYA', 'GET IN TOUCH')}
          </p>

          {/* Judul utama */}
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            {t('Punya Ide? Mari Wujudkan Bersama.', "Have an Idea? Let's Build It Together.")}
          </h2>

          {/* Paragraf deskripsi */}
          <div className="space-y-3 text-base text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto">
            <p>
              {t(
                'Saya terbuka untuk peluang kerja, kolaborasi proyek, maupun diskusi seputar pengembangan software. Jika Anda mencari developer yang antusias dalam memecahkan masalah dan membangun solusi digital yang bermanfaat, saya akan senang mendengar dari Anda.',
                'I am open to job opportunities, project collaborations, and discussions about software development. If you are looking for a developer passionate about solving problems and building meaningful digital solutions, I would love to hear from you.',
              )}
            </p>
            <p>
              {t(
                'Jangan ragu untuk menghubungi saya. Mari mulai percakapan dan temukan bagaimana kita bisa bekerja sama.',
                "Do not hesitate to reach out. Let's start a conversation and see how we can work together.",
              )}
            </p>
          </div>

          {/* CTA Utama & Tautan Kontak */}
          <div className="mb-10 flex flex-col items-center gap-5">
            <a
              href={`https://wa.me/6285871361028?text=${encodeURIComponent(t(
                'Halo Valendra, saya tertarik untuk diskusi proyek.',
                "Hi Valendra, I'd like to discuss a project with you.",
              ))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-emerald-700 px-7 py-3.5 text-sm font-semibold text-white shadow-sm no-underline transition-colors hover:bg-emerald-800 focus-visible:outline-emerald-700"
            >
              <SiWhatsapp size={20} aria-hidden="true" className="shrink-0" />
              <span>{t('Chat via WhatsApp', 'Chat on WhatsApp')}</span>
              <ArrowUpRight size={17} aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-slate-600">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=valendratsv@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-slate-950 font-medium no-underline transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-slate-200 shadow-2xs">
                  <Mail size={14} className="text-slate-700" />
                </div>
                <span>valendratsv@gmail.com</span>
              </a>

            </div>
          </div>

          {/* Media Sosial Rata Tengah */}
          <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-600 pt-6 border-t border-slate-200/60 max-w-sm mx-auto">
            <span>{t('Temukan saya di:', 'Find me on:')}</span>
            <a
              href="https://www.linkedin.com/in/valendra-tsaury-vivaldi-9a5658393/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-800 hover:text-slate-950 no-underline transition-colors"
            >
              <LinkedinIcon size={15} /> LinkedIn
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="https://github.com/vlndrats"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-800 hover:text-slate-950 no-underline transition-colors"
            >
              <GithubIcon size={15} /> GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
