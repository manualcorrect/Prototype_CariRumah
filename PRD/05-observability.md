# Observability — CariRumah Banten

Tujuan: pencegahan bug sejak awal pengembangan (production monitoring), tanpa membutuhkan
basic coding dari pemilik produk untuk mengoperasikannya sehari-hari.

Cakupan disepakati: **log, metric, trace** (tiga pilar observability), diimplementasikan sejak
MVP, self-hosted untuk fase prototipe.

---

## 1. Standar & Tooling

| Komponen | Pilihan | Alasan |
|---|---|---|
| Instrumentasi | **OpenTelemetry SDK (Node.js)** | Standar terbuka, satu SDK untuk log+metric+trace sekaligus, tidak vendor lock-in — kalau nanti pindah dari self-hosted ke layanan berbayar, tidak perlu ubah kode |
| Backend penyimpanan & dashboard | **SigNoz** (rekomendasi utama) atau **Uptrace** (alternatif) | Keduanya open-source, self-hosted via Docker, satu dashboard untuk ketiga pilar — tidak perlu menyusun 3 tool terpisah (mis. Prometheus+Loki+Tempo) yang lebih rumit dioperasikan tanpa tim DevOps |
| Deployment | Docker Compose di VPS yang sama dengan aplikasi (fase prototipe) | Sesuai rencana self-hosted awal sebelum langganan domain |

---

## 2. Prioritas Implementasi (ditentukan berdasarkan risiko produk)

Karena pemilik produk tidak punya basic coding, urutan berikut dipilih agar bug paling
berdampak terdeteksi lebih dulu, dengan usaha setup paling kecil dulu:

### Prioritas 1 — Error/Exception Logging
Menangkap setiap error yang terjadi (form gagal submit, upload foto gagal, API error) beserta
konteksnya (user mana, halaman mana, input apa). Ini yang paling langsung mencegah "member
komplain form gak jalan tapi kita gak tahu kenapa".

### Prioritas 2 — Trace pada Alur Kritis
Fokus ke alur yang paling menentukan hasil bisnis:
- Alur submit form Takeover (per section) — untuk tahu section mana yang paling sering gagal/di-skip
- Alur klik WhatsApp (event tracking dari `POST /api/events/whatsapp-click`) — ini metrik bisnis penting: berapa banyak konsumen benar-benar sampai ke titik kontak, bukan cuma bug prevention
- Alur login (Google & manual) — titik gagal umum pada aplikasi dengan OAuth

### Prioritas 3 — Metric Sistem
CPU/memori server, response time API, jumlah request per endpoint — untuk mendeteksi
kelambatan sebelum jadi keluhan pengguna, terutama saat traffic naik.

### Prioritas 4 — Audit Log Bisnis (terpisah dari observability teknis)
Sudah dicakup di `02-skema-database.md` (`audit_logs`) — bukan bagian dari OpenTelemetry, tapi
tabel database biasa karena butuh retensi permanen & query relasional (siapa mengubah status
listing X kapan), berbeda dari log observability yang sifatnya rolling/short-retention.

---

## 3. Dashboard yang Perlu Disiapkan untuk Pemilik Produk (Non-Teknis)

Karena pemilik produk tidak coding, dashboard harus disusun bahasa awam, contoh:
- **"Error Terbaru"** — daftar sederhana: waktu, halaman, ringkasan masalah (tanpa stack trace teknis di tampilan utama; detail teknis tetap ada untuk agent AI saat debugging)
- **"Klik WhatsApp per Hari"** — grafik sederhana, dipecah per modul (Rumah Subsidi / Takeover / RenovRumah) sebagai indikator efektivitas produk
- **"Waktu Respons Halaman"** — indikator hijau/kuning/merah, bukan angka milidetik mentah

Ini bisa dibangun sebagai custom view ringan di atas data SigNoz/Uptrace, atau halaman internal
terpisah yang query API observability — detail teknis diputuskan saat implementasi.

---

## 4. Alert (Notifikasi Dini)

Rekomendasi: hubungkan alert dari SigNoz/Uptrace ke **WhatsApp atau email pemilik produk**
(konsisten dengan filosofi produk yang human-touch — bahkan untuk urusan teknis) untuk kondisi:
- Error rate melonjak tiba-tiba (indikasi bug baru habis deploy)
- API/server down (uptime check)
- Endpoint kritis (submit takeover, login) gagal berulang dalam waktu singkat

---

## 5. Roadmap Observability

| Fase | Cakupan |
|---|---|
| MVP (sekarang) | Error logging + trace alur kritis (submit takeover, WA click, login) + metric dasar server, self-hosted SigNoz/Uptrace |
| Setelah traksi positif & langganan domain | Pertimbangkan managed service (mis. upgrade ke cloud SigNoz, atau Sentry untuk error tracking khusus) untuk mengurangi beban maintenance server observability sendiri |
| Opsional lanjutan | CI/testing otomatis (automated testing sebelum deploy) — di luar cakupan "production monitoring" yang disepakati sekarang, tapi direkomendasikan sebagai lapisan pencegahan bug tambahan di fase berikutnya |
