import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, LayoutDashboard, MessageCircle, Play, Maximize2, X, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ShowcaseSlides from './ShowcaseSlides';

// Files are discovered at build time; missing assets never create broken media URLs.
const assets = import.meta.glob<string>('../assets/showcases/heylen/*.{png,jpg,jpeg,webp,mp4,webm,vtt}', {
  eager: true, query: '?url', import: 'default',
});
const findAsset = (name: string, extensions: string[]) => extensions
  .map((extension) => assets[`../assets/showcases/heylen/${name}.${extension}`])
  .find(Boolean);

const slides = [
  { key: 'dashboard', title: ['Dashboard belajar', 'Learning dashboard'], description: ['XP, streak, dan aktivitas belajar dalam satu tampilan.', 'XP, streaks, and learning activity in one view.'], icon: LayoutDashboard },
  { key: 'chat', title: ['Tutor AI', 'AI tutor'], description: ['Tanya materi, lampirkan dokumen, dan pelajari pembahasannya.', 'Ask questions, attach documents, and explore explanations.'], icon: MessageCircle },
  { key: 'demo', title: ['Demo singkat', 'Quick walkthrough'], description: ['Lihat alur belajar heylen.id dalam video singkat.', 'Explore the heylen.id learning flow in a short video.'], icon: Play },
];

