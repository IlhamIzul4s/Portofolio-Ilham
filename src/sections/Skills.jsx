import { hardSkills, softSkills, softwareSkills } from '../data/skills';
import { Database, MessageCircle, LayoutGrid, Monitor } from 'lucide-react';
import Section from '../components/Section';
export default function Skills() {
  const groups = [
    ...hardSkills.map((group, index) => ({ ...group, Icon: [LayoutGrid, Database][index] })),
    { category: 'People & Personal Skills', skills: softSkills, Icon: MessageCircle },
    { category: 'Software Skills', skills: softwareSkills, Icon: Monitor },
  ];

  return (
    <Section id="skills" title="The skills I bring." subtitle="Perpaduan kemampuan teknis, penguasaan software, dan cara bekerja yang berorientasi pada tim.">
      <div className="grid md:grid-cols-2 gap-6">
        {groups.map(({ category, skills, Icon }) => (
          <article className="surface p-7 rounded-2xl" key={category}>
            <Icon className="text-primary-light mb-6" size={30} />
            <h3 className="text-xl font-bold mb-5">{category}</h3>
            <div className="tags">
              {skills.map(skill => <span key={skill.name}>{skill.name}</span>)}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
