# Milestone & Task Tracker: AKU HEBAT (PWA Edukasi Anak TK)

Dokumen ini melacak seluruh progres pengembangan aplikasi, menggabungkan instruksi utama UX-Lab dengan fitur spesifik sistem yang telah didiskusikan (Dynamic Engine, Word Bank, Parental Control).

## Stage 0: Inisialisasi
- [x] Product Manager: Analisis Kebutuhan & Persetujuan Fitur.
- [x] System Architect: Penentuan Stack (React 19, Vite, Tailwind, Zustand, dll).

## Stage 1: Rencana & Desain (Sedang Berjalan - Selesai)
- [x] UI/UX Designer: Konsep UI-First, Claymorphism, Navigasi.
- [x] Data Architect: Desain Arsitektur Dasar (Modular Monolith, DDD).
- [x] Blueprint: Sistem Word Bank, Adaptive Quiz Engine.
- [x] Blueprint: Model Gamifikasi (Scoring 10-100, Stars 1-5, EXP).
- [x] Blueprint: Parental Control (PIN, Text Control, Fitur Pembatasan).

## Stage 2: Fondasi (Target Selanjutnya)
- [x] DevOps: Scaffold Proyek Vite + React & Install semua Dependency (Selesai di awal sistem).
- [x] Routing & Pages: Setup React Router. Pembuatan dummy page `/main` dan `/admin` (Under Construction).
- [ ] Core Engine: Setup Event Bus (Event Dispatcher).
- [ ] Core Engine: Setup Audio / Native TTS Adapter Singleton (Fallback-ready).
- [ ] Core Engine: Dev Navigation Tool (Panel floating khusus di mode development).
- [ ] State Management: Inisialisasi Zustand (Parent/Auth, Kids Session, Admin, UX-Lab Simulator).

## Stage 3: Pembangunan Paralel (Fokus Utama UI/UX-Lab) *TIDAK DIHAPUS*
Setiap komponen dan halaman akan dibangun dengan status dummy/mock data di `/ux-lab` dengan 4 State Simulator (Normal, Loading, Empty, Error).

### 3.1 UX-Lab - Atoms (15 Komponen)
- [ ] Button, Input, Label, Icon
- [ ] Badge, Avatar, Spinner, Skeleton
- [ ] Divider, ProgressBar, Checkbox
- [ ] Radio, Switch, Slider, Tooltip

### 3.2 UX-Lab - Molecules (16 Komponen)
- [ ] SearchBar, FormField, CardHeader, NavItem
- [ ] QuizOption, Toast, AlertDialog, DropdownMenu
- [ ] Select, Tabs, Sheet, AvatarGroup
- [ ] Timer, WordCard, StarRating

### 3.3 UX-Lab - Organisms (18 Komponen)
- [ ] TopBar, BottomBar, LevelMap, QuizCard
- [ ] QuizReport (Skor 10-100, Bintang 1-5)
- [ ] ProfileCard, FriendCard, LeaderboardTable
- [ ] MemoryBoard, BalloonField, WordBuilder, ColoringCanvas
- [ ] PuzzleBoard, VersusPanel, TracingCanvas
- [ ] StoryBook, KaraokeScreen, DanceScreen

### 3.4 UX-Lab - Pengembangan Halaman (± 40 Halaman)
- [ ] **Auth & Anak**: Parental Gate (PIN), Login, Pilih Anak, Tambah Anak, Profil.
- [ ] **Belajar Anak**: Peta Level, Layar Kuis, Hasil Kuis, Hadiah/Naik Level, Koleksi Badge, Misi Harian.
- [ ] **Sosial/Match**: Daftar Teman, Tambah Teman (via Ortu), Profil Teman, Undangan Tantangan, Terima Tantangan.
- [ ] **Match/Versus**: Lobby, Arena Versus, Hasil Versus, Papan Peringkat.
- [ ] **Mini Games**: Penyusun Kata (Suku Kata), Memori Match, Balon Pecah, Menulis Huruf, Kuis Suara, dll.
- [ ] **Aktivitas Fullscreen**: Waktu Cerita, Karaoke, Dance, Baca Nyaring.
- [ ] **Admin / Parental Control Panel**: Login, Dashboard Statistik (Heatmap), Kustomisasi UI/Teks, Screen Time Limit, Module Override.
- [ ] **Umum**: 404, Under Construction, Error Boundary, Showcase Komponen.

## Stage 4: Integrasi & Backend (Logika Bisnis)
- [ ] Backend: Firebase Auth, Firestore Config, Skema Word Bank.
- [ ] Modul Word Bank: Sistem Generator untuk memotong kata berdasarkan level secara dinamis.
- [ ] Integrator: Memindahkan komponen dari `/ux-lab` ke `/main` dan menghubungkannya dengan State & Backend.
- [ ] Gamification Engine: Kalkulasi Skor & Bintang otomatis, Level UP, Trigger Reward.
- [ ] Parent Control Implementation: Lock mekanisme di semua layer aplikasi jika PIN belum valid.
- [ ] QA & Testing: Integrasi Event Bus dengan UI dan pengujian End-to-End.

## Stage 5: Deployment
- [ ] Pembersihan Logging dan Dev Tools.
- [ ] Visual QA Checklist Terakhir.
- [ ] Final Build & Deploy.
