import documentation from './documentation.js';

export const experiences = [
  {
    id: 1,
    company: "MIS Panimbang",
    location: "Ciamis",
    position: "Staff TU",
    period: "Juli 2021 – Juni 2025",
    startDate: "2021-07",
    endDate: "2025-06",
    type: "Staff TU",
    description: [
      "Mengelola data sekolah melalui aplikasi Kementerian Agama.",
      "Mengoperasikan EMIS.",
      "Mengelola data melalui Simpatika.",
      "Mengelola dan melakukan pembaruan data Verval PD.",
      "Menggunakan aplikasi RDM untuk kebutuhan administrasi sekolah."
    ],
    skills: ["EMIS", "Simpatika", "Verval PD", "RDM", "Data Entry", "School Administration"],
    image: documentation['mis-panimbang'][0].thumbnail,
    documentation: documentation['mis-panimbang'],
    category: "Administration"
  },
  {
    id: 2,
    company: "CV Mustika Harapan",
    location: "Cikampek",
    position: "Admin (Freelance Remote)",
    period: "Februari 2022 – Agustus 2025",
    startDate: "2022-02",
    endDate: "2025-08",
    type: "Freelance Remote",
    description: [
      "Membantu pekerjaan administrasi perusahaan.",
      "Mengajukan penawaran harga untuk barang-barang keperluan perusahaan.",
      "Mendukung kebutuhan administrasi perusahaan General Supplier dan Construction."
    ],
    skills: ["Microsoft Word", "Microsoft Excel", "Document Filing", "Data Entry"],
    image: null,
    category: "Administration"
  },
  {
    id: 3,
    company: "Panada Coffee",
    location: "Ciamis",
    position: "Barista (Freelance)",
    period: "Januari 2023 – November 2025",
    startDate: "2023-01",
    endDate: "2025-11",
    type: "Freelance",
    description: [
      "Meracik dan menyajikan minuman, terutama kopi, sesuai pesanan pelanggan.",
      "Menerima pesanan dan memberikan pelayanan kepada pelanggan.",
      "Menjaga kebersihan area kerja.",
      "Memastikan ketersediaan stok bahan baku."
    ],
    skills: ["Communication", "Teamwork", "Time Management"],
    image: null,
    documentation: documentation['panada-coffee'],
    category: "Customer Service"
  },
  {
    id: 4,
    company: "Muntaz Production",
    location: "Jakarta",
    position: "Talent",
    period: "Juni 2025 – Januari 2026",
    startDate: "2025-06",
    endDate: "2026-01",
    type: "Talent",
    description: [
      "Team Leader: Mengkoordinasikan seluruh tim dan memastikan acara berjalan sesuai rundown.",
      "Crew: Menjalankan tugas teknis dan operasional di lapangan sesuai arahan TL.",
      "Tour Guide (LO): Memberikan informasi serta mendampingi peserta selama kegiatan berlangsung.",
      "Crew Crowd Control: Mengatur dan mengawasi pergerakan penonton agar acara berlangsung aman, tertib, dan nyaman."
    ],
    skills: ["Leadership", "Communication", "Teamwork", "Event Operations"],
    image: null,
    documentation: documentation['muntaz-production'],
    category: "Event Operations"
  }
];

