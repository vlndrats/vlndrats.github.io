import { useState } from 'react';
import { School } from 'lucide-react';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

const EDUCATION = [
  {
    name: 'SMAN 19 BANDUNG',
    period: '2024–2027',
    level: { id: 'Sekolah Menengah Atas', en: 'Senior High School' },
    logo: 'logosma',
    current: true,
  },
  {
    name: 'SMPN 35 BANDUNG',
    period: '2021–2024',
    level: { id: 'Sekolah Menengah Pertama', en: 'Junior High School' },
    logo: 'logosmp',
    current: false,
  },
  {
    name: 'SDN 01 LANGENSARI',
    period: '2020–2021',
    level: { id: 'Sekolah Dasar', en: 'Primary School' },
    logo: 'logosd-langensari',
    current: false,
  },
  {
    name: 'SDN 064 PADASUKA',
    period: '2015–2020',
    level: { id: 'Sekolah Dasar', en: 'Primary School' },
    logo: 'logosd-padasuka',
    current: false,
  },
];

// Put logos in public/images. Try PNG first, then JPG and JPEG.
function SchoolLogo({ filename }: { filename: string }) {
  const [attempt, setAttempt] = useState(0);
  const extensions = ['png', 'jpg', 'jpeg'];

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50 sm:h-16 sm:w-16">
      {attempt < extensions.length ? (
        <img
          src={import.meta.env.BASE_URL + 'images/' + filename + '.' + extensions[attempt]}
          alt=""
          width={64}
          height={64}
          className="h-full w-full object-contain p-1.5"
          onError={() => setAttempt((previous) => previous + 1)}
        />
      ) : (
        <School size={27} className="text-slate-400" aria-hidden="true" />
      )}
    </div>
  );
}

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" aria-labelledby="education-title" className="border-t border-slate-100 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
      <Reveal className="mb-12">
        <h2 id="education-title" className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {t('Pendidikan', 'Education')}
        </h2>
      </Reveal>
      <ol className="max-w-3xl">
        {EDUCATION.map((item, index) => (
          <li key={item.name} className="border-b border-slate-100 py-6 first:pt-0 last:border-0 last:pb-0">
            <Reveal delay={index * 70} className="flex items-start gap-4 sm:gap-5">
              <SchoolLogo filename={item.logo} />
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold leading-snug text-slate-900">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{t(item.level.id, item.level.en)}</p>
                <p className="mt-1 text-sm text-slate-500">{item.period}</p>
                {item.current && (
                  <p className="mt-2 text-xs font-medium text-blue-700">
                    {t('Sedang ditempuh', 'Currently studying')}
                  </p>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      </div>
    </section>
  );
}
