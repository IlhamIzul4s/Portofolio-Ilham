import SectionTitle from './SectionTitle';
export default function Section({ id, title, subtitle, children }) {
  return <section id={id} className="section-padding"><div className="max-w-6xl mx-auto"><SectionTitle title={title} subtitle={subtitle} align="left" />{children}</div></section>;
}
