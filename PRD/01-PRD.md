# PRD — CariRumah Banten

Versi: 1.0 (menggantikan blueprint "TakeoverKu" & spesifikasi teknis "Marketplace Properti" sebelumnya)
Status: Draft untuk diserahkan ke AI coding agent (Antigravity)

---

## 1. Visi & Filosofi Produk

**CariRumah Banten bukan marketplace transaksional.** Ini adalah sarana untuk memperluas jaringan dan branding agensi properti dengan konsumen, dengan penekanan pada **partisipasi manusia (human-touch)**, bukan otomasi penuh.

Prinsip inti yang mengikat seluruh keputusan produk:

- **Tidak ada booking/pemesanan otomatis.** Setiap alur, betapapun jauh konsumen menjelajah (lihat listing, hitung estimasi RAB, dsb), akan berakhir di satu titik: **kontak WhatsApp** ke agen atau admin. Aplikasi ini adalah etalase & alat bantu keputusan, bukan sistem checkout.
- **Service adalah nilai jual utama**, bukan harga atau kelengkapan fitur digital. Alat kalkulasi (RAB, dsb.) dibuat untuk *mengantisipasi biaya*, bukan untuk menggantikan konsultasi dengan agen/admin.
- **Fokus niche, bukan platform generik.** Produk ini sengaja sempit: Rumah Subsidi (FLPP) baru, Takeover KPR (oper kredit), dan RenovRumah — semuanya di wilayah Banten. Ini bukan marketplace properti nasional serba-ada.

---

## 2. Cakupan Produk

### 2.1 Modul Utama (Navigasi)

1. **Rumah Subsidi** — katalog rumah subsidi FLPP baru dari developer mitra
2. **Takeover KPR** — listing rumah dengan KPR berjalan yang ingin dioper-kreditkan
3. **RenovRumah** — layanan renovasi rumah subsidi (interior, carport, kanopi, dapur, septictank, dll.)
4. **Tentang Kami** — profil agensi, statis

### 2.2 Cakupan Geografis

Fokus wilayah Banten dengan granularitas sampai level kecamatan:
- Kota Serang
- Kabupaten Serang (Kramatwatu, Ciruas, Kibin, Kragilan, Baros, Pontang, dan kecamatan lain)
- Kota Cilegon
- Area industri & jalur Tol Serang–Cilegon sebagai penanda lokasi strategis

### 2.3 Fitur yang Dihapus dari Rencana Awal (Disetujui)

Fitur berikut ada di blueprint/spesifikasi lama tapi **sengaja dihapus** karena tidak sejalan dengan filosofi human-touch/non-transaksional:

| Fitur lama | Alasan dihapus |
|---|---|
| Modul Disewa | Di luar fokus niche (subsidi + takeover) |
| Modul Aset Bank sebagai kategori transaksi mandiri | Di luar fokus niche |
| Katalog Properti Baru generik (non-subsidi) | Diganti fokus khusus FLPP |
| Direktori & profil publik Cari Agen | Diganti carousel statis (lihat 3.5) |
| Cek Harga Properti (tool mandiri) | Mendorong self-service, kontra filosofi kontak agen |
| Peta Harga Interaktif | Sama seperti di atas |
| Halaman KPR Simulasi umum (3 tab: Pembelian/Kemampuan/Refinancing) | Alat self-service kompleks yang berpotensi menggantikan kebutuhan konsultasi — bertentangan dengan prinsip "harus kontak agensi". Widget kalkulasi kecil (mis. amortisasi) yang masih tersisa di beberapa footer desain lama dianggap sisa iterasi desain dan **harus dibersihkan**, bukan dipertahankan sebagai modul. |
| Fitur booking/pemesanan online otomatis | Bertentangan langsung dengan filosofi produk — semua transaksi lanjutan wajib via WhatsApp |

### 2.4 Fitur Baru (Dikonfirmasi, Tidak Ada di Rencana Awal)

- **RenovRumah** sebagai modul penuh (layanan, paket, RAB, galeri, testimoni)
- **Alur legal Takeover KPR** dengan dokumen spesifik (SP3K, rekening koran, akta PPAT, notaris rekanan)
- **Sistem skip-per-section** pada form pengisian takeover, dengan hak override admin
- **Login Google OAuth** untuk Member (dengan nomor kontak wajib)
- **Carousel Agen** statis di homepage/halaman terkait

---

## 3. Aktor & Peran

| Aktor | Definisi | Perlu Login? | Kewenangan |
|---|---|---|---|
| **Konsumen** | Pengunjung umum yang mencari rumah subsidi/takeover/jasa renovasi | Tidak | Melihat semua konten publik, klik kontak WhatsApp ke agen/admin |
| **Member** | Pemilik rumah dengan KPR berjalan yang ingin di-takeover (oper kredit) | Ya — wajib | Mengisi & mengelola listing takeover miliknya sendiri |
| **Developer** | Mitra pengembang perumahan subsidi | Ya — Google OAuth only | Hanya mengakses form "Tambah Proyek & Cluster Baru" dan listing rumah subsidi miliknya |
| **Admin** | Staf internal agensi | Ya — akun ditautkan manual (lihat catatan) | Moderasi semua listing, verifikasi dokumen, override status listing, integrasi API Bank/PPAT, audit log |
| **Agen** | Perwakilan agensi/mitra bank yang tampil di carousel | Tidak (MVP ini) | Hanya ditampilkan sebagai info statis (foto, nama, link WhatsApp) yang diinput admin |

