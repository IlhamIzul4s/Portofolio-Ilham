# Portfolio Ilham Izulhaq

Website React + Vite, Tailwind CSS, Framer Motion, dan Lucide. Konten utama berbahasa Indonesia dengan desain charcoal dan aksen ungu. Proyek ini dikerjakan pada checkout lokal; belum dipublikasikan.

## Menjalankan

```sh
npm install
npm run dev
```

Build produksi: `npm run build`. Preview build: `npm run preview`.

## Mengubah konten

- Profil, status mencari kerja, foto, dan tautan CV: `src/data/personal.js`.
- Pengalaman: `src/data/experience.js`.
- Proyek dan tautan demo/GitHub: `src/data/projects.js`.
- Keahlian: `src/data/skills.js`.
- Musik: `src/data/playlist.js`.

Simpan foto asli di `public/images/`, kemudian isi field `image`, `profileImage`, atau `aboutImage` dengan `/images/nama-file.webp`. Foto dokumentasi Experience tersedia di `public/documentation/` dan daftarnya di `src/data/documentation.js`. Foto profil masih menggunakan placeholder. Foto dokumentasi memiliki versi penuh untuk modal dan thumbnail yang lebih kecil untuk kartu. Proyek pekerjaan adalah ringkasan berdasarkan brief, bukan bukti dokumentasi yang sudah diunggah.

## CV dan musik

`public/cv/CV_Ilham_Izulhaq.pdf` adalah CV sederhana yang dibuat dari informasi pada brief, bukan file CV asli pengguna. Tinjau dan ganti file tersebut sebelum melamar pekerjaan. `npm run assets` membuat ulang CV serta dua komposisi ambient sintetis orisinal di `public/music/`. Musik tidak autoplay. File WAV dapat diganti MP3 milik sendiri atau musik berlisensi yang sesuai; perbarui playlist dan simpan atribusi bila diperlukan.

## Form kontak

Tanpa konfigurasi, form memvalidasi input lalu membuka draf di aplikasi email pengunjung. Ini membutuhkan aplikasi email yang sudah dikonfigurasi; website tidak mengklaim pesan telah terkirim.

Untuk pengiriman langsung, salin `.env.example` ke `.env.local`, isi `VITE_CONTACT_ENDPOINT` dengan endpoint layanan email Anda yang menerima JSON POST dan mendukung CORS, lalu mulai ulang dev server atau build ulang. Payload: `name`, `email`, `subject`, `message`. Aktifkan verifikasi penerima dan pengamanan spam pada layanan tersebut. Nilai `VITE_` bersifat publik; jangan masukkan secret API key.

## Deploy Vercel

Impor repository ke Vercel, pilih preset Vite, build command `npm run build`, output `dist`. Tambahkan `VITE_CONTACT_ENDPOINT` jika digunakan. Website ini statis dan tidak memerlukan React Router atau server untuk navigasi antar-section.

## Pengujian browser

`npm run test:e2e` menggunakan Chrome yang sudah terpasang di Windows. Perintah ini memulai server Vite untuk pengujian. Screenshot desktop dan mobile serta laporan disimpan di folder yang diabaikan Git.


