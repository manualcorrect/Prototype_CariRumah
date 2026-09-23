# Skema Database — CariRumah Banten

Menggantikan Bagian 2 "Skema Basis Data" pada spesifikasi teknis lama. Ditulis untuk PostgreSQL + Prisma.

---

## 1. Lokasi (disederhanakan, fokus Banten)

```sql
CREATE TABLE locations (
  id BIGINT PRIMARY KEY,
  parent_id BIGINT REFERENCES locations(id) NULL,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  level ENUM('kabupaten_kota','kecamatan') NOT NULL, -- disederhanakan dari 4 level ke 2, fokus Banten
  lat DECIMAL(9,6),
  lng DECIMAL(9,6),
  is_featured BOOLEAN DEFAULT FALSE, -- tampil di homepage/filter cepat
  UNIQUE(parent_id, slug)
);
CREATE INDEX idx_locations_parent ON locations(parent_id);
```

> Catatan: level `provinsi`/`negara` dihapus karena cakupan produk memang dikunci ke Banten. Kalau ekspansi wilayah terjadi nanti, tabel ini gampang ditambah level lagi.

---

## 2. Users & Roles

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  role ENUM('member','developer','admin') NOT NULL,
  name VARCHAR(150),
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(20) NOT NULL, -- WAJIB, divalidasi sebelum akun aktif
  password_hash TEXT NULL, -- NULL jika login via Google
  google_id VARCHAR(100) UNIQUE NULL,
  auth_provider ENUM('google','manual') NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Catatan penting implementasi:**
- Kolom `phone` **NOT NULL** dan harus divalidasi terisi di langkah sebelum proses OAuth Google atau pembuatan akun manual selesai — di level aplikasi, alur pendaftaran menahan submit sampai `phone` terisi.
- Role `admin` dan `developer` untuk fase awal dianggap setara secara akun (akan ditautkan manual oleh pemilik produk), tapi kolom `role` tetap dipisah agar hak akses (lihat Bagian 5 — RBAC) bisa dibedakan secara logis kapan pun dibutuhkan.
- Role `agen` **tidak ada di tabel `users`** pada fase MVP — agen bukan entitas login, lihat tabel `agents` di bawah.

---

## 3. Agen (statis, dikelola admin)

```sql
CREATE TABLE agents (
  id BIGINT PRIMARY KEY,
  name VARCHAR(150),
  photo_url TEXT,
  whatsapp_number VARCHAR(20), -- diisi manual oleh admin, per agen
  role_label VARCHAR(80), -- ex: "Agen Lokal Serang", "Mitra Bank BTN"
  sort_order SMALLINT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP
);
```

> Tidak ada relasi login/session — murni data tampilan carousel yang di-CRUD oleh admin. Siap diperluas jadi entitas `users` dengan role `agen` di fase berikutnya saat login agen mulai dikembangkan.

---

## 4. Rumah Subsidi (Katalog Developer)

```sql
CREATE TABLE developers (
  id BIGINT PRIMARY KEY,
  user_id BIGINT REFERENCES users(id), -- developer login via Google
  company_name VARCHAR(150),
  slug VARCHAR(170) UNIQUE,
  logo_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);

CREATE TABLE projects (
  id BIGINT PRIMARY KEY,
  developer_id BIGINT REFERENCES developers(id),
  location_id BIGINT REFERENCES locations(id), -- kecamatan
  name VARCHAR(150),
  slug VARCHAR(170),
  address_detail TEXT,
  gps_lat DECIMAL(9,6),
  gps_lng DECIMAL(9,6),
  gps_verified BOOLEAN DEFAULT FALSE,
  total_kavling INT,
  nup_tahap_1 INT, -- Nomor Urut Pemesanan rilis tahap 1
  target_akad_massal DATE,
  status ENUM('pending_review','active','sold_out','closed') DEFAULT 'pending_review',
  gallery JSONB, -- foto, brosur, siteplan
  created_at TIMESTAMP
);

CREATE TABLE project_unit_types (
  id BIGINT PRIMARY KEY,
  project_id BIGINT REFERENCES projects(id),
  type_name VARCHAR(80), -- ex: "Tipe 30/72 Subsidi FLPP"
  price BIGINT,
  land_area_m2 DECIMAL(8,2),
  building_area_m2 DECIMAL(8,2),
  bedrooms SMALLINT
);

CREATE TABLE project_bank_partners (
  project_id BIGINT REFERENCES projects(id),
  bank_name VARCHAR(80),
  quota_flpp INT,
  PRIMARY KEY (project_id, bank_name)
);

CREATE TABLE project_notary_partners (
  project_id BIGINT REFERENCES projects(id),
  notary_name VARCHAR(120),
  notary_office_address TEXT,
  PRIMARY KEY (project_id, notary_name)
);
```

