import { useState } from 'react';
import { experiences } from '../data/experience';
import ExperienceCard from '../components/ExperienceCard';
import ExperienceDocumentation from '../components/ExperienceDocumentation';
import Modal from '../components/Modal';
import Section from '../components/Section';

export default function Experience() {
  const [selected, setSelected] = useState(null);
  return (
    <Section id="experience" title="Experience that shapes me." subtitle="Dari ketelitian administrasi hingga dinamika di lapangan.">
      <div className="relative flex flex-col gap-8">
        <div className="timeline-line" />
        {[...experiences].sort((a, b) => b.startDate.localeCompare(a.startDate)).map((item, index) => (
          <ExperienceCard key={item.id} experience={item} index={index} onClick={setSelected} />
        ))}
      </div>
      {selected && (
        <Modal title={selected.company} onClose={() => setSelected(null)}>
          <p className="text-primary-light mb-2">{selected.position} · {selected.location}</p>
          <p className="muted mb-6">{selected.period}</p>
          <ul className="space-y-3 list-disc pl-5">{selected.description.map(text => <li key={text}>{text}</li>)}</ul>
          <div className="tags mt-6">{selected.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
          {selected.documentation?.length ? (
            <ExperienceDocumentation key={selected.id} photos={selected.documentation} company={selected.company} />
          ) : selected.image ? (
            <div className="experience-photo-stage mt-6">
              <img className="experience-photo" src={selected.image} alt={`Dokumentasi ${selected.company}`} />
            </div>
          ) : <p className="notice mt-6">Dokumentasi asli belum ditambahkan.</p>}
        </Modal>
      )}
    </Section>
  );
}
