import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function ExperienceDocumentation({ photos, company }) {
  const [index, setIndex] = useState(0);
  const move = delta => setIndex(current => (current + delta + photos.length) % photos.length);

  useEffect(() => {
    const handleKey = e => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); setIndex(i => (i + 1) % photos.length); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); setIndex(i => (i - 1 + photos.length) % photos.length); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [photos.length]);

  const photo = photos[index];
  return (
    <section className="mt-8" aria-label={`Foto dokumentasi ${company}`}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-semibold">Dokumentasi kegiatan</h3>
        <span className="muted text-sm" aria-live="polite">{index + 1} / {photos.length} foto</span>
      </div>
      <div className="experience-photo-stage">
        <img src={photo.src} alt={photo.alt} decoding="async" className="experience-photo" />
      </div>
      <div className="flex items-center justify-between gap-3 mt-3">
        <a href={photo.src} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-primary-light">Buka foto penuh <ExternalLink size={14} /></a>
        {photos.length > 1 && <div className="flex gap-2">
          <button className="icon-button" aria-label="Dokumentasi sebelumnya" onClick={() => move(-1)}><ChevronLeft size={20} /></button>
          <button className="icon-button" aria-label="Dokumentasi berikutnya" onClick={() => move(1)}><ChevronRight size={20} /></button>
        </div>}
      </div>
      {photos.length > 1 && <div className="experience-photo-thumbnails mt-4" aria-label="Pilih foto dokumentasi">
        {photos.map((item, i) => <button key={item.src} type="button" aria-label={`Lihat dokumentasi foto ${i + 1}`} aria-pressed={i === index} onClick={() => setIndex(i)}>
          <img src={item.thumbnail} alt="" loading="lazy" decoding="async" />
        </button>)}
      </div>}
    </section>
  );
}
