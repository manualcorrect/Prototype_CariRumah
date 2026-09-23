# Roadmap Fase — CariRumah Banten

## MVP (Fase 1)

**Modul:**
- Beranda (rail Rumah Subsidi + Takeover, carousel Agen)
- Rumah Subsidi: katalog, filter wilayah (kecamatan), detail proyek
- Takeover KPR: katalog (hanya status `complete`), filter wilayah, detail listing
- Form pengisian Takeover oleh Member (4 section + skip per section)
- Dashboard Member (status listing, checklist legal)
- Dashboard Admin (moderasi, verifikasi dokumen, override status, manajemen agen, audit log)
- Form Tambah Proyek & Cluster oleh Developer
- RenovRumah: 1 kategori (Interior Minimalis) penuh + 5 kategori lain dengan pola sama (konten disusul menyusul desain)
- Paket Basic/Premium (harga tetap, bisa dikustomisasi ringan) — **tanpa** kalkulator RAB interaktif penuh
- Login: Google OAuth + manual (Member), Google OAuth only (Developer), nomor kontak wajib
- Observability: error logging, trace alur kritis, metric dasar (self-hosted SigNoz/Uptrace)
- Semua CTA konversi → WhatsApp (tidak ada booking online)

**Tech stack:** Next.js (TypeScript) + PostgreSQL + Prisma + Auth.js + OpenTelemetry, self-hosted Docker di VPS.

---

## Fase 2 (Setelah Validasi / Traksi Positif)

- **Kalkulator RAB Mandiri (custom item selection)** — konsumen pilih item sendiri, sistem hitung estimasi biaya real-time, terhubung ke Paket Custom
- **Menu Custom Package** penuh dengan opsi "Item Lainnya" input manual
- **Login & profil Agen** — agen jadi entitas login sendiri, bukan sekadar data statis carousel
- Galeri RenovRumah versi final (setelah desain visual selesai dibuat pemilik produk)
- Evaluasi migrasi observability dari self-hosted ke managed service jika beban operasional self-hosted mulai terasa berat
- Evaluasi kebutuhan CI/testing otomatis sebagai lapisan pencegahan bug tambahan

---

## Dihapus / Tidak Direncanakan Sama Sekali (Bukan Fase 2, Benar-Benar Keluar Scope)

Sesuai keputusan filosofi produk (human-touch, non-transaksional):
- Booking/pemesanan otomatis online
- Checkout atau pembayaran online
- KPR simulator umum berbentuk tool self-service kompleks (3 tab: Pembelian/Kemampuan/Refinancing)
- Direktori & profil publik Agen (digantikan carousel statis permanen)
- Cek Harga Properti & Peta Harga Interaktif
- Modul Disewa, Aset Bank sebagai kategori transaksi mandiri, katalog Properti Baru non-subsidi
