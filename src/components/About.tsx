import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit,
  SiDocker,
  SiLinux,
  SiNginx,
  SiVite,
} from 'react-icons/si';
import { Globe, Bot } from 'lucide-react';

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string;
}

interface SkillGroup {
  category: string;
  items: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: SiReact, color: '#0ea5e9' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#0f172a' },
      { name: 'TypeScript', icon: SiTypescript, color: '#2563eb' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
      { name: 'HTML5 / CSS3', icon: SiHtml5, color: '#ea580c' },
    ],
  },
  {
    category: 'Backend & Data',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#334155' },
      { name: 'Express', icon: SiExpress, color: '#0f172a' },
      { name: 'MySQL', icon: SiMysql, color: '#00758f' },
      { name: 'REST APIs', icon: Globe, color: '#475569' },
    ],
  },
  {
    category: 'Tools & DevOps',
    items: [
      { name: 'Git / GitHub', icon: SiGit, color: '#ea580c' },
      { name: 'Docker', icon: SiDocker, color: '#0284c7' },
      { name: 'Linux / VPS', icon: SiLinux, color: '#f59e0b' },
      { name: 'Nginx', icon: SiNginx, color: '#334155' },
      { name: 'Vite', icon: SiVite, color: '#8b5cf6' },
      { name: 'AI APIs', icon: Bot, color: '#6366f1' },
    ],
  },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          {/* ── Left: Personal Story ───────────────────────────────────────── */}
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              {t('TENTANG SAYA', 'ABOUT ME')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              {t(
                'Mengembangkan solusi web yang efisien, fungsional, dan berdampak nyata.',
                'Developing web solutions that are efficient, functional, and genuinely impactful.',
              )}
            </h2>

            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                {t(
                  'Saya adalah Software Developer yang berfokus pada pengembangan aplikasi web, dashboard operasional, dan sistem digital yang dirancang untuk menjawab kebutuhan nyata. Selama lebih dari dua tahun, saya mengeksplorasi berbagai pendekatan untuk membangun aplikasi yang terstruktur, mudah digunakan, dan dapat diandalkan.',
                  'I am a Software Developer focused on developing web applications, operational dashboards, and digital systems designed to answer real needs. For over two years, I have explored various approaches to build structured, intuitive, and dependable applications.',
                )}
              </p>
              <p>
                {t(
                  'Perjalanan saya dimulai dari game modding dan pengelolaan server komunitas multiplayer SA-MP. Dari sana, saya belajar menangani state pemain secara real-time, sistem transaksi virtual, serta pengelolaan database. Pengalaman tersebut membentuk pemahaman saya tentang logika sistem, konsistensi data, dan pentingnya membangun perangkat lunak yang stabil.',
                  'My journey began with game modding and managing community servers for multiplayer SA-MP. There, I learned to handle real-time player states, virtual transaction systems, and database management. That experience shaped my understanding of system architecture, data consistency, and the vital importance of building stable software.',
                )}
              </p>
              <p>
                {t(
                  'Saya menghargai kolaborasi, komunikasi yang terbuka, dan proses belajar berkelanjutan. Bagi saya, menjadi developer bukan sekadar menulis kode, tetapi juga memahami masalah, menentukan solusi yang tepat, dan terus meningkatkan kualitas produk melalui masukan serta perkembangan teknologi.',
                  'I value collaboration, open communication, and continuous learning. For me, being a developer is not just about writing code, but understanding problems, identifying the right solutions, and steadily improving product quality through feedback and technological advancements.',
                )}
              </p>
            </div>
          </Reveal>

          {/* ── Right: Tech Stack & Approach ──────────────────────────────── */}
          <Reveal delay={100}>
            <div className="rounded-2xl bg-white p-7 sm:p-8 border border-slate-200/80 shadow-xs">
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                {t('Teknologi & Tools', 'Technologies & Tools')}
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                {t(
                  'Saya menggunakan berbagai teknologi untuk merancang, mengembangkan, dan memelihara aplikasi web, mulai dari antarmuka pengguna hingga backend dan infrastruktur.',
                  'I use various technologies to design, develop, and maintain web applications, spanning user interfaces, backend systems, and infrastructure.',
                )}
              </p>

              <div className="space-y-6">
                {SKILL_GROUPS.map((group) => {
                  const isTools = group.category.toLowerCase().includes('tools');
                  return (
                    <div key={group.category}>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">
                        {group.category}
                      </p>
                      <div
                        className={`flex flex-wrap gap-x-2 ${
                          isTools ? 'gap-y-3 mt-1.5' : 'gap-y-2.5'
                        }`}
                      >
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <span
                              key={item.name}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-2xs text-slate-800 text-xs font-medium transition-all"
                            >
                              <Icon size={14} style={{ color: item.color }} className="shrink-0" />
                              <span>{item.name}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-normal">
                  {t(
                    'Saya terus mengeksplorasi teknologi baru, khususnya otomasi berbasis AI dan arsitektur aplikasi yang skalabel, untuk memperluas kemampuan dan membangun solusi yang semakin efektif.',
                    'I continuously explore emerging technologies, particularly AI-driven automation and scalable application architectures, to expand my capabilities and build increasingly effective solutions.',
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