**Catatan penting:**
- **Admin dan Developer untuk saat ini dianggap satu status/orang yang sama** secara teknis akses (akun akan ditautkan manual saat tahap pengembangan oleh pemilik produk, bukan proses self-registration). Namun secara fungsional, kewenangan admin (moderasi, override status, audit) tetap harus dipisahkan secara logis di sistem (role-based), supaya siap dipisah jika suatu saat developer eksternal butuh akun sendiri.
- **Login Agen ditunda ke fase berikutnya (deferred).** Untuk MVP, agen tidak py punya akun; link/nomor WhatsApp masing-masing agen diinput manual oleh admin ke carousel.
- Link "Pendaftaran Agen Lokal" yang muncul di desain mobile **disembunyikan/dinonaktifkan di MVP**, konsisten dengan keputusan menunda login agen.

---

## 4. Alur Kunci (User Flow)

### 4.1 Konsumen (tanpa login)

1. Browse Rumah Subsidi / Takeover KPR / RenovRumah
2. Filter berdasarkan wilayah (kecamatan) & kategori
3. Lihat detail listing/layanan
4. Klik tombol WhatsApp → diarahkan ke nomor agen/admin terkait listing tersebut (deep link `wa.me` dengan pesan pra-isi berisi konteks listing)

Tidak ada checkout, tidak ada form pemesanan — WhatsApp adalah satu-satunya CTA konversi.

### 4.2 Member — Pendaftaran & Pengisian Listing Takeover

1. Member klik "Pasang Listing Takeover Baru"
2. Sistem meminta **nomor kontak (WhatsApp) wajib diisi terlebih dahulu**, sebelum lanjut ke metode pendaftaran apa pun.
   - Jika nomor kontak belum diisi → **tidak boleh lanjut** ke integrasi Google maupun form email/password manual.
3. Setelah nomor kontak terisi, Member memilih metode masuk:
   - **Masuk dengan Google** (OAuth), atau
   - **Daftar manual** (nama, email, nomor HP, password) — modal login/daftar manual **tetap dipertahankan** sebagai alternatif, tidak digantikan total oleh Google.
4. Member mengisi form listing takeover dalam 4 bagian:
   - **Bagian A** — Identitas & Lokasi Unit Rumah
   - **Bagian B** — Skema Finansial & Sisa Hutang KPR
   - **Bagian C** — Dokumentasi Foto & Struk KPR
   - **Bagian D** — Kesiapan Dokumen Notaris PPAT
5. **Setiap bagian (section) punya tombol "Lewati".** Member boleh melewati satu atau lebih bagian jika belum siap/tidak paham.
6. Setelah submit (baik lengkap maupun ada bagian yang dilewati), status listing otomatis menjadi **`pending`**.
7. Admin meninjau listing `pending`:
   - Jika ada bagian yang kosong/dilewati, **admin menghubungi Member via WhatsApp** untuk membimbing pengisian data yang kurang.
   - **Hanya admin** yang punya hak mengubah status jadi **`complete`** — termasuk kondisi khusus di mana dokumen fisik lengkap tapi tidak bisa diunggah karena kendala teknis. Admin dapat menandai `complete` secara manual tanpa semua field terisi digital.

### 4.3 Developer — Tambah Proyek & Cluster

1. Developer login via **Google OAuth** (satu-satunya metode untuk role ini)
2. Mengisi form "Tambah Proyek & Cluster Baru" (4 section: Identitas Proyek, Spesifikasi Tipe Rumah FLPP, Media/Brosur/Siteplan, Kuota Bank Penyalur & Notaris)
3. Proyek yang disubmit masuk ke antrean moderasi Admin sebelum tayang publik

### 4.4 Admin

1. Login (akun ditautkan manual, detail teknis ditentukan saat implementasi)
2. Moderasi listing (Rumah Subsidi, Takeover, Proyek Developer)
3. Kelola antrean verifikasi dokumen takeover
4. Override status listing takeover (`pending` → `complete`)
5. Kelola integrasi API Bank & PPAT (data mitra)
6. Kelola carousel Agen (tambah/edit nama, foto, nomor WhatsApp)
7. Melihat audit log seluruh aktivitas

---

## 5. RenovRumah — Detail Modul

### 5.1 Kategori Layanan

