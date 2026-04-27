# Blueprint Arsitektur: AKU HEBAT

## 1. Prinsip Arsitektur (Domain-Driven Design & Separation of Concerns)
Aplikasi dibangun dengan arsitektur **Modular Monolith** menggunakan prinsip **DDD (Domain-Driven Design)** dan **SoC (Separation of Concerns)**. 

- **Aturan Emas**: Modul bisnis independen dan *plug-and-play*. Modul tidak boleh menyentuh atau memodifikasi Core System secara langsung. Semua komunikasi antar domain terjadi melalui **Event Bus**.
- **UI-First & Presentation**: Komponen UI dipisahkan secara murni (Dumb Components) dari logika bisnis (Smart Containers / Hooks).

## 2. Core System (Engine)
Berfungsi sebagai jantung aplikasi yang memberikan layanan dasar ke seluruh modul.
- **Event Bus (Event Dispatcher)**: Pusat komunikasi (Pub/Sub pattern). Modul memancarkan event (contoh: `QUIZ_ANSWERED`, `MODULE_COMPLETED`) yang bisa didengarkan oleh engine lain (seperti Gamification) tanpa kopling (coupling) langsung.
- **Audio / TTS Engine**: Adapter singleton yang menggunakan Native Web Speech API (bersifat *fallback-ready* ke Google Cloud TTS jika dibutuhkan). Menangani status play/stop dan firing event `AUDIO_START` / `AUDIO_END` agar UI dapat bereaksi secara reaktif (misal, memblokir input selama audio diputar).
- **Core Store / State Management**: Penyimpanan *state* global (Zustand) untuk Auth/Sesi Anak dan pengaturan aplikasi.

## 3. Modul Bisnis (3 Modul Rilis Awal)
Setiap modul menaungi alur *Onboarding* -> *Materi (Belajar)* -> *Latihan/Kuis*.

### Modul 1: Mengenal Abjad
- **Domain**: Pengenalan huruf tunggal (a-z).
- **Materi**: Grid/Carousel kartu huruf. Ketika ditekan, Audio Engine akan memutar suara pelafalan huruf.
- **Kuis (Mekanik "Find It")**: Audio Engine menyebutkan target huruf (contoh: "q"). Anak harus mencari dan menekan kartu "q" dari pilihan kartu acak yang salah.

### Modul 2: Huruf Vokal
- **Domain**: Penggabungan konsonan dan vokal menjadi suku kata dasar (ba, bi, bu, be, bo, dst).
- **Materi**: Pengenalan deret suku kata dari satu huruf konsonan. Contoh: materi huruf B akan menampilkan tombol pengucapan untuk b, ba, bi, bu, be, bo. 
- **Kuis (Mekanik "Arrange/Build")**: Audio Engine menyebutkan kata (contoh: "CUCI"). Muncul area drop/placeholder kosong. Anak harus memilih balok suku kata "cu" dan "ci" secara berurutan.

### Modul 3: Merakit Kalimat
- **Domain**: Penggabungan suku kata atau kata menjadi frasa/kalimat pendek bermakna (SPOK dasar).
- **Materi**: Membaca kartu kata utuh/kalimat pendek (contoh: "maya suka sate"). Disertai panduan suara.
- **Kuis (Mekanik "Sentence Builder")**: Audio Engine menyebutkan "BUDI BACA". Akan muncul urutan balok acak (di, ba, ba, bi) dan kotak kosong. Anak menyusun suku kata (atau kata utuh) hingga membentuk kalimat sasaran.

## 4. Gamification Engine (Terpisah dari Kuis)
Engine ini berdiri sendiri sebagai "pendengar" setia Event Bus. Modul Kuis TIDAK bertugas menambah EXP atau koin.
- **Score Engine**: Menghitung ketepatan jawaban kuis. Memancarkan event `SCORE_UPDATED`.
- **EXP & Leveling Engine**: Mendengarkan event dari Score Engine & penyelesaian materi. Mengkalkulasi EXP:
  - Skor sempurna/cepat (Combo) = Multiplier EXP.
  - Saat ambang batas EXP tercapai, memancarkan event `LEVEL_UP`.
- **Reward Engine**: Mendengarkan event `LEVEL_UP` atau `MISSION_CLEARED` untuk membuka akses lencana (Badge) atau hadiah virtual.

## 5. UI Engine & Shared Library
Berada di lapisan presentasi murni.
- **UI Kit**: Menggunakan pendekatan Atomic Design (Atoms, Molecules, Organisms) dibungkus dengan CVA (Class Variance Authority) untuk manajemen State & Variant (default, active, success, error, disabled).
- **Theme**: Konsep Claymorphism 3D (shadow, border, rounded-lg) untuk ramah anak (Kids Area).
- **Animation Layout**: Framer Motion sebagai penggerak interaksi mikro (micro-interactions) seperti pantulan koin, efek goyang saat salah *drag*, transisi antar soal.

