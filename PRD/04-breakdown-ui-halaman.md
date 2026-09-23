# Breakdown Komponen UI per Halaman — CariRumah Banten

Mengacu ke desain Stitch (`stitch_cyan_white_ui_theme`) yang sudah ada. Untuk bagian yang belum
didesain (5 kategori RenovRumah, galeri), spesifikasi berikut jadi acuan sementara sampai desain
final dibuat.

Referensi desain sumber dituliskan di setiap bagian sebagai `[sumber: nama_folder]`.

---

## 1. Beranda — `[sumber: carirumah_beranda_rumah_subsidi_fitur_takeover]`

| Bagian | Spesifikasi |
|---|---|
| Hero | Headline "Wujudkan Impian Punya [Rumah]", CTA ganda ke Rumah Subsidi & Takeover KPR |
| Rail 1 | "Rekomendasi Rumah Baru Subsidi Pilihan Minggu Ini" — kartu proyek (cluster) |
| Rail 2 | "Listing Takeover KPR Pilihan Minggu Ini" — kartu listing takeover (hanya status `complete`) |
| CTA section | "Punya KPR Berjalan yang Ingin Di-Takeover?" → arahkan ke alur pendaftaran member |
| Carousel Agen | Ditambahkan di bawah navbar/hero — foto, nama, label peran, tombol WA langsung per agen |

**Perubahan dari desain lama:** tidak ada search bar universal generik — homepage terstruktur sebagai dua rail konten spesifik (subsidi & takeover), bukan hero pencarian bebas.

---

## 2. Rumah Subsidi — Hasil Filter Wilayah — `[sumber: carirumah_hasil_filter_wilayah_kramatwatu_kab._serang]`

| Bagian | Spesifikasi |
|---|---|
| Breadcrumb wilayah | Banten → Kabupaten Serang → Kramatwatu (klik level mana pun untuk broaden filter) |
| Sub-filter kecamatan sekitar | Chip kecamatan tetangga (Ciruas, Kibin, Kragilan, Baros, Pontang) untuk eksplorasi cepat |
| Kartu proyek | Nama cluster, badge, cicilan flat estimasi (mis. "Cicilan Flat Rp 1.080.000/bln"), CTA WhatsApp |
| Section "Keunggulan Lokasi" | Konten SEO + kepercayaan (akses tol, fasilitas sekitar) |
| Counter hasil | "Ada N Listing Takeover KPR di [Kecamatan]" — pola sama dipakai baik untuk Rumah Subsidi maupun Takeover KPR, tab berbeda pada halaman yang sama atau halaman terpisah sesuai kebutuhan navigasi |

---

## 3. Takeover KPR — Pengisian Listing (Member) — `[sumber: carirumah_tambah_listing_takeover_baru]`

4 section, tiap section punya progress indicator + tombol **"Lewati Bagian Ini"** di footer form (selain tombol "Lanjutkan"):

1. **Bagian A** — Identitas & Lokasi Unit Rumah (tipe program, kota/kabupaten, kecamatan, alamat, blok)
2. **Bagian B** — Skema Finansial & Sisa Hutang KPR (bank asal, sisa tenor, estimasi sisa pokok)
3. **Bagian C** — Dokumentasi Foto & Struk KPR (upload multi-foto + struk cicilan)
4. **Bagian D** — Kesiapan Dokumen Notaris PPAT (pilih notaris rekanan, checklist SP3K/rekening koran/dsb.)

Setelah submit (baik lengkap semua atau ada yang dilewati) → tampilkan pesan konfirmasi: *"Listing Anda sedang ditinjau. Tim kami akan menghubungi Anda via WhatsApp untuk melengkapi data jika diperlukan."*

---

## 4. Dashboard Member — `[sumber: carirumah_dashboard_member_takeover]`

| Bagian | Spesifikasi |
|---|---|
| Checklist status | Siapkan SP3K & Rekening Koran / Verifikasi Identitas / Tanda Tangan Akta PPAT / Pendampingan Notaris — ditampilkan sebagai progress tracker per listing, dengan indikator section mana yang masih di-skip |
| Tips konversi | "Ganti DP Realistis Menarik Pembeli 2x Lebih Cepat" — konten edukatif |
| CTA | "Pasang Listing Takeover Baru" |

**Tambahan yang perlu dimasukkan (belum ada di desain lama):** badge status listing (`Pending` / `Complete`, dengan warna beda), dan catatan jika admin melakukan override manual (transparansi ke member kenapa statusnya berubah).

---

## 5. Dashboard Admin — `[sumber: carirumah_dashboard_admin_developer]`