6 kategori layanan renovasi rumah subsidi. **Baru 1 kategori yang sudah didesain penuh (Interior Minimalis)** — 5 kategori lain (CarPort & Keramik, Kanopi Modern, Dapur Belakang & Void, Septictank & Resapan, dan 1 kategori tambahan yang akan ditentukan) **mengikuti pola struktur & tampilan yang sama** dengan kategori Interior:
- Hero kategori
- Galeri before/after
- Rincian item & RAB material
- Pilihan paket
- Spesifikasi material (standar SNI)
- 4 tahap proses (Survey & Konsultasi Gratis → Desain 3D & RAB Fix → Pengerjaan Sesuai Termin → Serah Terima & Garansi)
- Testimoni

### 5.2 Sistem Paket

Tiga jalur paket per kategori layanan:

1. **Paket Minimalis (Basic)** — item dasar, harga tetap
2. **Paket Premium (All-in)** — item lengkap, harga tetap
3. **Paket Custom** — jalur terpisah, berisi **gabungan seluruh item dari Paket Minimalis dan Premium**; konsumen memilih sendiri item mana saja yang ingin dimasukkan. Tersedia juga opsi **"Item Lainnya"** — input bebas nama item + nominal harga oleh konsumen sendiri, untuk kebutuhan yang tidak tercakup di daftar standar.

Paket Minimalis dan Premium juga **bisa dikustomisasi** (tambah/kurang item dari basis paket tersebut) — bukan harga mati yang kaku.

### 5.3 Kalkulator RAB Mandiri — **DITUNDA (Fase 2)**

Konsumen memilih item pekerjaan yang diinginkan, sistem menghitung estimasi total biaya secara otomatis (real-time, client-side atau via API kalkulasi sederhana). Hasil akhir tetap berupa **preview estimasi + CTA WhatsApp** — bukan checkout atau pemesanan online, konsisten dengan filosofi produk.

> Fitur ini didokumentasikan detail sekarang (lihat `skema-database.md` bagian `rab_custom_items`) untuk referensi pengembangan fase berikutnya, **tidak masuk MVP**.

### 5.4 Galeri — Konsep Diusulkan

Belum ada desain dari pemilik produk. Usulan konsep:
- Grid galeri dengan filter kategori (Interior, CarPort, Kanopi, dst.)
- Setiap item galeri: foto before/after (slider atau side-by-side), nama proyek, lokasi (kecamatan), kategori layanan terkait
- Klik item galeri → detail proyek (mirip halaman `carirumah_detail_interior_model_sketchup_3d_kalkulasi_rab` yang sudah ada) dengan CTA WhatsApp untuk "konsultasikan proyek serupa"

---

## 6. Sistem Login

| Role | Metode | Field Wajib |
|---|---|---|
| Konsumen | Tidak perlu login | — |
| Member | Google OAuth **atau** email/password manual (modal tetap ada) | **Nomor kontak WhatsApp wajib diisi lebih dulu**, sebelum proses pendaftaran (baik Google maupun manual) bisa dilanjutkan |
| Developer | Google OAuth saja | Nomor kontak (mengikuti pola sama) |
| Admin | Akun ditautkan manual oleh pemilik produk saat implementasi | — |
| Agen | Tidak ada login (deferred ke fase berikutnya) | — |

---

## 7. Desain Responsif

Satu produk responsif (bukan dua alur produk terpisah). Desain desktop dan mobile yang sudah dibuat harus **disatukan strukturnya**:
- Fitur yang saat ini hanya ada di desain mobile tapi belum ada di desktop (misalnya: akses ke Kalkulator RAB, informasi Cek BI Checking/SLIK) **harus ditambahkan ke desain desktop** supaya paritas fitur terjaga.
- Link "Pendaftaran Agen Lokal" di mobile **dinonaktifkan/disembunyikan** mengikuti keputusan deferred login agen (lihat Bagian 3).

---

## 8. Tech Stack (Rekomendasi Disetujui)

| Layer | Pilihan | Alasan Singkat |
|---|---|---|
| Frontend + Backend | **Next.js (TypeScript)** | Satu bahasa full-stack, ekosistem matang, paling optimal untuk AI coding agent |
| Database | **PostgreSQL** | Relasional, cocok untuk data terstruktur (listing, legal docs, user) |
| ORM | **Prisma** | Type-safe, matang di ekosistem Next.js/TypeScript |
| Auth | **Auth.js (NextAuth)** dengan Google OAuth provider + credentials provider (email/password) | Mendukung dua metode login Member sesuai kebutuhan |
| Observability | **OpenTelemetry SDK (Node.js)** → **SigNoz** atau **Uptrace** (self-hosted, all-in-one log+metric+trace) | Lihat `observability.md` |
| Deployment (prototipe) | **Docker di VPS self-hosted** | Sesuai rencana uji prototipe sebelum langganan domain |
| Editor/Agent development | **Google Antigravity** | Sudah ditentukan pemilik produk; kompatibel dengan stack apa pun |

---

## 9. Dokumen Terkait

- `02-skema-database.md` — Skema database detail
- `03-api-contract.md` — Kontrak API REST
- `04-breakdown-ui-halaman.md` — Breakdown komponen UI per halaman
- `05-observability.md` — Rencana observability (log, metric, trace)
- `06-roadmap-fase.md` — Roadmap MVP vs Fase 2
