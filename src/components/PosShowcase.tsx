import { useRef, useState } from 'react';
import { Maximize2, X, Image as ImageIcon, ShoppingCart, Printer, Barcode } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const assets = import.meta.glob<string>('../assets/showcases/pos/*.{png,jpg,jpeg,webp}', {
  eager: true, query: '?url', import: 'default',
});

const findPosAsset = () => {
  const extensions = ['png', 'jpg', 'jpeg', 'webp'];
  for (const ext of extensions) {
    const asset = assets[`../assets/showcases/pos/pos.${ext}`];
    if (asset) return asset;
  }
  const anyKey = Object.keys(assets)[0];
  if (anyKey) return assets[anyKey];
  return null;
};

export default function PosShowcase() {
  const { lang, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const source = findPosAsset();

  const title = lang === 'ID'
    ? 'Point of Sale (POS) & Multi-Branch Inventory'
    : 'Point of Sale (POS) & Multi-Branch Inventory';

  return (
    <div role="region" aria-label={title} className="flex flex-col border-b border-slate-200 bg-white">
      {/* Media area */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {source && !failed ? (
          <img
            src={source}
            alt={title}
            className="h-full w-full object-cover object-top transition-transform duration-300"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-5 text-white select-none">
            <div aria-hidden="true" className="absolute -right-10 -top-16 h-60 w-60 rounded-full border border-emerald-500/10 bg-emerald-500/5" />
            <div aria-hidden="true" className="absolute -bottom-20 -left-10 h-60 w-60 rounded-full border border-teal-500/10 bg-teal-500/5" />

            {/* Mockup Header */}
            <div className="relative flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShoppingCart size={15} />
                </span>
                <span className="font-display text-xs font-bold tracking-tight text-white">
                  Otomatisin POS Cloud
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Multi-Cabang Live</span>
              </div>
            </div>

            {/* Mockup Stats */}
            <div className="relative grid grid-cols-3 gap-2 my-auto">
              <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-xs">
                <span className="text-[10px] text-slate-400 block font-medium">{t('Kasir / Checkout', 'POS Checkout')}</span>
                <span className="font-display text-sm font-bold text-emerald-300 mt-0.5 block">Rp 4.850.000</span>
                <span className="text-[9px] text-emerald-400/90 font-medium">68 {t('Transaksi Hari Ini', 'Today Orders')}</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-xs">
                <span className="text-[10px] text-slate-400 block font-medium">{t('Gudang Utama', 'Main Warehouse')}</span>
                <span className="font-display text-sm font-bold text-white mt-0.5 block">1.420 Pcs</span>
                <span className="text-[9px] text-slate-400">3 {t('Cabang Terhubung', 'Branches Synced')}</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-xs">
                <span className="text-[10px] text-slate-400 block font-medium">{t('Validasi Stok', 'Stock Validation')}</span>
                <span className="font-display text-sm font-bold text-teal-300 mt-0.5 block">Real-Time</span>
                <span className="text-[9px] text-teal-400/90">Anti-Minus Lock</span>
              </div>
            </div>

            {/* Mockup Feature Badges */}
            <div className="relative flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-white/10 text-[10px] text-slate-300">
              <span className="inline-flex items-center gap-1 text-slate-300">
                <Barcode size={12} className="text-emerald-400" />
                <span>Barcode Scanner &amp; Grosir</span>
              </span>
              <span className="inline-flex items-center gap-1 text-slate-300">
                <Printer size={12} className="text-emerald-400" />
                <span>Thermal 58/80mm</span>
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-300">
                {t('Screenshot segera tersedia (pos.png)', 'Screenshot available via pos.png')}
              </span>
            </div>
          </div>
        )}

        {/* Expand Button */}
        {source && !failed && (
          <button
            type="button"
            onClick={() => {
              setExpanded(true);
              dialog.current?.showModal();
            }}
            aria-label={t('Perbesar showcase', 'Expand showcase')}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white hover:bg-slate-800 shadow-sm"
          >
            <Maximize2 size={17} />
          </button>
        )}
      </div>

      {/* Showcase Bottom Bar */}
      <div className="flex h-12 items-center justify-between gap-2 px-3 border-t border-slate-100 bg-slate-50/80">
        <div className="min-w-0" aria-live="polite" aria-atomic="true">
          <p className="text-xs text-slate-500 font-medium">01 / 01</p>
          <p className="sr-only">{title}</p>
        </div>

        <div className="flex" aria-hidden="true">
          <span className="h-1.5 w-4 rounded-full bg-slate-900" />
        </div>

        <div className="w-10" aria-hidden="true" />
      </div>

      {/* Expanded Modal */}
      <dialog
        ref={dialog}
        aria-label={t('Showcase POS diperbesar', 'Expanded POS showcase')}
        onClose={() => setExpanded(false)}
        className="fixed inset-0 m-auto max-h-[95dvh] w-[min(96vw,1200px,calc(168.8889dvh_-_16rem))] max-w-none overflow-auto rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-slate-950/85"
      >
        {expanded && (
          <>
            <div className="flex items-center justify-between gap-4 p-4">
              <span className="text-sm font-semibold text-slate-900">{title}</span>
              <button
                type="button"
                autoFocus
                onClick={() => dialog.current?.close()}
                aria-label={t('Tutup showcase', 'Close showcase')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                <X size={19} />
              </button>
            </div>
            <div className="aspect-video w-full bg-slate-950 flex items-center justify-center">
              {source && (
                <img
                  src={source}
                  alt={title}
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <span className="flex items-center gap-2 text-xs text-slate-500">
                <ImageIcon size={15} aria-hidden="true" />
                1 / 1
              </span>
              <span className="text-xs text-slate-400">
                {t('Screenshot resolusi penuh', 'Full resolution screenshot')}
              </span>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}

