# API Contract — CariRumah Banten

Menggantikan Bagian 3 pada spesifikasi teknis lama. REST, siap diimplementasikan dengan Next.js API routes.

---

## 1. Lokasi

```
GET /api/locations?parent_id={id}
→ 200 OK
[
  { "id": 5, "name": "Kabupaten Serang", "slug": "kabupaten-serang", "level": "kabupaten_kota", "has_children": true }
]
```

---

## 2. Rumah Subsidi (Proyek Developer)

```
GET /api/projects/search
Query: location_slug, price_min, price_max, bedrooms_min, page, per_page
→ { "total_results": N, "results": [...] }

GET /api/projects/{id}
→ detail proyek + unit_types[] + bank_partners[] + notary_partners[] + developer{}

POST /api/developer/projects        -- role: developer (Google OAuth)
PATCH /api/developer/projects/{id}  -- role: developer, hanya milik sendiri

GET /api/admin/projects?status=pending_review   -- role: admin
PATCH /api/admin/projects/{id}/moderate         -- role: admin, body: { status }
```

---

## 3. Takeover KPR

```
GET /api/takeover/search
Query: location_slug, price_min, price_max, page, per_page
→ hanya menampilkan listing dengan status = 'complete'

GET /api/takeover/{id}
→ detail listing takeover (field publik saja — data legal sensitif seperti sisa
   pokok utang bank tetap ditampilkan sesuai desain, tapi dokumen mentah/foto
   struk KPR TIDAK diekspos di endpoint publik)
```

### 3.1 Pengisian oleh Member (butuh login)

```
POST /api/member/takeover-listings
Body: { location_id, ownership_program_type, address_detail, ... }
→ membuat listing baru dengan status 'pending'

PATCH /api/member/takeover-listings/{id}/section-a
PATCH /api/member/takeover-listings/{id}/section-b
PATCH /api/member/takeover-listings/{id}/section-c
PATCH /api/member/takeover-listings/{id}/section-d
Body per section, atau:
Body: { "skip": true }   -- menandai section_x_skipped = true, section_x_completed = false

GET /api/member/takeover-listings   -- listing milik member yang sedang login
```

### 3.2 Moderasi oleh Admin

```
GET /api/admin/takeover-listings?status=pending
→ termasuk info section mana yang di-skip, untuk panduan admin saat menghubungi via WA

PATCH /api/admin/takeover-listings/{id}/complete
Body: { "override": boolean, "override_note": "string (wajib jika override=true)" }
→ HANYA role admin. Jika override=true, status langsung 'complete' tanpa syarat
   semua section terisi. Mencatat audit_logs.
```

---

## 4. RenovRumah

```
GET /api/renovation/categories
→ [{ id, name, slug, is_designed }]

GET /api/renovation/categories/{slug}
→ detail kategori: items[], packages[] (basic & premium), gallery[]

GET /api/renovation/gallery?category_slug=
→ daftar galeri before/after
```

### 4.1 Kalkulator RAB Custom — Fase 2 (didokumentasikan, belum aktif di MVP)

```
POST /api/renovation/rab-custom/calculate
Body:
{
  "category_slug": "interior-minimalis",
  "package_type": "custom",           // basic | premium | custom
  "items": [
    { "item_id": 12, "qty": 1 },
    { "custom_item_name": "Pasang gorden custom", "custom_item_price": 850000 }
  ]
}
→ 200 OK
{ "total_estimasi": 24500000, "breakdown": [...] }
```
Tidak ada endpoint checkout/pembayaran — hasil kalkulasi hanya untuk preview + tombol "Konsultasikan via WhatsApp" yang membawa ringkasan pilihan sebagai pesan pra-isi.

---

## 5. Agen (Carousel)

```
GET /api/agents
→ [{ id, name, photo_url, whatsapp_number, role_label }]

POST /api/admin/agents      -- role: admin, CRUD manual
PATCH /api/admin/agents/{id}
DELETE /api/admin/agents/{id}
```

---

## 6. Auth

```
POST /api/auth/register-manual
Body: { name, email, phone, password }
→ Validasi: phone WAJIB terisi sebelum request diproses; jika kosong, 422.

GET /api/auth/google/callback
→ OAuth Google. Setelah callback sukses, jika user baru dan phone belum ada,
   redirect ke halaman "lengkapi nomor kontak" SEBELUM sesi dianggap aktif penuh.

POST /api/auth/login-manual
Body: { email_or_phone, password }
```

---

## 7. Audit Log

```
GET /api/admin/audit-logs?entity_type=&actor_user_id=&page=
→ daftar log aktivitas admin/developer, dipakai dashboard "Aktivitas Audit Log"
```

---

## 8. Kontak WhatsApp (Event Tracking, bukan transaksi)

```
POST /api/events/whatsapp-click
Body: { "context_type": "takeover_listing" | "project" | "renovation" | "agent", "context_id": N }
→ 202 Accepted (fire-and-forget, dipakai untuk metric observability —
   lihat 05-observability.md — bukan untuk mencatat transaksi bisnis)
```