| Bagian | Spesifikasi |
|---|---|
| Moderasi & Manajemen Semua Listing | Tabel semua listing (proyek + takeover) dengan filter status |
| Antrean Verifikasi Dokumen | Daftar listing `pending` dengan section yang di-skip ditandai jelas — ini titik kerja utama admin untuk follow-up WhatsApp |
| Tombol Override Status | Hanya muncul untuk admin, dengan modal konfirmasi + field wajib "Catatan Override" |
| Integrasi API Bank & PPAT | Manajemen data mitra bank/notaris |
| Manajemen Carousel Agen | CRUD agen (foto, nama, nomor WA, label) |
| Aktivitas Audit Log | Log semua aksi admin/developer, filterable by actor & entity |

---

## 6. Tambah Proyek & Cluster Baru (Developer) — `[sumber: carirumah_tambah_proyek_cluster_baru]`

4 section (Identitas Proyek, Spesifikasi Tipe FLPP, Media & Siteplan, Kuota Bank & Notaris) — **hanya bisa diakses role developer setelah login Google.** Tidak ada opsi skip di form ini (berbeda dari form takeover Member) karena data proyek developer bersifat komersial, bukan data pribadi sensitif yang butuh kelonggaran pengisian.

---

## 7. Login & Registrasi — `[sumber: carirumah_modal_masuk_login_terpisah, carirumah_modal_daftar_registrasi_terpisah]`

Modal tetap dua alur terpisah (Masuk / Daftar), **ditambah** tombol "Lanjutkan dengan Google" di kedua modal. Alur baru:

1. Field **"Nomor WhatsApp Aktif"** muncul di paling atas modal (baik Masuk maupun Daftar), wajib diisi dan tervalidasi format sebelum tombol Google/submit manual aktif (disabled state sebelum terisi).
2. Setelah nomor terisi → tombol "Lanjutkan dengan Google" dan form manual sama-sama aktif untuk dipilih.

---

## 8. RenovRumah — Kategori Layanan

### 8.1 Interior Minimalis (sudah didesain) — `[sumber: carirumah_layanan_renovrumah_spesialis_rumah_subsidi, carirumah_detail_interior_model_sketchup_3d_kalkulasi_rab]`

Struktur lengkap: hero kategori → galeri before/after → rincian item & RAB material → pilihan paket (Basic/Premium) → spesifikasi material SNI → 4 tahap proses → testimoni → CTA WhatsApp.

### 8.2 5 Kategori Lain (belum didesain) — **mengikuti pola 8.1**

CarPort & Keramik, Kanopi Modern, Dapur Belakang & Void, Septictank & Resapan, dan satu kategori tambahan — masing-masing memakai kerangka komponen yang identik dengan Interior Minimalis, hanya konten (item, foto, harga) yang berbeda. Rekomendasi: bangun sebagai **satu template komponen reusable** (`RenovationCategoryPage`) yang menerima `category_slug` sebagai parameter, bukan 6 halaman terpisah yang di-hardcode — supaya penambahan kategori baru di masa depan tidak perlu desain ulang dari nol.

### 8.3 Halaman Custom Package (baru, belum ada desain)

Usulan struktur:
- Daftar seluruh item dari Paket Basic + Premium kategori terkait, dalam bentuk checklist dengan harga per item
- Section terpisah "Tambah Item Lainnya" — input nama item + input nominal manual, bisa ditambah berkali-kali (dynamic row)
- Total estimasi berjalan real-time di bagian bawah/sticky
- CTA akhir: "Konsultasikan via WhatsApp" (bukan checkout) — pesan pra-isi berisi ringkasan item yang dipilih
- **Catatan:** Sesuai roadmap, halaman ini termasuk bagian dari Kalkulator RAB Mandiri yang **ditunda ke Fase 2** — dibuat wireframe/spek dulu, implementasi menyusul.

### 8.4 Galeri (belum ada desain — usulan Claude)

Lihat `01-PRD.md` Bagian 5.4 untuk konsep yang diusulkan (grid + filter kategori + detail proyek).

---

## 9. Paritas Desktop ↔ Mobile

Berdasarkan audit desain, fitur berikut ada di desain mobile tapi **belum ada di desktop** — perlu ditambahkan ke desktop supaya satu produk responsif konsisten:

| Fitur (dari mobile) | Tindakan untuk Desktop |
|---|---|
| Akses ke Kalkulator RAB (dapur/renovasi) | Tambahkan entry point yang sama di menu RenovRumah desktop (mengikuti status Fase 2 — tunda implementasi, tapi siapkan tempat di navigasi) |
| Informasi "Cek BI Checking / SLIK" | Tambahkan sebagai konten edukatif di halaman Takeover KPR desktop (artikel/FAQ singkat), relevan untuk Member yang belum familiar |
| "Pendaftaran Agen Lokal" | **Tidak ditambahkan** — dinonaktifkan di kedua platform, sesuai keputusan deferred login agen (lihat `01-PRD.md` Bagian 3) |
