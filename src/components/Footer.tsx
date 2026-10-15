import { useLanguage } from '../context/LanguageContext';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { label: t('Tentang', 'About'), href: '#about' },
    { label: t('Karya', 'Work'), href: '#work' },
    { label: t('Pendidikan', 'Education'), href: '#education' },
    { label: t('Kontak', 'Contact'), href: '#contact' },
  ];

  return (
    <footer className="bg-white border-t border-slate-100 py-12 text-slate-500">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6">
          <a
            href="#"
            className="font-display font-extrabold text-lg text-slate-900 tracking-tight no-underline"
          >
            Valendra Tsaury Vivaldi<span className="text-slate-900">.</span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-slate-900 transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {YEAR} Valendra Tsaury Vivaldi.{' '}
            {t('Dibangun dengan kode bersih & terstruktur.', '•  Built with clean & structured code.')}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/valendra-tsaury-vivaldi-9a5658393/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 transition-colors no-underline"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href="https://github.com/vlndrats"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 transition-colors no-underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
