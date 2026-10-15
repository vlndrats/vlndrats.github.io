import { useState } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t('Tentang', 'About'), href: '#about' },
    { label: t('Karya', 'Work'), href: '#work' },
    { label: t('Pendidikan', 'Education'), href: '#education' },
    { label: t('Kontak', 'Contact'), href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Logo brand matching GarryAudie. reference */}
          <a
            href="#"
            className="font-display font-extrabold text-[1.35rem] text-slate-900 tracking-tight no-underline"
          >
            Valendra Tsaury Vivaldi<span className="text-slate-950">.</span>
          </a>

          {/* Right: Nav links & Language Switcher */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors no-underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Translation Pill Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/80">
              <span className="pl-2 pr-1 text-slate-400" title="Pilih Bahasa / Choose Language">
                <Languages size={15} />
              </span>
              <button
                type="button"
                onClick={() => setLang('ID')}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${lang === 'ID'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                  }`}
                aria-label="Pilih Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${lang === 'EN'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                  }`}
                aria-label="Select English"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Right Bar: Language Switcher + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/80">
              <span className="pl-1.5 pr-0.5 text-slate-400">
                <Languages size={13} />
              </span>
              <button
                type="button"
                onClick={() => setLang('ID')}
                className={`px-2 py-0.5 rounded-full text-[0.7rem] font-semibold transition-all cursor-pointer ${lang === 'ID'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang('EN')}
                className={`px-2 py-0.5 rounded-full text-[0.7rem] font-semibold transition-all cursor-pointer ${lang === 'EN'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 shadow-md">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-slate-800 py-1.5 no-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