---

## 5. Takeover KPR (Listing Oper Kredit)

Ini modul dengan perubahan paling signifikan dari spesifikasi lama — bukan sekadar `properties` generik, tapi mengandung alur legal.

```sql
CREATE TABLE members (
  id BIGINT PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) UNIQUE, -- role = 'member'
  created_at TIMESTAMP
);

CREATE TABLE takeover_listings (
  id BIGINT PRIMARY KEY,
  member_id BIGINT REFERENCES members(id),
  location_id BIGINT REFERENCES locations(id), -- kecamatan

  -- Bagian A: Identitas & Lokasi Unit
  ownership_program_type VARCHAR(50), -- ex: FLPP, Komersil
  address_detail TEXT,
  block_unit VARCHAR(50),
  section_a_completed BOOLEAN DEFAULT FALSE,
  section_a_skipped BOOLEAN DEFAULT FALSE,

  -- Bagian B: Skema Finansial & Sisa Hutang KPR
  bank_asal_kpr VARCHAR(80),
  sisa_tenor_bulan INT,
  estimasi_sisa_pokok BIGINT,
  section_b_completed BOOLEAN DEFAULT FALSE,
  section_b_skipped BOOLEAN DEFAULT FALSE,

  -- Bagian C: Dokumentasi Foto & Struk KPR
  photo_media JSONB, -- array url foto rumah
  kpr_receipt_media JSONB, -- array url struk/bukti cicilan
  section_c_completed BOOLEAN DEFAULT FALSE,
  section_c_skipped BOOLEAN DEFAULT FALSE,

  -- Bagian D: Kesiapan Dokumen Notaris PPAT
  notary_partner_id BIGINT NULL, -- pilih dari daftar notaris rekanan
  sp3k_ready BOOLEAN DEFAULT FALSE,
  rekening_koran_ready BOOLEAN DEFAULT FALSE,
  identity_verified BOOLEAN DEFAULT FALSE,
  akta_ppat_signed BOOLEAN DEFAULT FALSE,
  section_d_completed BOOLEAN DEFAULT FALSE,
  section_d_skipped BOOLEAN DEFAULT FALSE,

  -- Status keseluruhan
  status ENUM('pending','complete') DEFAULT 'pending',
  completed_by_admin_id BIGINT REFERENCES users(id) NULL, -- diisi jika admin override manual
  completed_override_note TEXT NULL, -- alasan override, ex: "dokumen fisik lengkap, kendala upload"

  price_asking BIGINT, -- harga takeover yang diminta member
  monthly_installment BIGINT, -- cicilan berjalan saat ini (ditampilkan sbg badge "Cicilan Flat Rp x/bln")

  published_at TIMESTAMP NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
CREATE INDEX idx_takeover_location_status ON takeover_listings(location_id, status);
```

**Logika kunci:**
- Empat flag `section_x_skipped` mencatat bagian mana yang dilewati Member — dipakai admin untuk tahu bagian mana yang perlu dibimbing lewat WhatsApp.
- `status` hanya dua nilai: `pending` (default setelah submit, apa pun kondisinya) dan `complete` (**hanya bisa diubah oleh admin**, lewat endpoint khusus — lihat `api-contract.md`). Ini berbeda dari asumsi status granular (`active`/`sold`/`expired`) di spesifikasi lama karena listing takeover tidak "tayang otomatis" — semuanya melalui verifikasi manual admin dulu.
- `completed_override_note` mencatat kapan admin menandai `complete` meski data tidak lengkap secara digital (dokumen fisik ada tapi tak bisa diunggah) — penting untuk audit log.

