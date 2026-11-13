import Linkedin from '../components/LinkedInIcon';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { useState } from 'react';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../data/personal';
import Section from '../components/Section';
export default function Contact() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  async function submit(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (!endpoint) {
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(`${values.message}\n\nDari: ${values.name}\nEmail: ${values.email}`)}`;
      setStatus('Draf dibuka di aplikasi email Anda. Pesan baru terkirim setelah Anda menekan Kirim di aplikasi tersebut.'); return;
    }
    setSending(true); setStatus('');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(values) });
      if (!response.ok) throw new Error('Gagal');
      setStatus('Pesan berhasil dikirim. Terima kasih sudah menghubungi saya.'); e.target.reset();
    } catch { setStatus('Pesan belum terkirim. Silakan coba lagi atau gunakan tautan email langsung.'); }
    finally { setSending(false); }
  }
  return <Section id="contact" title="Let's make things happen." subtitle="Punya kesempatan atau ingin berkenalan? Saya senang mendengar dari Anda."><div className="grid lg:grid-cols-2 gap-12"><div><p className="text-2xl leading-relaxed font-medium mb-8">Sebuah percakapan bisa menjadi awal dari <span className="gradient-text">kolaborasi yang berarti.</span></p><a className="contact-link" href={`mailto:${personalInfo.email}`}><Mail size={20} /><span>{personalInfo.email}</span><ArrowUpRight size={18}/></a><a className="contact-link" href={personalInfo.whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon size={20} /><span>WhatsApp</span><ArrowUpRight size={18}/></a><a className="contact-link" href={personalInfo.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /><span>Terhubung di LinkedIn</span><ArrowUpRight size={18}/></a><p className="contact-link muted"><MapPin size={20} />{personalInfo.location}</p></div><form className="surface rounded-2xl p-6 sm:p-8 space-y-5" onSubmit={submit}><div className="grid sm:grid-cols-2 gap-5"><label>Nama<input name="name" autoComplete="name" required maxLength={100} placeholder="Nama Anda" /></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="nama@email.com" /></label></div><label>Subjek<input name="subject" required maxLength={200} placeholder="Mari berkolaborasi" /></label><label>Pesan<textarea name="message" required rows={5} maxLength={5000} placeholder="Ceritakan kesempatan atau ide Anda..." /></label>{!endpoint && <p className="muted text-xs">Form ini membuka draf di aplikasi email. Pengiriman langsung tersedia setelah layanan email dikonfigurasi.</p>}<button className="primary-button w-full" disabled={sending}>{sending ? 'Mengirim...' : endpoint ? 'Send Message ↗' : 'Buka draf email ↗'}</button><p role="status" className="text-sm">{status}</p></form></div></Section>;
}

