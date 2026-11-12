import { mkdirSync, writeFileSync } from 'node:fs';
import { personalInfo, education } from '../src/data/personal.js';
import { experiences } from '../src/data/experience.js';
mkdirSync('public/music', { recursive: true });
mkdirSync('public/cv', { recursive: true });
// Original ambient chord compositions; no third-party recordings or melodies.
for (const [name, chords] of [
  ['quiet-focus', [[130.81,164.81,196],[110,130.81,164.81],[87.31,110,130.81],[98,123.47,146.83]]],
  ['after-hours', [[146.83,174.61,220],[116.54,146.83,174.61],[130.81,164.81,196],[110,138.59,164.81]]],
]) {
  const rate = 16000, seconds = 32, samples = rate * seconds;
  const wav = Buffer.alloc(44 + samples * 2);
  wav.write('RIFF'); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16,16); wav.writeUInt16LE(1,20); wav.writeUInt16LE(1,22);
  wav.writeUInt32LE(rate,24); wav.writeUInt32LE(rate * 2,28); wav.writeUInt16LE(2,32); wav.writeUInt16LE(16,34); wav.write('data',36); wav.writeUInt32LE(samples * 2,40);
  for (let i = 0; i < samples; i++) {
    const t = i / rate, local = t % 8;
    const envelope = Math.sin(Math.PI * local / 8) ** 2 * Math.min(t / 2,1,(seconds-t)/2);
    const chord = chords[Math.floor(t / 8)];
    const value = chord.reduce((sum, f, j) => sum + Math.sin(2*Math.PI*f*t + .12*Math.sin(t*.7+j))*.065 + Math.sin(2*Math.PI*f*2*t)*.012, 0);
    wav.writeInt16LE(Math.round(value * envelope * 32767), 44+i*2);
  }
  writeFileSync(`public/music/${name}.wav`,wav);
}
// Plain, selectable-text PDF generated exclusively from supplied portfolio data.
const ascii = text => String(text).normalize('NFKD').replace(/[^\x20-\x7e]/g,' - ').replace(/\s+/g,' ').trim();
const lines = [];
const wrap = (text, size=10) => {
  const words = ascii(text).split(' '); let line='';
  for (const word of words) { if ((line+' '+word).length > 93) { lines.push([line,size]); line=word; } else line += (line?' ':'')+word; }
  if (line) lines.push([line,size]);
};
wrap(personalInfo.name.toUpperCase(),22);
wrap(personalInfo.headline,10);
wrap(`${personalInfo.email} | ${personalInfo.location}`,10);
wrap(personalInfo.linkedin,10); lines.push(['',10]);
wrap('PROFIL',12); wrap(personalInfo.description); lines.push(['',10]);
wrap('PENGALAMAN KERJA',12);
for (const item of [...experiences].sort((a,b) => b.startDate.localeCompare(a.startDate))) {
  wrap(`${item.company} | ${item.position}`,11); wrap(`${item.period} | ${item.location}`);
  for (const desc of item.description) wrap(`- ${desc}`);
  lines.push(['',8]);
}
wrap('PENDIDIKAN',12);
for (const edu of education) { wrap(`${edu.institution} | ${edu.degree}`,11); wrap(`${edu.period} | IPK ${edu.gpa}`); edu.activities.forEach(item=>wrap(`- ${item}`)); }
lines.push(['',8]); wrap('KEAHLIAN',12); wrap('Microsoft Word, Excel, PowerPoint, Data Entry, Document Filing, School Administration, EMIS, Simpatika, Verval PD, RDM.');
const pages = []; let page = [], y = 790;
for (const [text,size] of lines) { if (y < 45) { pages.push(page); page=[]; y=790; } page.push(`BT /F1 ${size} Tf 45 ${y} Td (${text.replace(/([\\()])/g,'\\$1')}) Tj ET`); y -= size + 5; }
if (page.length) pages.push(page);
const objects = ['', '', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
const kids=[];
for (const content of pages) {
  const pageId = objects.length+1, streamId=pageId+1; kids.push(`${pageId} 0 R`);
  const stream=content.join('\n');
  objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${streamId} 0 R >>`);
  objects.push(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
}
objects[0]='<< /Type /Catalog /Pages 2 0 R >>'; objects[1]=`<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${pages.length} >>`;
let pdf='%PDF-1.4\n', offsets=[0];
objects.forEach((object,i)=>{ offsets.push(Buffer.byteLength(pdf)); pdf+=`${i+1} 0 obj\n${object}\nendobj\n`; });
const xref=Buffer.byteLength(pdf); pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;
offsets.slice(1).forEach(offset=>{ pdf+=`${String(offset).padStart(10,'0')} 00000 n \n`; });
pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
writeFileSync('public/cv/CV_Ilham_Izulhaq.pdf',pdf);
writeFileSync('public/favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#17131f"/><text x="15" y="46" fill="#b798ed" font-family="Georgia" font-size="43">II</text></svg>');
console.log(`Created 2 original ambient tracks and ${pages.length}-page CV.`);
