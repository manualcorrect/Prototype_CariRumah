export interface LocationItem {
  id: string;
  name: string;
  slug: string;
  kabupaten: string;
  popular?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  photoUrl: string;
  role: string;
  rating: number;
  dealsCount: number;
  coverage: string;
  whatsapp: string;
}

export interface SubsidyHouse {
  id: string;
  title: string;
  developer: string;
  location: string;
  kecamatan: string;
  kabupaten: string;
  installment: string;
  price: string;
  type: string;
  landArea: number;
  buildingArea: number;
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
}

export interface TakeoverHouse {
  id: string;
  title: string;
  bankOrigin: string;
  location: string;
  kecamatan: string;
  kabupaten: string;
  takeoverDp: string;
  monthlyInstallment: string;
  remainingTenor: string;
  outstandingPrincipal: string;
  imageUrl: string;
  type: string;
  landArea: number;
  buildingArea: number;
  bedrooms: number;
  bathrooms: number;
  verifiedLegal: boolean;
  status: 'complete' | 'pending';
}

export interface RenovationService {
  id: string;
  title: string;
  category: 'interior' | 'carport' | 'kanopi' | 'dapur' | 'septictank' | 'portfolio';
  startPrice: string;
  description: string;
  iconName: string;
  features: string[];
  imageUrl: string;
}

export const WA_GLOBAL_LINK = "https://wa.me/6285129279843";

export const AGENTS_DATA: Agent[] = [
  {
    id: "1",
    name: "Siti Rahmawati",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    role: "Spesialis KPR Takeover",
    rating: 4.9,
    dealsCount: 120,
    coverage: "Kota Serang",
    whatsapp: WA_GLOBAL_LINK
  },
  {
    id: "2",
    name: "Budi Santoso",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    role: "Konsultan Subsidi FLPP",
    rating: 4.9,
    dealsCount: 98,
    coverage: "Kramatwatu & Ciruas",
    whatsapp: WA_GLOBAL_LINK
  },
  {
    id: "3",
    name: "Dewi Lestari",
    photoUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80",
    role: "Spesialis Wilayah Cilegon",
    rating: 5.0,
    dealsCount: 145,
    coverage: "Kota Cilegon & Cibeber",
    whatsapp: WA_GLOBAL_LINK
  },
  {
    id: "4",
    name: "Ahmad Pratama",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Estimator Renov & Legal",
    rating: 4.8,
    dealsCount: 85,
    coverage: "Seluruh Banten",
    whatsapp: WA_GLOBAL_LINK
  }
];

export const SUBSIDY_HOUSES: SubsidyHouse[] = [
  {
    id: "sub-1",
    title: "Griya Sutera Kramatwatu Tahap 2",
    developer: "PT Banten Graha Pratama",
    location: "Kramatwatu, Kab. Serang",
    kecamatan: "Kramatwatu",
    kabupaten: "Kabupaten Serang",
    installment: "Rp 1.080.000 / bln",
    price: "Rp 166.000.000",
    type: "Tipe 30/60 (Double Dinding)",
    landArea: 60,
    buildingArea: 30,
    bedrooms: 2,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=80",
    tags: ["FLPP 5% Flat", "Bebas PPN", "Siap Huni"],
    featured: true
  },
  {
    id: "sub-2",
    title: "Pesona Ciruas Hills Modern",
    developer: "PT Cipta Sarana Banten",
    location: "Ciruas, Kab. Serang",
    kecamatan: "Ciruas",
    kabupaten: "Kabupaten Serang",
    installment: "Rp 1.120.000 / bln",
    price: "Rp 166.000.000",
    type: "Tipe 36/60 Standar Subsidi",
    landArea: 60,
    buildingArea: 36,
    bedrooms: 2,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop&q=80",
    tags: ["Akses Tol Serang Timur", "Dekat RS", "Bebas Banjir"],
    featured: true
  },
  {
    id: "sub-3",
    title: "Grand Kibin Harmoni Cluster",
    developer: "PT Sinar Kibin Asri",
    location: "Kibin, Kab. Serang",
    kecamatan: "Kibin",
    kabupaten: "Kabupaten Serang",
    installment: "Rp 1.050.000 / bln",
    price: "Rp 162.000.000",
    type: "Tipe 30/60 Desain Tropis",
    landArea: 60,
    buildingArea: 30,
    bedrooms: 2,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    tags: ["Dekat Kawasan Industri Nikomas", "Air Jernih"],
    featured: false
  },
  {
    id: "sub-4",
    title: "Cilegon City Green Residence",
    developer: "PT Cilegon Properti Utama",
    location: "Cibeber, Kota Cilegon",
    kecamatan: "Cibeber",
    kabupaten: "Kota Cilegon",
    installment: "Rp 1.150.000 / bln",
    price: "Rp 166.000.000",
    type: "Tipe 36/72 Hoek",
    landArea: 72,
    buildingArea: 36,
    bedrooms: 2,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
    tags: ["Akses Tol Cilegon Timur", "Cluster One Gate"],
    featured: true
  }
];

