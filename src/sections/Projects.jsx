import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { projects, projectCategories } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import Section from '../components/Section';
import Modal from '../components/Modal';
export default function Projects() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const visible = projects.filter(item => category === 'All' || item.category === category);
  return <Section id="projects" title="A selection of my work." subtitle="Ruang untuk hasil pekerjaan, proses, dan karya yang terus berkembang."><div className="filters" aria-label="Filter proyek">{projectCategories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === 'All' ? 'Semua proyek' : item}</button>)}</div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"><AnimatePresence mode="popLayout">{visible.map(project => <ProjectCard key={project.id} project={project} onClick={setSelected} />)}</AnimatePresence></div>{!visible.length && <p className="notice">Belum ada proyek untuk kategori ini. Karya berikutnya akan ditambahkan di sini.</p>}{selected && <Modal title={selected.title} onClose={() => setSelected(null)}><p className="text-primary-light mb-4">{selected.category} · {selected.year}</p><p className="leading-relaxed">{selected.description}</p><div className="tags my-6">{selected.tools.map(tool => <span key={tool}>{tool}</span>)}</div>{[selected.image, ...selected.gallery].filter(Boolean).map((src, i) => <a key={src} href={src} target="_blank" rel="noreferrer"><img src={src} alt={`${selected.title} — ${i+1}`} className="rounded-xl mb-4" loading="lazy" /></a>)}{!selected.image && !selected.gallery.length && <p className="notice">Ringkasan berdasarkan pengalaman yang diberikan. Dokumentasi hasil pekerjaan belum ditambahkan.</p>}<div className="flex gap-4 mt-5">{selected.link && <a className="text-primary-light underline" href={selected.link} target="_blank" rel="noreferrer">Live demo ↗</a>}{selected.github && <a className="text-primary-light underline" href={selected.github} target="_blank" rel="noreferrer">GitHub ↗</a>}</div></Modal>}</Section>;
}
