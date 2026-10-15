import { useState, useEffect } from 'react';
import { ExternalLink, X, FileText, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import HeylenGallery from './HeylenGallery';
import PosShowcase from './PosShowcase';
import CutiGallery from './CutiGallery';
import SinisterGallery from './SinisterGallery';
import { useLanguage } from '../context/LanguageContext';

interface BilingualText {
  id: string;
  en: string;
}

interface Project {
  id: string;
  title: string;
  category: BilingualText;
  year: string;
  summary: BilingualText;
  problem: BilingualText;
  solution: BilingualText;
  impact: BilingualText;
  tech: string[];
  image?: string;
  link?: string;
  linkText?: BilingualText;
  badge?: BilingualText;
}

const PROJECTS: Project[] = [
  {
    id: 'heylen-ai',
    title: 'heylen.id',
    category: {
      id: 'Platform Belajar',
      en: 'Learning Platform',
    },
    year: '',
    summary: {
      id: 'Platform belajar yang menggabungkan tutor AI, latihan soal dari materi sendiri, dan kuis multiplayer. Dibangun untuk menghubungkan proses memahami materi, berlatih, dan meninjau hasil belajar dalam satu tempat.',
      en: 'A learning platform combining an AI tutor, quizzes generated from study materials, and multiplayer quizzes. Built to connect understanding, practice, and reviewing learning results in one place.',
    },
    problem: {
      id: 'Bagaimana menghubungkan tanya jawab materi, latihan soal, dan evaluasi hasil dalam satu alur belajar yang bisa digunakan sendiri maupun bersama teman?',
      en: 'How can questions about study materials, practice quizzes, and result reviews be connected in a learning flow for both individuals and groups?',
    },
    solution: {
      id: 'Membangun frontend React dan TypeScript dengan backend Express yang terhubung ke Gemini API. Firebase menangani autentikasi Google, penyimpanan riwayat, dan sinkronisasi ruang kuis multiplayer. Materi unggahan dapat digunakan untuk membuat soal latihan.',
      en: 'Built a React and TypeScript frontend with an Express backend connected to the Gemini API. Firebase handles Google authentication, history storage, and multiplayer quiz room synchronization. Uploaded materials can be used to generate practice questions.',
    },
    impact: {
      id: 'Implementasi mencakup chat tutor dengan lampiran, kuis solo dan multiplayer berbasis PIN, pembuatan soal dari materi, serta riwayat jawaban dan pembahasan. Dashboard menampilkan XP, streak, dan leaderboard; mode tamu menyimpan riwayat kuis sementara selama sesi.',
      en: 'The implementation includes tutor chat with attachments, solo and PIN-based multiplayer quizzes, material-based question generation, and answer history with explanations. The dashboard displays XP, streaks, and a leaderboard; guest mode keeps quiz history temporarily for the session.',
    },
    tech: ['React', 'TypeScript', 'Gemini API', 'Firebase', 'Express', 'Tailwind CSS'],
  },
  {
    id: 'client-dashboard',
    title: 'Point of Sale (POS) & Multi-Branch Inventory',
    category: {
      id: 'Sistem POS & Manajemen Gudang',
      en: 'POS & Multi-Branch Inventory',
    },
    year: '',
    summary: {
      id: 'Sistem POS (Point of Sale) modern dan manajemen inventaris berbasis web untuk operasional UMKM, butik, dan toko multi-cabang. Mengintegrasikan kasir cepat barcode scanner, promo grosir berjenjang, transfer stok massal antar-cabang dengan validasi real-time, cetak struk thermal 58mm/80mm, serta laporan keuangan otomatis tanpa biaya bulanan server.',
      en: 'A modern web-based Point of Sale (POS) and inventory management system designed for multi-branch retail, boutique, and store operations. Features fast barcode checkout, tiered wholesale promos, bulk branch stock transfers with real-time validation, 58mm/80mm thermal receipt printing, and automated financial reporting with zero monthly server costs.',
    },
    problem: {
      id: 'Bisnis UMKM multi-cabang menghadapi kerumitan rekonsiliasi manual: sering terjadi selisih stok fisik antar-gudang, antrean kasir lambat saat jam sibuk karena diskon bertingkat yang dihitung manual, serta beban biaya langganan bulanan software POS dan database cloud yang mahal bagi UMKM.',
      en: 'Multi-branch retail businesses struggle with manual reconciliation: inventory discrepancies between warehouses, slow checkout queues caused by manual tiered discount calculations, and costly recurring monthly subscription fees for cloud POS software and database servers.',
    },
    solution: {
      id: 'Membangun web app POS responsif berarsitektur serverless (Google Apps Script) dengan basis data Google Sheets yang memanfaatkan Lock Service & Cache Service untuk menjamin integritas transaksi tinggi. Menyediakan modul kasir cepat dengan barcode scanner, kalkulator promo grosir berjenjang otomatis, transfer stok massal antar-cabang anti-stok minus, cetak struk thermal, dan rekap omset/laba kotor per brand dan cabang.',
      en: 'Engineered a responsive serverless web POS application (Google Apps Script) with a Google Sheets database leveraging Lock Service & Cache Service to ensure transactional integrity. Equipped with instant barcode scanning, automated tiered wholesale promo engine, zero-negative bulk stock branch transfers, thermal receipt printing, and real-time revenue/gross profit breakdowns per brand and branch.',
    },
    impact: {
      id: 'Menjamin 100% Zero Server Cost tanpa biaya langganan bulanan, mengeliminasi risiko stok minus antar-cabang berkat validasi mutasi real-time, mempercepat waktu transaksi checkout kasir hingga hitungan detik, serta mempermudah audit harian pemilik usaha lewat laporan keuangan otomatis.',
      en: 'Guaranteed 100% Zero Server Cost with no monthly subscriptions, eliminated branch stock discrepancy risks through real-time transfer validation, accelerated cashier checkout time to seconds, and simplified daily business audits through automated financial reports.',
    },
    tech: ['Google Apps Script', 'Google Sheets API', 'JavaScript (ES6)', 'HTML5 & CSS3', 'Thermal Print SDK', 'Serverless'],
  },
  {
    id: 'booking-system',
    title: 'SiCuti — Employee Leave Management System',
    category: {
      id: 'Sistem HR & Operasional Karyawan',
      en: 'HR & Employee Operations System',
    },
    year: '',
    summary: {
      id: 'Aplikasi web sistem manajemen dan pengajuan cuti karyawan berbasis serverless cloud. Mengintegrasikan portal mandiri karyawan untuk pengajuan cuti dan unggah surat sakit ke Google Drive, dashboard persetujuan admin dengan auto-kalkulasi kuota cuti tahunan, kalender cuti tim interaktif, serta dispatch notifikasi email otomatis.',
      en: 'A serverless cloud-based employee leave management and approval web application. Integrates a self-service employee portal for leave submissions and doctor certificate Drive uploads, an admin approval dashboard with automated annual leave balance tracking, an interactive team leave calendar, and automated email dispatch.',
    },
    problem: {
      id: 'Proses pengajuan cuti konvensional lewat pesan instan atau kertas menyulitkan rekapitulasi HR: sering terjadi tumpang tindih jadwal cuti antar-karyawan, perhitungan sisa jatah tahunan manual rawan keliru, arsip surat keterangan dokter mudah tercecer, dan karyawan menunggu lama tanpa kejelasan status approval.',
      en: 'Conventional leave requests via chat messages or paper forms created HR overhead: unmonitored team schedule overlaps, error-prone manual annual leave quota calculations, misplaced medical certificate archives, and lengthy approval waiting times without clear tracking for employees.',
    },
    solution: {
      id: 'Membangun web app responsif dengan backend serverless Google Apps Script dan Google Sheets sebagai database multi-relasi (Data Karyawan, Database Cuti, Log Cuti). Dilengkapi autentikasi peran (Admin & Karyawan), auto-deduksi kuota cuti tahunan, integrasi Google Drive API untuk upload berkas medis, kalender cuti bersama terpadu, dan notifikasi email instan saat status cuti diputuskan.',
      en: 'Engineered a responsive web application powered by a Google Apps Script serverless backend and a multi-table Google Sheets database (Employees, Leave Requests, Leave Logs). Features role-based authentication (Admin & Employee), automated annual leave quota deductions, Google Drive API integration for medical document storage, a unified team leave calendar, and automated instant email notifications.',
    },
    impact: {
      id: 'Memangkas waktu birokrasi persetujuan cuti dari hitungan hari menjadi menit, mencapai 100% akurasi pencatatan sisa jatah cuti karyawan, mencegah bentrok jadwal kerja divisi berkat kalender transparan, serta beroperasi dengan 100% Zero Hosting Cost.',
      en: 'Reduced leave approval turnaround time from days to minutes, achieved 100% accurate employee leave balance tracking, eliminated divisional schedule conflicts via transparent calendar visibility, and operated with 100% Zero Hosting Cost.',
    },
    tech: ['Google Apps Script', 'Google Sheets API', 'Google Drive API', 'JavaScript (ES6)', 'HTML5 & CSS3', 'Gmail App Service'],
  },
  {
    id: 'battleground-samp',
    title: 'Sinister Battlegrounds — Modern Battle Royale SA-MP',
    category: {
      id: 'Game Server & Full-Stack Game Modding',
      en: 'Game Server & Full-Stack Modding',
    },
    year: '',
    badge: {
      id: 'Server Aktif • 300+ Member Discord',
      en: 'Server Live • 300+ Discord Members',
    },
    link: 'https://dsc.gg/sinisterbr',
    linkText: {
      id: 'Gabung Discord Komunitas (300+ Member)',
      en: 'Join Discord Community (300+ Members)',
    },
    summary: {
      id: 'Transformasi modern dari game klasik GTA San Andreas Multiplayer (SA-MP 2004) menjadi arena kompetitif Battle Royale berlatar kota Los Santos. Dilengkapi HUD & sistem inventaris web modern berbasis Chromium Embedded Framework (CEF), proximity 3D voice chat in-game (SampVoice), zona radiasi dinamis, skydive parachuting, serta integrasi bot Discord otomatis untuk komunitas aktif 300+ anggota.',
      en: 'A modern overhaul of classic GTA San Andreas Multiplayer (SA-MP 2004) into a competitive Battle Royale experience across Los Santos. Features a modern web HUD and inventory system powered by Chromium Embedded Framework (CEF), in-game 3D proximity voice chat (SampVoice), dynamic shrinking safe zones, airdrop skydive parachuting, and automated Discord bot integration serving an active community of 300+ members.',
    },
    problem: {
      id: 'Server GTA SA-MP klasik umumnya masih mengandalkan antarmuka TextDraw jadul era 2000-an yang kaku, ketiadaan voice chat bawaan di dalam game, serta mode deathmatch biasa yang repetitif tanpa alur kompetitif modern.',
      en: 'Classic GTA SA-MP servers still rely on rigid, outdated 2000s TextDraw interfaces, lack built-in in-game voice communication, and offer repetitive deathmatch gameplay with no structured modern competitive flow.',
    },
    solution: {
      id: 'Membangun arsitektur server open.mp (C++ & Pawn) berkinerja tinggi yang dihubungkan dengan CEF (HTML5, CSS3, JavaScript) untuk menghadirkan HUD futuristik, manajemen inventaris drag-and-drop, dan custom login screen. Mengintegrasikan SampVoice untuk spatial audio 3D, menyusun game loop Battle Royale (skydive parachuting, safe zone menyusut dinamis, loot crate acak), query database MySQL asynchronous, dan bot Discord bridge untuk sinkronisasi status live server.',
      en: 'Engineered an open.mp server architecture (Pawn & C++) integrated with Chromium Embedded Framework (HTML5, CSS3, JavaScript) to deliver a futuristic HUD, drag-and-drop inventory management, and custom login screens. Integrated SampVoice for 3D spatial audio, crafted the full Battle Royale match loop (parachuting, dynamic shrinking zones, randomized loot crates), asynchronous MySQL database querying, and a Discord bridge bot for live server synchronization.',
    },
    impact: {
      id: 'Menghidupkan kembali nostalgia GTA San Andreas dengan gameplay modern setara rilis game masa kini, menjaga tickrate server stabil dengan latensi rendah (<30ms), serta membangun komunitas gaming aktif yang saat ini telah mencapai 300+ member Discord.',
      en: 'Breathed new life into classic GTA San Andreas with 2026-era modern multiplayer gameplay, maintained high server tickrates with low latency (<30ms), and grew an active gaming community currently exceeding 300+ Discord members.',
    },
    tech: ['Pawn', 'open.mp (C++)', 'CEF (HTML5/CSS3/JS)', 'SampVoice', 'MySQL / MariaDB', 'Discord Bot API'],
  },
];

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    const lenisObj = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      lenisObj?.stop();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenisObj?.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenisObj?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="work" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <Reveal className="mb-14 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            {t('PORTOFOLIO', 'PORTFOLIO')}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('Karya Terpilih', 'Selected Work')}
          </h2>
          <p className="mt-3 text-base text-slate-500 max-w-xl mx-auto">
            {t(
              'Kumpulan aplikasi web, tools, dan sistem kustom yang telah saya rancang dan bangun.',
              'A curation of web applications, tools, and custom systems I have designed and built.',
            )}
          </p>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((project, idx) => {
            const categoryText = lang === 'ID' ? project.category.id : project.category.en;
            const summaryText = lang === 'ID' ? project.summary.id : project.summary.en;

            return (
              <Reveal key={project.id} delay={idx * 80}>
                <article
                  className="group rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full"
                >
                <div>
                  {/* Visual Preview */}
                  {project.id === 'heylen-ai' ? (
                    <HeylenGallery />
                  ) : project.id === 'client-dashboard' ? (
                    <PosShowcase />
                  ) : project.id === 'booking-system' ? (
                    <CutiGallery />
                  ) : project.id === 'battleground-samp' ? (
                    <SinisterGallery />
                  ) : (
                    <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                        />
                      ) : null}
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span>{categoryText}</span>
                        {project.badge && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#5865F2]" />
                            {lang === 'ID' ? project.badge.id : project.badge.en}
                          </span>
                        )}
                      </div>
                      {project.id === 'heylen-ai' ? (
                        <span className="font-medium text-slate-500">{t('Proyek Personal', 'Personal Project')}</span>
                      ) : project.year ? (
                        <span className="font-medium text-slate-500">{project.year}</span>
                      ) : null}
                    </div>

                    <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {summaryText}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <div className="mt-3.5 pt-3 border-t border-slate-100">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-xs transition-colors shadow-xs hover:shadow-sm"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                          <span>{project.linkText ? (lang === 'ID' ? project.linkText.id : project.linkText.en) : t('Kunjungi Proyek', 'Visit Project')}</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Case Study Button */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="w-full inline-flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer py-1 group/btn"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FileText size={15} className="text-slate-400 group-hover/btn:text-slate-700 transition-colors" />
                      {t('Lihat Studi Kasus', 'View Case Study')}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-slate-500 group-hover/btn:text-slate-900 group-hover/btn:translate-x-0.5 transition-all">
                      {t('Buka', 'Open')}
                      <ArrowUpRight size={13} />
                    </span>
                  </button>
                </div>
              </article>
            </Reveal>
          );
        })}
        </div>
      </div>

      {/* Case Study Modal Dialog */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs overscroll-contain animate-in fade-in duration-150"
          onClick={() => setSelectedProject(null)}
        >
          <div
            data-lenis-prevent
            className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden overscroll-contain animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 flex items-start justify-between gap-4 p-6 sm:p-7 border-b border-slate-100 bg-slate-50/70">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {lang === 'ID' ? selectedProject.category.id : selectedProject.category.en}
                  </span>
                  {selectedProject.badge && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-600 bg-white border border-slate-200 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5865F2]" />
                      {lang === 'ID' ? selectedProject.badge.id : selectedProject.badge.en}
                    </span>
                  )}
                  {selectedProject.id === 'heylen-ai' ? (
                    <span className="text-xs font-medium text-slate-400">
                      • {t('Proyek Personal', 'Personal Project')}
                    </span>
                  ) : selectedProject.year ? (
                    <span className="text-xs font-medium text-slate-400">
                      • {selectedProject.year}
                    </span>
                  ) : null}
                </div>
                <h3 id="case-study-title" className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label={t('Tutup modal', 'Close modal')}
                className="shrink-0 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div
              data-lenis-prevent
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-7 space-y-4 text-sm text-slate-600 leading-relaxed"
              onWheel={(e) => e.stopPropagation()}
            >
              <div>
                <strong className="text-slate-900 block mb-1 font-semibold">
                  {t('Tantangan / Masalah:', 'The Challenge:')}
                </strong>
                <p>
                  {lang === 'ID' ? selectedProject.problem.id : selectedProject.problem.en}
                </p>
              </div>

              <div>
                <strong className="text-slate-900 block mb-1 font-semibold">
                  {t('Solusi yang Dibangun:', 'My Solution:')}
                </strong>
                <p>
                  {lang === 'ID' ? selectedProject.solution.id : selectedProject.solution.en}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1 font-semibold">
                  {selectedProject.id === 'heylen-ai'
                    ? t('Hasil Implementasi:', 'Implemented Features:')
                    : t('Hasil & Dampak:', 'The Result:')}
                </strong>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {lang === 'ID' ? selectedProject.impact.id : selectedProject.impact.en}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 p-5 sm:px-7 border-t border-slate-100 bg-slate-50/70">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
              >
                {t('Tutup', 'Close')}
              </button>

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs transition-colors shadow-xs ${
                    selectedProject.id === 'battleground-samp'
                      ? 'bg-[#5865F2] hover:bg-[#4752C4]'
                      : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  <span>
                    {selectedProject.linkText
                      ? lang === 'ID'
                        ? selectedProject.linkText.id
                        : selectedProject.linkText.en
                      : t('Kunjungi Proyek', 'Visit Project')}
                  </span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