---

## 6. RenovRumah

```sql
CREATE TABLE renovation_categories (
  id SMALLINT PRIMARY KEY,
  name VARCHAR(80), -- Interior Minimalis, CarPort & Keramik, dst
  slug VARCHAR(80),
  is_designed BOOLEAN DEFAULT FALSE, -- flag: sudah ada desain final atau masih pakai pola generik
  sort_order SMALLINT
);

CREATE TABLE renovation_items (
  id BIGINT PRIMARY KEY,
  category_id SMALLINT REFERENCES renovation_categories(id),
  name VARCHAR(120), -- ex: "Drop Ceiling 1 Trap Gypsum"
  unit VARCHAR(30), -- m2, unit, titik
  estimated_price BIGINT,
  material_spec TEXT -- ex: "Gypsum Jayaboard 9mm, standar SNI"
);

CREATE TABLE renovation_packages (
  id BIGINT PRIMARY KEY,
  category_id SMALLINT REFERENCES renovation_categories(id),
  tier ENUM('basic','premium') NOT NULL,
  name VARCHAR(80), -- "Paket Basic Minimalis", "Paket Premium All-in Estetik"
  base_price BIGINT,
  description TEXT
);

CREATE TABLE renovation_package_items (
  package_id BIGINT REFERENCES renovation_packages(id),
  item_id BIGINT REFERENCES renovation_items(id),
  qty_default DECIMAL(6,2) DEFAULT 1,
  PRIMARY KEY (package_id, item_id)
);

-- Fase 2 (ditunda, didokumentasikan untuk referensi nanti)
CREATE TABLE rab_custom_selections (
  id BIGINT PRIMARY KEY,
  session_id VARCHAR(100), -- guest session, tidak wajib login
  category_id SMALLINT REFERENCES renovation_categories(id),
  selected_package_type ENUM('basic','premium','custom'),
  created_at TIMESTAMP
);

CREATE TABLE rab_custom_selection_items (
  selection_id BIGINT REFERENCES rab_custom_selections(id),
  item_id BIGINT REFERENCES renovation_items(id) NULL, -- NULL jika item custom manual
  custom_item_name VARCHAR(150) NULL, -- diisi jika konsumen input item sendiri
  custom_item_price BIGINT NULL, -- nominal manual dari konsumen
  qty DECIMAL(6,2) DEFAULT 1
);

CREATE TABLE renovation_gallery (
  id BIGINT PRIMARY KEY,
  category_id SMALLINT REFERENCES renovation_categories(id),
  title VARCHAR(150),
  location_id BIGINT REFERENCES locations(id),
  before_photo_url TEXT,
  after_photo_url TEXT,
  sort_order SMALLINT,
  created_at TIMESTAMP
);
```

---

## 7. Audit Log (Admin & Developer)

```sql
CREATE TABLE audit_logs (
  id BIGINT PRIMARY KEY,
  actor_user_id BIGINT REFERENCES users(id),
  action VARCHAR(100), -- ex: "override_status_complete", "moderate_listing", "edit_agent"
  entity_type VARCHAR(50), -- ex: "takeover_listings", "projects", "agents"
  entity_id BIGINT,
  meta JSONB, -- detail perubahan (before/after)
  created_at TIMESTAMP
);
```

---

## 8. Catatan Desain Kunci untuk AI Agent

- Tidak ada tabel `orders`/`bookings`/`transactions` sama sekali — sesuai filosofi produk, tidak ada transaksi otomatis di sistem ini.
- Tabel `properties` generik dari spesifikasi lama **dipecah** menjadi dua entitas terpisah dengan alur berbeda: `projects` (developer, katalog subsidi baru) dan `takeover_listings` (member, oper kredit) — karena keduanya punya field dan alur approval yang sangat berbeda.
- Semua interaksi konsumen ke agen/admin tidak tercatat sebagai transaksi di database (cukup event tracking di observability — lihat `05-observability.md` — untuk mengukur efektivitas, bukan sebagai data transaksi bisnis).