## 6. Word Bank & Dynamic Quiz Engine (Smart Content)
Untuk meminimalisir input manual via Admin Panel, aplikasi menggunakan sistem **Word Bank Master** dan **Dynamic Generator Engine**. Materi dan Kuis dirakit secara *on-the-fly* oleh sistem berdasarkan level dan profil anak.

- **Word Bank (Sumber Kebenaran)**:
  Koleksi data terpusat skala besar yang menyimpan:
  - Teks Kata (contoh: "pesawat").
  - Pemenggalan suku kata (contoh: ["pe", "sa", "wat"]).
  - Pemenggalan huruf (contoh: ["p","e","s","a","w","a","t"]).
  - Metadata tambahan: URL Gambar / Emoji (contoh: "🛫"), Kategori (Benda), Tingkat kesulitan dasar.
  *Admin hanya perlu memasukkan data kata ini sekali saja, sisanya diurus oleh Engine.*

- **Adaptive Quiz Engine (Generator Soal Dinamis)**:
  Engine ini membaca profil anak (Progress Level) lalu mengambil kata dari Word Bank dan me-render (memformulasikan) soal kuis dengan tingkat kesulitan (obfuscation) yang sesuai.
  - **Level 1 (Pemula / Abjad)**: 
    Engine memotong 1 huruf secara acak dari kata. 
    *Contoh soal pesawat*: Minta anak melengkapi "P _ S A W A T".
  - **Level 2 (Menengah / Suku Kata Vokal)**: 
    Engine memotong 1 atau lebih balok suku kata.
    *Contoh soal pesawat*: Minta anak melengkapi suku kata yang hilang "PE __ WA T".
  - **Level 3 (Mahir / Rangkai Akhiran)**: 
    Engine memotong bagian lebih besar atau meminta anak merakit keseluruhan suku kata dari nol.
    *Contoh soal pesawat*: Minta anak melengkapi "PE SA ___".
  
- **Sistem Keuntungan (Benefit)**:
  - **Reusability Tinggi**: 1 kata dalam Word Bank (misal: "sapi") bisa digunakan untuk ratusan tipe kuis berbeda dari level 1 hingga level ultimate, tanpa perlu membuat data soal secara spesifik satu persatu di database.
  - **Plug & Play**: Saat nanti ditambahkan level/materi baru (contoh: akhiran mati -an, -in, -en), Quiz Engine hanya perlu ditambahkan *rule* pemotongannya saja, sementara data dari Word Bank tetap dipakai tanpa perubahan.

## 7. Model Gamifikasi (Kids-Friendly)
Sistem *reward* dan gamifikasi disederhanakan agar mudah dipahami oleh anak usia TK, menghindari metrik yang kompleks.
- **Sistem Penilaian (Scoring & Stars)**:
  - **Skor**: Menggunakan skala puluhan, hanya dari **10 hingga 100** (misal: 10, 20, ..., 100).
  - **Bintang**: Menggunakan skala **1 hingga 5 Bintang**.
- **EXP & Leveling**:
  - Skor yang didapat akan dikonversi menjadi EXP (Experience Points) untuk menaikkan Level Anak. Evaluasi tetap sederhana di mata anak (mereka hanya melihat bar EXP terisi dan animasi naik level).

## 8. Parental Control & Dashboard (Pusat Kendali Orang Tua)
Sebagai penyeimbang dari UI anak yang sangat *playful*, aplikasi menyediakan portal khusus orang tua yang dilindungi oleh **PIN Gate**. Konsep ini mengatur bahwa semua manajemen eksternal dan perubahan profil diputuskan oleh orang tua.
- **Akses & Keamanan**: Wajib memasukkan PIN sebelum masuk ke menu Parental Control.
- **Kustomisasi UI/UX (Text Control)**:
  - Pengaturan visual materi/soal: *Scaling Size* (besar/kecil huruf), *Toggle Case* (Huruf Besar / Huruf Kecil semua), merubah jenis font (*Font Family* khusus disleksia atau *comic style*).
  - *Audio Control*: Mematikan/menyalakan fitur TTS (Text-to-Speech) atau *background music*.
- **Kendali Sosial (Match & Teman)**:
  - Anak tidak bisa sembarangan mencari teman baru. Menambah pertemanan (via kode unik/QR) dan menyetujui *Match* kuis multiplayer (Versus) *harus* melalui persetujuan orang tua di panel ini.
- **Analitik & Laporan (Statistik Anak)**:
  - Melihat riwayat aktivitas belajar, akurasi jawaban, *heatmap* waktu belajar, dan deteksi materi mana yang paling sering anak lakukan kesalahan (agar orang tua tahu di mana titik kelemahan anak).
- **Pembatasan Layar & Kurikulum (Fitur Tambahan Base System)**:
  - *Screen Time Limit*: Orang tua dapat menyetel batas waktu main (misal 30 menit). Saat habis, aplikasi akan mengunci secara halus ("Waktunya istirahat / Tidur").
  - *Module Override*: Mengunci/membuka batas materi. Orang tua bisa memaksa anak untuk mengulang materi "Abjad" jika dirasa belum lancar, sebelum bisa lanjut ke modul "Suku Kata".
