import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal({ title, children, onClose }) {
  const panel = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current.focus();
    const keyboard = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const items = panel.current.querySelectorAll('button, a[href], input, textarea, [tabindex="0"]');
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', keyboard);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', keyboard); previous?.focus(); };
  }, [onClose]);
  return createPortal(<div className="modal-backdrop" onClick={onClose}><div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1} ref={panel} onClick={e => e.stopPropagation()}><div className="flex items-start justify-between gap-4 mb-6"><h2 id="modal-title" className="text-2xl font-bold">{title}</h2><button onClick={onClose} aria-label="Tutup dialog" className="icon-button"><X /></button></div>{children}</div></div>, document.body);
}