export const TAKEOVER_HOUSES: TakeoverHouse[] = [
  {
    id: "to-1",
    title: "Takeover Rumah Subsidi Siap Huni Taman Ciruas Permai",
    bankOrigin: "Bank BTN Syariah",
    location: "Ciruas, Kab. Serang",
    kecamatan: "Ciruas",
    kabupaten: "Kabupaten Serang",
    takeoverDp: "Rp 42.000.000",
    monthlyInstallment: "Rp 1.040.000 / bln",
    remainingTenor: "13 Tahun lagi",
    outstandingPrincipal: "Rp 118.000.000",
    imageUrl: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=600&auto=format&fit=crop&q=80",
    type: "Tipe 36/60 Renov Belakang",
    landArea: 60,
    buildingArea: 36,
    bedrooms: 2,
    bathrooms: 1,
    verifiedLegal: true,
    status: "complete"
  },
  {
    id: "to-2",
    title: "Oper Kredit Rumah Kramatwatu Siap Pakai Dapur Tertutup",
    bankOrigin: "Bank BTN Konvensional",
    location: "Kramatwatu, Kab. Serang",
    kecamatan: "Kramatwatu",
    kabupaten: "Kabupaten Serang",
    takeoverDp: "Rp 38.500.000",
    monthlyInstallment: "Rp 980.000 / bln",
    remainingTenor: "15 Tahun lagi",
    outstandingPrincipal: "Rp 126.000.000",
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&auto=format&fit=crop&q=80",
    type: "Tipe 30/60 Kanopi Carport",
    landArea: 60,
    buildingArea: 30,
    bedrooms: 2,
    bathrooms: 1,
    verifiedLegal: true,
    status: "complete"
  },
  {
    id: "to-3",
    title: "Takeover KPR Asri Kragilan Dekat Stasiun",
    bankOrigin: "Bank BRI",
    location: "Kragilan, Kab. Serang",
    kecamatan: "Kragilan",
    kabupaten: "Kabupaten Serang",
    takeoverDp: "Rp 35.000.000",
    monthlyInstallment: "Rp 1.020.000 / bln",
    remainingTenor: "14 Tahun lagi",
    outstandingPrincipal: "Rp 122.000.000",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80",
    type: "Tipe 36/60 Standar",
    landArea: 60,
    buildingArea: 36,
    bedrooms: 2,
    bathrooms: 1,
    verifiedLegal: true,
    status: "complete"
  }
];

export const RENOV_SERVICES: RenovationService[] = [
  {
    id: "renov-interior",
    title: "Interior Minimalis",
    category: "interior",
    startPrice: "Mulai Rp 3.5 Jt",
    description: "Renovasi interior rumah subsidi, partisi ruangan, plafon drop ceiling modern, backdrop TV minimalis estetik.",
    iconName: "Sofa",
    features: ["Partisi & Backdrop TV", "Plafon Drop Ceiling LED", "Finishing Cat Anti Jamur"],
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "renov-carport",
    title: "Carport & Rabat Beton",
    category: "carport",
    startPrice: "Mulai Rp 2.8 Jt",
    description: "Pemasangan lantai keramik carport kasar anti licin, rabat beton bertulang, tali air rapi, dan ramp jalan mulus.",
    iconName: "Car",
    features: ["Keramik Kasar Anti Licin", "Beton Bertulang K-225", "Tali Air & Kemiringan Presisi"],
    imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "renov-kanopi",
    title: "Kanopi Baja Ringan & Alderon",
    category: "kanopi",
    startPrice: "Mulai Rp 250rb/m²",
    description: "Rangka baja ringan double kokoh, spandek pasir peredam hujan, alderon double layer sejuk, solarflat estetik.",
    iconName: "Umbrella",
    features: ["Baja Ringan SNI 0.75mm", "Alderon Double / Spandek Pasir", "Garansi Rangka 1 Tahun"],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "renov-dapur",
    title: "Pembangunan Dapur Belakang",
    category: "dapur",
    startPrice: "Mulai Rp 7.5 Jt",
    description: "Penutupan dapur belakang aman & rapi, meja kompor cor granit tahan gores, kitchen sink stainless, dan exhaust fan.",
    iconName: "ChefHat",
    features: ["Meja Cor Top Meja Granit", "Dinding Keramik Backsplash", "Instalasi Air Bersih & Kotor"],
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "renov-septictank",
    title: "Bio Septictank & Sumur Resapan",
    category: "septictank",
    startPrice: "Mulai Rp 2.2 Jt",
    description: "Upgrade bio septictank standar ramah lingkungan, sumur resapan anti mampet dan bebas bau selamanya.",
    iconName: "Droplet",
    features: ["Tabung Biofil SNI", "Anti Mampet & Bebas Bau", "Pemasangan Rapi & Cepat"],
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80"
  }
];

export const DISTRICTS_BANTEN = [
  { name: "Kramatwatu", kab: "Kabupaten Serang", count: 18 },
  { name: "Ciruas", kab: "Kabupaten Serang", count: 24 },
  { name: "Kibin", kab: "Kabupaten Serang", count: 12 },
  { name: "Kragilan", kab: "Kabupaten Serang", count: 15 },
  { name: "Baros", kab: "Kabupaten Serang", count: 9 },
  { name: "Kota Serang", kab: "Kota Serang", count: 32 },
  { name: "Cibeber", kab: "Kota Cilegon", count: 14 },
  { name: "Jombang", kab: "Kota Cilegon", count: 11 }
];
