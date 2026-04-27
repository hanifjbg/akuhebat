# AKU HEBAT 🚀
**PWA Edukasi Cerdas & Interaktif untuk Anak TK**

Aplikasi edukasi anak usia taman kanak-kanak berbasis *Progressive Web App* (PWA). Dibangun bertahap dari sebuah **UX-Lab** menggunakan desain **Claymorphism UI** (ramah anak, 3D soft, colorful) yang dipadukan dengan arsitektur **Modular Monolith & Domain-Driven Design (DDD)**.

---

## ✨ Fitur Utama (Base System)

1. **UX-Lab (UI-First Development)**
   Semua komponen UI (Atom, Molecule, Organism) dan layar direpresentasikan secara terisolasi dengan berbagai *state* (Idle, Loading, Error, Empty) sebelum dihubungkan dengan data asli.
   
2. **Word Bank & Dynamic Quiz Engine**
   Sistem cerdas di mana soal kuis dirakit secara dinamis (*on-the-fly*) oleh *Engine* berdasarkan data kata terpusat (Word Bank) dan disesuaikan dengan tingkat kesulitan anak (Level 1 - 3). Mencegah penulisan soal kering secara manual di database.

3. **Gamifikasi Ramah Anak**
   - Skala skor ringkas: **10 - 100**.
   - Sistem *reward*: **1 hingga 5 Bintang**.
   - *EXP & Leveling*: Semakin sering bermain, bar progres terisi dan level naik secara menyenangkan.

4. **Parental Control (Pusat Kendali Orang Tua)**
   - Wajib memasukkan PIN (*PIN-gated*).
   - Pengaturan UI/Teks (Scaling ukuran teks, Upercase/Lowercase toggle, Disleksia Font support).
   - *Screen Time Limit* & Penguncian Modul Belajar.
   - Analitik & *Heatmap* progres belajar anak.

5. **Audio / TTS Engine**
   Adapter Singleton *Text-to-Speech* dengan mode pelafalan spesifik (Suku kata lelet, kata normal, kalimat).

---

## 🏗 Arsitektur & Teknologi

- **Frontend Framework**: React 19 + Vite + TypeScript.
- **Styling**: Tailwind CSS + Class Variance Authority (CVA) + clsx + tailwind-merge.
- **Animasi & Interaksi**: Framer Motion, Lucide React Icons.
- **State Management**: Zustand (dengan *persistent middleware*).
- **Arsitektur Utama**: Modular Monolith, Domain-Driven Design (DDD), Separation of Concerns (SoC). Komunikasi murni via sistem **Event Bus**.

### Struktur Folder
```text
/src
├── app/                  # Konfigurasi router
├── core/                 # Jantung Aplikasi: Event Dispatcher, Audio Adapter, Stores
├── modules/              # Bisnis Logik (Gamification, Quiz Engine, Dashboard)
├── shared/               # Utilities, Konstanta global
├── ui/                   # UI Kit Reusable (Atoms, Molecules, Organisms) -> Dumb Components
└── pages/                # Representasi layar (UX Lab, Main, Admin)
```

---

## 🚀 Cara Menjalankan (Development)

1. **Clone repositori ini:**
   ```bash
   git clone <repo-url>
   cd aku-hebat
   ```

2. **Instal seluruh dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

4. **Buka di Browser:** (Akan berjalan di `localhost` atau port `3000` via Host)
   Akses navigasi Dev Tools (*Floating Bug Icon*) di pojok kanan bawah untuk masuk ke ruang simulasi **UX-Lab**.

---

*Dibangun penuh kehati-hatian agar kode tetap bersih (bebas spaghetti code) dengan mentalitas skalabilitas tingkat produksi (Production-Ready).*