function SlideMedia({ index, large = false, active = true }: { index: number; large?: boolean; active?: boolean }) {
  const { lang, t } = useLanguage();
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Keep the last video frame for the fade, but never play a hidden slide.
    if (!active) video.current?.pause();
  }, [active]);
  const slide = slides[index];
  const Icon = slide.icon;
  const isVideo = slide.key === 'demo';
  const source = findAsset(slide.key, isVideo ? ['mp4', 'webm'] : ['png', 'jpg', 'jpeg', 'webp']);
  const title = slide.title[lang === 'ID' ? 0 : 1];

  if (source && !failed) {
    return isVideo ? (
      <video
        ref={video} controls playsInline preload={active ? 'metadata' : 'none'}
        poster={findAsset('demo-poster', ['png', 'jpg', 'jpeg', 'webp'])}
        className={`h-full w-full ${large ? 'object-contain' : 'object-cover'}`} aria-label={`heylen.id — ${title}`}
        onError={() => setFailed(true)}
      >
        <source src={source} type={source.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        {findAsset('demo-' + lang.toLowerCase(), ['vtt']) && (
          <track kind="captions" src={findAsset('demo-' + lang.toLowerCase(), ['vtt'])} srcLang={lang.toLowerCase()} label={lang === 'ID' ? 'Indonesia' : 'English'} default />
        )}
      </video>
    ) : (
      <img
        src={source}
        alt={`heylen.id — ${title}`}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full ${large ? 'object-contain' : 'object-cover object-top'}`}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className={`relative flex h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 px-6 text-center ${large ? 'py-16' : 'py-3'}`}>
      <div aria-hidden="true" className="absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/5 bg-teal-400/5" />
      <div aria-hidden="true" className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border border-teal-300/10" />
      <span className={`relative items-center justify-center rounded-2xl border border-teal-200/20 bg-teal-300/10 text-teal-200 ${large ? 'mb-5 inline-flex h-20 w-20' : 'hidden'}`}>
        <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="relative text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-200/80">heylen.id / {String(index + 1).padStart(2, '0')}</span>
      <p className={`relative mt-2 font-display font-bold tracking-tight text-white ${large ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>{title}</p>
      {large && <p className="relative mt-3 max-w-md text-sm leading-relaxed text-slate-300">{slide.description[lang === 'ID' ? 0 : 1]}</p>}
      <span className="relative mt-3 rounded-full border border-white/10 px-3 py-1 text-[10px] text-slate-400">
        {failed ? t('Media belum dapat ditampilkan', 'Media currently unavailable') : isVideo ? t('Video demo segera tersedia', 'Demo video coming soon') : t('Screenshot segera tersedia', 'Screenshots coming soon')}
      </span>
    </div>
  );
}

function SlideViewport({ index, large = false }: { index: number; large?: boolean }) {
  return (
    <ShowcaseSlides activeIndex={index}>
      {slides.map((slide, position) => (
        <SlideMedia key={slide.key} index={position} large={large} active={position === index} />
      ))}
    </ShowcaseSlides>
  );
}

export default function HeylenGallery() {
  const { lang, t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const move = (direction: number) => setIndex((current) => (current + direction + slides.length) % slides.length);
  const slide = slides[index];
  const title = slide.title[lang === 'ID' ? 0 : 1];

  const navigation = (
    <div className="flex shrink-0 items-center gap-2">
      <button type="button" onClick={() => move(-1)} aria-label={t('Media sebelumnya', 'Previous media')} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100"><ArrowLeft size={17} /></button>
      <button type="button" onClick={() => move(1)} aria-label={t('Media berikutnya', 'Next media')} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100"><ArrowRight size={17} /></button>
    </div>
  );

  return (
    <div role="region" aria-roledescription={t('Galeri geser', 'Carousel')} aria-label={t('Showcase heylen.id', 'heylen.id showcase')} className="flex flex-col border-b border-slate-200 bg-white">

      <div
        tabIndex={0} aria-label={t('Galeri: gunakan panah kiri dan kanan untuk berpindah', 'Gallery: use left and right arrows to navigate')}
        className="relative aspect-video w-full overflow-hidden bg-slate-900"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        onTouchStart={(event) => {
          if (slide.key === 'demo') return;
          touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }}
        onTouchEnd={(event) => {
          if (!touchStart.current) return;
          const dx = event.changedTouches[0].clientX - touchStart.current.x;
          const dy = event.changedTouches[0].clientY - touchStart.current.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
          touchStart.current = null;
        }}
        onTouchCancel={() => { touchStart.current = null; }}
      >
        {!expanded && <SlideViewport index={index} />}
        <button type="button" onClick={() => { setExpanded(true); dialog.current?.showModal(); }} aria-label={t('Perbesar showcase', 'Expand showcase')} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white hover:bg-slate-800 shadow-sm"><Maximize2 size={17} /></button>
      </div>

      <div className="flex h-12 items-center justify-between gap-2 px-3 border-t border-slate-100 bg-slate-50/80">
          <div className="min-w-0" aria-live="polite" aria-atomic="true">
            <p className="text-xs text-slate-500">{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</p>
            <p className="sr-only">{title}</p>
          </div>
        <div className="flex" aria-label={t('Pilih media', 'Choose media')}>
          {slides.map((item, position) => {
            return (
              <button type="button" key={item.key} onClick={() => setIndex(position)} aria-pressed={index === position} aria-label={item.title[lang === 'ID' ? 0 : 1]} title={item.title[lang === 'ID' ? 0 : 1]} className="flex h-8 w-6 items-center justify-center rounded-full">
                <span className={`h-1.5 rounded-full transition-colors ${index === position ? 'w-4 bg-slate-900' : 'w-1.5 bg-slate-300'}`} />
              </button>
            );
          })}
        </div>
        {navigation}
      </div>

      <dialog ref={dialog} aria-label={t('Showcase heylen.id diperbesar', 'Expanded heylen.id showcase')} onClose={() => setExpanded(false)} className="fixed inset-0 m-auto max-h-[95dvh] w-[min(96vw,1200px,calc(168.8889dvh_-_16rem))] max-w-none overflow-auto rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-slate-950/85">
        {expanded && <>
          <div className="flex items-center justify-between gap-4 p-4">
            <span className="text-sm font-semibold text-slate-900">heylen.id — {title}</span>
            <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label={t('Tutup showcase', 'Close showcase')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"><X size={19} /></button>
          </div>
          <div className="aspect-video w-full bg-slate-950"><SlideViewport index={index} large /></div>
          <div className="flex items-center justify-between gap-3 p-4">
            <span className="flex items-center gap-2 text-xs text-slate-500">
              {slide.key === 'demo' ? <Play size={14} className="fill-current" aria-hidden="true" /> : <ImageIcon size={15} aria-hidden="true" />}
              {index + 1} / {slides.length}
            </span>
            {navigation}
          </div>
        </>}
      </dialog>
    </div>
  );
}
