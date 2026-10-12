import { ItemAdministrasi, ItemWawancara, Peserta, Penguji, Kelompok, AppSettings, PenilaianPeserta } from '../types';

export type GolonganKey = 'Siaga' | 'Penggalang' | 'Penegak' | 'Pandega';

export function parseGolongan(input: string): GolonganKey {
  if (!input) return 'Penggalang';
  const lower = input.toLowerCase();
  if (lower.includes('siaga')) return 'Siaga';
  if (lower.includes('penegak')) return 'Penegak';
  if (lower.includes('pandega')) return 'Pandega';
  return 'Penggalang';
}

export function getDefaultTingkatTKU(golongan: string): Peserta['tingkatTKU'] {
  const g = parseGolongan(golongan);
  switch (g) {
    case 'Siaga':
      return 'Tata';
    case 'Penggalang':
      return 'Terap';
    case 'Penegak':
      return 'Laksana';
    case 'Pandega':
      return 'Pandega';
    default:
      return 'Terap';
  }
}

export function getTingkatTKUList(
  golongan: string
): { value: Peserta['tingkatTKU']; label: string; isSyaratGaruda?: boolean }[] {
  const g = parseGolongan(golongan);
  switch (g) {
    case 'Siaga':
      return [
        { value: 'Tata', label: 'Siaga Tata (Syarat Utama Garuda)', isSyaratGaruda: true },
        { value: 'Bantu', label: 'Siaga Bantu' },
        { value: 'Mula', label: 'Siaga Mula' },
      ];
    case 'Penggalang':
      return [
        { value: 'Terap', label: 'Penggalang Terap (Syarat Utama Garuda)', isSyaratGaruda: true },
        { value: 'Rakit', label: 'Penggalang Rakit' },
        { value: 'Ramu', label: 'Penggalang Ramu' },
      ];
    case 'Penegak':
      return [
        { value: 'Laksana', label: 'Penegak Laksana (Syarat Utama Garuda)', isSyaratGaruda: true },
        { value: 'Bantara', label: 'Penegak Bantara' },
      ];
    case 'Pandega':
      return [
        { value: 'Pandega', label: 'Pandega (Syarat Utama Garuda)', isSyaratGaruda: true },
      ];
    default:
      return [
        { value: 'Terap', label: 'Penggalang Terap (Syarat Utama Garuda)', isSyaratGaruda: true },
        { value: 'Rakit', label: 'Penggalang Rakit' },
        { value: 'Ramu', label: 'Penggalang Ramu' },
      ];
  }
}

export function getGolonganBadgeInfo(golongan: string) {
  const g = parseGolongan(golongan);
  switch (g) {
    case 'Siaga':
      return {
        key: 'Siaga' as GolonganKey,
        label: 'Golongan Siaga',
        tingkatSyarat: 'Siaga Tata',
        colorName: 'Hijau Siaga',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        activeTagClass: 'bg-emerald-600 text-white',
        borderClass: 'border-emerald-500',
        accentBg: 'bg-emerald-50',
        accentText: 'text-emerald-800',
        accentBorder: 'border-emerald-200',
        ringColor: 'ring-emerald-500',
      };
    case 'Penegak':
      return {
        key: 'Penegak' as GolonganKey,
        label: 'Golongan Penegak',
        tingkatSyarat: 'Penegak Laksana',
        colorName: 'Kuning Penegak',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-400',
        activeTagClass: 'bg-amber-500 text-stone-950 font-black',
        borderClass: 'border-amber-500',
        accentBg: 'bg-amber-50',
        accentText: 'text-amber-900',
        accentBorder: 'border-amber-300',
        ringColor: 'ring-amber-500',
      };
    case 'Pandega':
      return {
        key: 'Pandega' as GolonganKey,
        label: 'Golongan Pandega',
        tingkatSyarat: 'Pandega',
        colorName: 'Coklat Pandega',
        badgeClass: 'bg-stone-200 text-stone-900 border-stone-400',
        activeTagClass: 'bg-stone-800 text-white',
        borderClass: 'border-stone-700',
        accentBg: 'bg-stone-100',
        accentText: 'text-stone-900',
        accentBorder: 'border-stone-300',
        ringColor: 'ring-stone-600',
      };
    case 'Penggalang':
    default:
      return {
        key: 'Penggalang' as GolonganKey,
        label: 'Golongan Penggalang',
        tingkatSyarat: 'Penggalang Terap',
        colorName: 'Merah Penggalang',
        badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
        activeTagClass: 'bg-rose-700 text-white',
        borderClass: 'border-rose-500',
        accentBg: 'bg-rose-50',
        accentText: 'text-rose-800',
        accentBorder: 'border-rose-200',
        ringColor: 'ring-rose-500',
      };
  }
}

// ----------------------------------------------------
// 1. TEMPLATES ADMINISTRASI (14 Butir per Golongan)
// ----------------------------------------------------

export const TEMPLATES_ADMINISTRASI: Record<
  GolonganKey,
  Omit<ItemAdministrasi, 'tersedia' | 'catatan'>[]
> = {
  Penggalang: [
    {
      id: 1,
      pencapaian: 'Dapat menunjukkan SKU Tingkat Penggalang Ramu',
    },
    {
      id: 2,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKU Tingkat Penggalang Ramu',
    },
    {
      id: 3,
      pencapaian: 'Dapat menunjukkan SKU Tingkat Penggalang Rakit',
    },
    {
      id: 4,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKU Tingkat Penggalang Rakit',
    },
    {
      id: 5,
      pencapaian: 'Dapat menunjukkan SKU Tingkat Penggalang Terap',
    },
    {
      id: 6,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKU Tingkat Penggalang Terap',
    },
    {
      id: 7,
      pencapaian: 'Dapat menunjukkan SKK dengan rincian 5 macam dari masing - masing bidang (25 TKK)',
    },
    {
      id: 8,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKK dengan rincian 5 macam dari masing - masing bidang (25 TKK) khusus penggalang putri jika bidang berwarna kuning (bidang agama, mental, moral dan spiritual) tidak terpenuhi maka bisa digantikan dengan bidang lain',
    },
    {
      id: 9,
      pencapaian: 'Dapat menunjukkan dari 25 TKK yang telah dicapai sekurang - kurangnya 2 macam tingkat utama dan 3 macam tingkat madya',
    },
    {
      id: 10,
      pencapaian: 'Dapat menunjukkan foto hasta karya sekurang - kurangnya 6 macam',
    },
    {
      id: 11,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan menjadi contoh teladan di rumah dari orang tua',
    },
    {
      id: 12,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan menjadi contoh teladan di lingkungan masyarakat dari Ketua RT dan RW',
    },
    {
      id: 13,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan menjadi contoh teladan di lingkungan sekolah dari pembina gugus depan',
    },
    {
      id: 14,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan menjadi contoh teladan di lingkungan sekolah dari Ketua Mabigus',
    },
  ],

  Siaga: [
    {
      id: 1,
      pencapaian: 'Dapat menunjukkan SKU Tingkat Siaga Mula',
    },
    {
      id: 2,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKU Tingkat Siaga Mula',
    },
    {
      id: 3,
      pencapaian: 'Dapat menunjukkan SKU Tingkat Siaga Bantu',
    },
    {
      id: 4,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKU Tingkat Siaga Bantu',
    },
    {
      id: 5,
      pencapaian: 'Dapat menunjukkan SKU Tingkat Siaga Tata',
    },
    {
      id: 6,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKU Tingkat Siaga Tata',
    },
    {
      id: 7,
      pencapaian: 'Dapat menunjukkan SKK sekurang-kurangnya 4 macam dari 3 bidang TKK Siaga (segitiga)',
    },
    {
      id: 8,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKK TKK Siaga yang telah diperoleh',
    },
    {
      id: 9,
      pencapaian: 'Dapat menunjukkan buku tabungan aktif atas nama sendiri yang diisi secara teratur',
    },
    {
      id: 10,
      pencapaian: 'Dapat menunjukkan foto hasil hasta karya sekurang-kurangnya 3 macam buatan sendiri',
    },
    {
      id: 11,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan menjadi anak yang berbakti dari orang tua',
    },
    {
      id: 12,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan ramah di lingkungan dari Ketua RT/RW',
    },
    {
      id: 13,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan rajin dari Pembina Perindukan Gugus Depan',
    },
    {
      id: 14,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan rajin belajar dari Kepala Sekolah / Ketua Mabigus',
    },
  ],

  Penegak: [
    {
      id: 1,
      pencapaian: 'Dapat menunjukkan SKU Tingkat Penegak Bantara',
    },
    {
      id: 2,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKU Tingkat Penegak Bantara',
    },
    {
      id: 3,
      pencapaian: 'Dapat menunjukkan SKU Tingkat Penegak Laksana',
    },
    {
      id: 4,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKU Tingkat Penegak Laksana',
    },
    {
      id: 5,
      pencapaian: 'Dapat menunjukkan SKK sekurang-kurangnya 10 macam TKK (termasuk 5 TKK Wajib, sekurang-kurangnya 2 Utama & 3 Madya)',
    },
    {
      id: 6,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKK Penegak yang telah dicapai secara lengkap',
    },
    {
      id: 7,
      pencapaian: 'Dapat menunjukkan karya tulis / proposal proyek bakti masyarakat atau hasta karya inovatif',
    },
    {
      id: 8,
      pencapaian: 'Dapat menunjukkan surat keterangan aktif di Satuan Karya Pramuka (Saka) atau kegiatan sosial kemasyarakatan',
    },
    {
      id: 9,
      pencapaian: 'Dapat menunjukkan bukti sertifikat/kemahiran berkomunikasi dalam salah satu Bahasa Internasional (Bahasa Inggris)',
    },
    {
      id: 10,
      pencapaian: 'Dapat menunjukkan bukti memiliki buku rekening tabungan aktif atas nama sendiri',
    },
    {
      id: 11,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan teladan di rumah dari orang tua',
    },
    {
      id: 12,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan teladan dari Ketua RT dan RW',
    },
    {
      id: 13,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan aktif dari Pembina Ambalan Penegak',
    },
    {
      id: 14,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan berprestasi dari Ketua Mabigus',
    },
  ],

  Pandega: [
    {
      id: 1,
      pencapaian: 'Dapat menunjukkan SKU Tingkat Pandega',
    },
    {
      id: 2,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKU Tingkat Pandega',
    },
    {
      id: 3,
      pencapaian: 'Dapat menunjukkan SKK sekurang-kurangnya 10 macam TKK (sedikitnya 3 tingkat Utama dan 3 tingkat Madya)',
    },
    {
      id: 4,
      pencapaian: 'Dapat menunjukkan Fotokopi STL SKK Pandega yang telah diraih',
    },
    {
      id: 5,
      pencapaian: 'Dapat menunjukkan laporan perencanaan dan pelaksanaan proyek pengabdian masyarakat (Renja Bakti)',
    },
    {
      id: 6,
      pencapaian: 'Dapat menunjukkan surat keputusan / surat tugas aktif dalam kepengurusan Dewan Kerja (DKR/DKC/DKD) atau reka',
    },
    {
      id: 7,
      pencapaian: 'Dapat menunjukkan sertifikat keahlian digital / teknologi informasi dan kemampuan bahasa internasional',
    },
    {
      id: 8,
      pencapaian: 'Dapat menunjukkan bukti memiliki rekening tabungan atau perencanaan keuangan mandiri',
    },
    {
      id: 9,
      pencapaian: 'Dapat menunjukkan surat rekomendasi kepemimpinan dan dedikasi dari tokoh masyarakat / lembaga mitra',
    },
    {
      id: 10,
      pencapaian: 'Dapat menunjukkan surat keterangan aktif dalam kegiatan kemasyarakatan / pengabdian sosial',
    },
    {
      id: 11,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dari orang tua / keluarga',
    },
    {
      id: 12,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dari lingkungan tinggal (RT/RW)',
    },
    {
      id: 13,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dan aktif dari Pembina Racana Pandega',
    },
    {
      id: 14,
      pencapaian: 'Dapat menunjukkan surat keterangan berkelakuan baik dari Ketua Mabigus / Pimpinan Perguruan Tinggi',
    },
  ],
};

// ----------------------------------------------------
// 2. TEMPLATES WAWANCARA (11 Butir per Golongan)
// ----------------------------------------------------

export const TEMPLATES_WAWANCARA: Record<
  GolonganKey,
  Omit<ItemWawancara, 'poin' | 'catatan'>[]
> = {
  Penggalang: [
    {
      id: 1,
      pencapaian: 'Dapat memperkenalkan diri dengan baik dan lancar (menggunakan salah satu Bahasa internasional (Bahasa Inggris))',
    },
    {
      id: 2,
      pencapaian: 'Dapat menjelaskan tingkatan TKU pada golongan penggalang',
    },
    {
      id: 3,
      pencapaian: 'Dapat menjelaskan dan menunjukkan tingkatan TKU yang dicapai peserta sekarang',
    },
    {
      id: 4,
      pencapaian: 'Dapat menjelaskan TKK golongan penggalang pada masing - masing bidang (dipilih secara acak pada masing - masing bidang oleh penguji) (total ada 25 TKK, sekurang kurangnya 2 tingkat utama, 3 tingkat madya)',
    },
    {
      id: 5,
      pencapaian: 'Dapat menunjukkan TKK golongan penggalang pada masing - masing bidang (dipilih secara acak pada masing - masing bidang oleh penguji) (total ada 25 TKK, sekurang kurangnya 2 tingkat utama, 3 tingkat madya)',
    },
    {
      id: 6,
      pencapaian: 'Dapat menjelaskan tentang arti Pramuka Garuda',
    },
    {
      id: 7,
      pencapaian: 'Dapat menjelaskan contoh yang baik/ teladan yang sudah dilakukan sekolah dan atau sekitar lingkungan rumah',
    },
    {
      id: 8,
      pencapaian: 'Dapat menunjukkan 6 hasta karya yang telah dibuat dan membuat 2 hasta karya dari 6 hasta karya telah dibuat sebelumnya',
    },
    {
      id: 9,
      pencapaian: 'Dapat menampilkan uji bakat sesuai bakatnya',
    },
    {
      id: 10,
      pencapaian: 'Dapat membuat simpul dan atau ikatan',
    },
    {
      id: 11,
      pencapaian: 'Dapat menggunakan komputer/HP, teknologi informasi minimal internet (untuk penggalang pengujian IT untuk membuat dan memposting di IG video tentang kegiatan pencapaian garuda di kwarran dengan mencantumkan hastag dan tag yang telah ditentukan)',
    },
  ],

  Siaga: [
    {
      id: 1,
      pencapaian: 'Dapat memperkenalkan diri dan keluarga dengan sopan, santun, dan percaya diri (menggunakan Bahasa Indonesia & percakapan sederhana)',
    },
    {
      id: 2,
      pencapaian: 'Dapat menyebutkan dan menjelaskan urutan tingkatan TKU pada golongan Siaga (Mula, Bantu, Tata)',
    },
    {
      id: 3,
      pencapaian: 'Dapat menceritakan pengalaman dan menunjukkan tingkatan TKU yang dicapai sekarang (Siaga Tata)',
    },
    {
      id: 4,
      pencapaian: 'Dapat menceritakan macam-macam TKK Siaga yang dimiliki beserta syarat kecakapannya',
    },
    {
      id: 5,
      pencapaian: 'Dapat menunjukkan letak pemasangan TKK pada seragam pramuka Siaga dan menjelaskan maknanya',
    },
    {
      id: 6,
      pencapaian: 'Dapat menceritakan arti lambang Pramuka Garuda Siaga (warna dasar hijau, burung Garuda lambang kejayaan)',
    },
    {
      id: 7,
      pencapaian: 'Dapat menceritakan contoh pengamalan Dwisatya dan Dwidarma di rumah, perindukan, dan sekolah',
    },
    {
      id: 8,
      pencapaian: 'Dapat menunjukkan hasta karya yang dibuat dan memperagakan cara pembuatannya secara langsung',
    },
    {
      id: 9,
      pencapaian: 'Dapat menampilkan unjuk bakat di hadapan penguji (menyanyi, puisi, menari, seni budaya, atau olahraga)',
    },
    {
      id: 10,
      pencapaian: 'Dapat membuat simpul dasar Siaga (simpul mati, simpul hidup, simpul pangkal, dan simpul jangkar)',
    },
    {
      id: 11,
      pencapaian: 'Dapat mengenal dan menggunakan teknologi sederhana / gawai secara sehat dan bermanfaat didampingi penguji',
    },
  ],

  Penegak: [
    {
      id: 1,
      pencapaian: 'Dapat memaparkan gagasan dan profil diri menggunakan Bahasa Internasional (Bahasa Inggris) secara aktif dan lancar',
    },
    {
      id: 2,
      pencapaian: 'Dapat menjelaskan filosofi dan sistem tingkatan TKU pada golongan Penegak (Bantara dan Laksana)',
    },
    {
      id: 3,
      pencapaian: 'Dapat menjelaskan proses implementasi dan syarat pencapaian Penegak Laksana yang telah diselesaikan',
    },
    {
      id: 4,
      pencapaian: 'Dapat memaparkan penguasaan TKK Penegak pada masing-masing bidang (analisis kecakapan tingkat madya dan utama)',
    },
    {
      id: 5,
      pencapaian: 'Dapat menunjukkan dan menjelaskan aplikasi praktis keahlian TKK dalam kehidupan sehari-hari / kemasyarakatan',
    },
    {
      id: 6,
      pencapaian: 'Dapat menjelaskan filosofi dan makna lambang Pramuka Garuda Penegak (warna dasar kuning keemasan)',
    },
    {
      id: 7,
      pencapaian: 'Dapat memaparkan teladan kepemimpinan dan pengamalan Trisatya serta Dasadarma di ambalan dan masyarakat',
    },
    {
      id: 8,
      pencapaian: 'Dapat mempresentasikan hasil karya tulis ilmiah / proyek inovasi / hasta karya aplikatif yang telah dibuat',
    },
    {
      id: 9,
      pencapaian: 'Dapat menampilkan unjuk bakat kepemimpinan, seni budaya, atau keterampilan teknis kepramukaan lanjutan',
    },
    {
      id: 10,
      pencapaian: 'Dapat mempraktikkan pioneering lanjutan, simpul/ikatan tiang dan palang, serta pemetaan atau kompas/navigasi darat',
    },
    {
      id: 11,
      pencapaian: 'Dapat mendemonstrasikan pengoperasian teknologi digital, pembuatan konten positif di media sosial, dan literasi internet sehat',
    },
  ],

  Pandega: [
    {
      id: 1,
      pencapaian: 'Dapat memaparkan visi kepemimpinan dan wawasan global dalam Bahasa Internasional (Bahasa Inggris) secara fasih',
    },
    {
      id: 2,
      pencapaian: 'Dapat menjelaskan esensi Golongan Pandega dan Tri Bina Gerakan Pramuka (Bina Diri, Bina Satuan, Bina Masyarakat)',
    },
    {
      id: 3,
      pencapaian: 'Dapat memaparkan implementasi SKU Pandega dan kontribusi pengembangan satuan racana serta gugus depan',
    },
    {
      id: 4,
      pencapaian: 'Dapat memaparkan penguasaan TKK dan integrasinya dengan kompetensi profesional atau dunia kerja',
    },
    {
      id: 5,
      pencapaian: 'Dapat mengevaluasi dan membuktikan kontribusi bakti nyata bagi gerakan kepramukaan dan masyarakat luas',
    },
    {
      id: 6,
      pencapaian: 'Dapat menjelaskan makna dan filosofi Pramuka Garuda Pandega (warna dasar coklat keemasan)',
    },
    {
      id: 7,
      pencapaian: 'Dapat merefleksikan keteladanan moral, etika kepemimpinan, dan integritas kepramukaan di lingkungan perguruan tinggi/masyarakat',
    },
    {
      id: 8,
      pencapaian: 'Dapat mempresentasikan hasil karya riset terapan / karya cipta inovasi / laporan proyek pengabdian masyarakat',
    },
    {
      id: 9,
      pencapaian: 'Dapat menguji kecakapan manajerial, public speaking, dan pemecahan masalah (problem solving)',
    },
    {
      id: 10,
      pencapaian: 'Dapat mendemonstrasikan teknik survival lapangan, navigasi darat, atau rancang bangun pioneering lanjutan',
    },
    {
      id: 11,
      pencapaian: 'Dapat memanfaatkan teknologi informasi tingkat lanjut dan transformasi digital untuk pemberdayaan masyarakat',
    },
  ],
};

export function getAdministrasiTemplate(
  golongan: string
): Omit<ItemAdministrasi, 'tersedia' | 'catatan'>[] {
  const g = parseGolongan(golongan);
  return TEMPLATES_ADMINISTRASI[g] || TEMPLATES_ADMINISTRASI.Penggalang;
}

export function getWawancaraTemplate(
  golongan: string
): Omit<ItemWawancara, 'poin' | 'catatan'>[] {
  const g = parseGolongan(golongan);
  return TEMPLATES_WAWANCARA[g] || TEMPLATES_WAWANCARA.Penggalang;
}

// Backwards compatibility default templates
export const DEFAULT_ADMINISTRASI_TEMPLATE = TEMPLATES_ADMINISTRASI.Penggalang;
export const DEFAULT_WAWANCARA_TEMPLATE = TEMPLATES_WAWANCARA.Penggalang;

export const DEFAULT_SETTINGS: AppSettings = {
  kwartirCabang: 'KWARTIR CABANG BANYUMAS',
  kwarran: 'KWARRAN KEMRANJEN',
  golongan: 'GOLONGAN PENGGALANG',
  tahun: '2026',
  tempat: 'Kemranjen, Banyumas',
  mabigusAtauKetuaPanitia: 'Drs. H. Achmad Supriyanto, M.Pd.',
  tanggalDefault: '2026-10-08',
  kopBaris1: 'GERAKAN PRAMUKA',
  kopBaris2: 'KWARTIR RANTING KECAMATAN KEMRANJEN',
  kopBaris3: 'Alamat: Jalan Pramuka Nomor 17 Karangjati Kemranjen Banyumas Kode Pos 53194',
};

export const INITIAL_PENGUJI: Penguji[] = [
  {
    id: 'penguji-1',
    nama: 'Kak Sugeng Priyono, S.Pd., M.Si.',
    nipNta: 'NTA. 11.02.00.001',
    jabatan: 'Andalan Cabang Urusan Penggalang',
    pangkalan: 'Kwarcab Banyumas',
    noHp: '0812-3456-7890',
  },
  {
    id: 'penguji-2',
    nama: 'Kak Siti Nurjanah, M.Pd.',
    nipNta: 'NTA. 11.02.00.008',
    jabatan: 'Pelatih Pembina Pramuka Pusdiklatcab',
    pangkalan: 'Kwarcab Banyumas',
    noHp: '0813-9876-5432',
  },
  {
    id: 'penguji-3',
    nama: 'Kak Bambang Trihatmojo, S.Sos.',
    nipNta: 'NTA. 11.02.00.015',
    jabatan: 'Tim Penilai Garuda Kwarcab Banyumas',
    pangkalan: 'Kwarcab Banyumas',
    noHp: '0857-1122-3344',
  },
];

export const INITIAL_KELOMPOK: Kelompok[] = [
  {
    id: 'kel-1',
    nama: 'Tim Penilai 1 (Regu Rajawali Putra)',
    jenisKelamin: 'Putra',
    pangkalan: 'SMP Negeri 1 Purwokerto',
    namaPenguji: 'Kak Sugeng Priyono, S.Pd., M.Si. & Kak Siti Nurjanah, M.Pd.',
    pengujiIds: ['penguji-1', 'penguji-2'],
    pemimpinRegu: 'Satria Pratama',
    pembinaPendamping: 'Kak Joko Susilo, S.Pd.',
  },
  {
    id: 'kel-2',
    nama: 'Tim Penilai 2 (Regu Mawar Putri)',
    jenisKelamin: 'Putri',
    pangkalan: 'SMP Negeri 1 Purwokerto',
    namaPenguji: 'Kak Siti Nurjanah, M.Pd. & Kak Bambang Trihatmojo, S.Sos.',
    pengujiIds: ['penguji-2', 'penguji-3'],
    pemimpinRegu: 'Anindya Putri Kirana',
    pembinaPendamping: 'Kak Endang Wahyuni, S.Pd.',
  },
  {
    id: 'kel-3',
    nama: 'Tim Penilai 3 (Regu Garuda Sakti Putra)',
    jenisKelamin: 'Putra',
    pangkalan: 'MTs Negeri 1 Banyumas',
    namaPenguji: 'Kak Sugeng Priyono, S.Pd., M.Si.',
    pengujiIds: ['penguji-1'],
    pemimpinRegu: 'Ahmad Faiz Ramadhan',
    pembinaPendamping: 'Kak H. Mukhlasin, S.Ag.',
  },
  {
    id: 'kel-4',
    nama: 'Tim Penilai 4 (Regu Melati Suci Putri)',
    jenisKelamin: 'Putri',
    pangkalan: 'SMP Negeri 2 Banyumas',
    namaPenguji: 'Kak Bambang Trihatmojo, S.Sos.',
    pengujiIds: ['penguji-3'],
    pemimpinRegu: 'Nabila Azzahra',
    pembinaPendamping: 'Kak Sri Rahayu, S.Pd.',
  },
];

export const INITIAL_PESERTA: Peserta[] = [
  {
    id: 'peserta-1',
    nomorPeserta: 'PG-01/BMS/2026',
    nama: 'Satria Pratama',
    jenisKelamin: 'L',
    pangkalan: 'SMP Negeri 1 Purwokerto',
    gudep: '02.001 - 02.002',
    kelompokId: 'kel-1',
    golongan: 'Penggalang',
    tingkatTKU: 'Terap',
    kontakHp: '0812-2233-4455',
    namaPembina: 'Kak Joko Susilo, S.Pd.',
  },
  {
    id: 'peserta-2',
    nomorPeserta: 'PG-02/BMS/2026',
    nama: 'Anindya Putri Kirana',
    jenisKelamin: 'P',
    pangkalan: 'SMP Negeri 1 Purwokerto',
    gudep: '02.001 - 02.002',
    kelompokId: 'kel-2',
    golongan: 'Penggalang',
    tingkatTKU: 'Terap',
    kontakHp: '0813-5566-7788',
    namaPembina: 'Kak Endang Wahyuni, S.Pd.',
  },
  {
    id: 'peserta-3',
    nomorPeserta: 'PG-03/BMS/2026',
    nama: 'Ahmad Faiz Ramadhan',
    jenisKelamin: 'L',
    pangkalan: 'MTs Negeri 1 Banyumas',
    gudep: '02.045 - 02.046',
    kelompokId: 'kel-3',
    golongan: 'Penggalang',
    tingkatTKU: 'Terap',
    kontakHp: '0858-6677-8899',
    namaPembina: 'Kak H. Mukhlasin, S.Ag.',
  },
  {
    id: 'peserta-4',
    nomorPeserta: 'PG-04/BMS/2026',
    nama: 'Nabila Azzahra',
    jenisKelamin: 'P',
    pangkalan: 'SMP Negeri 2 Banyumas',
    gudep: '02.077 - 02.078',
    kelompokId: 'kel-4',
    golongan: 'Penggalang',
    tingkatTKU: 'Terap',
    kontakHp: '0895-1234-5678',
    namaPembina: 'Kak Sri Rahayu, S.Pd.',
  },
  {
    id: 'peserta-5',
    nomorPeserta: 'PG-05/BMS/2026',
    nama: 'Dimas Bagus Wicaksono',
    jenisKelamin: 'L',
    pangkalan: 'SMP Negeri 1 Purwokerto',
    gudep: '02.001 - 02.002',
    kelompokId: 'kel-1',
    golongan: 'Penggalang',
    tingkatTKU: 'Terap',
    kontakHp: '0877-3344-5566',
    namaPembina: 'Kak Joko Susilo, S.Pd.',
  },
  {
    id: 'peserta-6',
    nomorPeserta: 'PG-06/BMS/2026',
    nama: 'Zahra Aulia Rahma',
    jenisKelamin: 'P',
    pangkalan: 'SMP Negeri 2 Banyumas',
    gudep: '02.077 - 02.078',
    kelompokId: 'kel-4',
    golongan: 'Penggalang',
    tingkatTKU: 'Terap',
    kontakHp: '0812-7788-9900',
    namaPembina: 'Kak Sri Rahayu, S.Pd.',
  },
];

// Pre-fill initial assessments matching image scenario:
// In the photo: Jumlah Poin = 37, % = 37/55 * 100% = 67.27% (BELUM LULUS)
// And another one LULUS with >= 44 points (e.g., 48 points = 87.27%)
export const INITIAL_PENILAIAN: Record<string, PenilaianPeserta> = {
  'peserta-1': {
    pesertaId: 'peserta-1',
    pengujiId: 'penguji-1',
    tanggalPenilaian: '2026-10-08',
    administrasi: DEFAULT_ADMINISTRASI_TEMPLATE.map((item) => ({
      ...item,
      tersedia: true,
      catatan: 'Lengkap dan terverifikasi',
    })),
    wawancara: [
      { id: 1, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[0].pencapaian, poin: 4, catatan: 'Lancar perkenalan English' },
      { id: 2, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[1].pencapaian, poin: 5, catatan: 'Sangat paham Ramu-Rakit-Terap' },
      { id: 3, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[2].pencapaian, poin: 5, catatan: 'Menunjukkan TKU Terap' },
      { id: 4, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[3].pencapaian, poin: 4, catatan: 'Menjelaskan 5 bidang TKK' },
      { id: 5, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[4].pencapaian, poin: 4, catatan: 'Bawa bukti TKK Utama & Madya' },
      { id: 6, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[5].pencapaian, poin: 5, catatan: 'Paham makna kiasan & lambang' },
      { id: 7, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[6].pencapaian, poin: 4, catatan: 'Aktif bakti sosial' },
      { id: 8, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[7].pencapaian, poin: 4, catatan: 'Hasta karya anyaman bambu & miniatur' },
      { id: 9, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[8].pencapaian, poin: 5, catatan: 'Uji bakat pidato & pionering' },
      { id: 10, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[9].pencapaian, poin: 5, catatan: 'Simpul pangkal, tiang, & jangkar sempurna' },
      { id: 11, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[10].pencapaian, poin: 5, catatan: 'Video IG terverifikasi link aktif' },
    ],
    catatanUmum: 'Sangat direkomendasikan menjadi Pramuka Garuda Teladan Kwartir Cabang Banyumas.',
    updatedAt: new Date().toISOString(),
  },
  'peserta-2': {
    pesertaId: 'peserta-2',
    pengujiId: 'penguji-2',
    tanggalPenilaian: '2026-10-08',
    administrasi: DEFAULT_ADMINISTRASI_TEMPLATE.map((item, idx) => ({
      ...item,
      tersedia: idx !== 13, // 13 Ya, 1 Belum (Surat mabigus masih proses)
      catatan: idx === 13 ? 'Menunggu ttd Kamabigus (diberi waktu 3 hari)' : 'Lengkap',
    })),
    // Poin 37 persis seperti di gambar foto user (37 / 55 = 67.27%)
    wawancara: [
      { id: 1, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[0].pencapaian, poin: 3, catatan: 'Perkenalan cukup lancar' },
      { id: 2, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[1].pencapaian, poin: 4, catatan: 'Memahami tingkatan' },
      { id: 3, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[2].pencapaian, poin: 4, catatan: 'Menunjukkan TKU Terap' },
      { id: 4, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[3].pencapaian, poin: 3, catatan: 'Perlu pendalaman bidang TKK' },
      { id: 5, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[4].pencapaian, poin: 3, catatan: 'TKK Madya 3 terpenuhi' },
      { id: 6, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[5].pencapaian, poin: 4, catatan: 'Memahami arti Garuda' },
      { id: 7, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[6].pencapaian, poin: 3, catatan: 'Cukup teladan di rumah' },
      { id: 8, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[7].pencapaian, poin: 3, catatan: '6 hasta karya tersedia' },
      { id: 9, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[8].pencapaian, poin: 4, catatan: 'Bakat menyanyi lagu daerah' },
      { id: 10, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[9].pencapaian, poin: 3, catatan: 'Ikatan palang perlu dipererat' },
      { id: 11, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[10].pencapaian, poin: 3, catatan: 'Konten IG sudah diunggah' },
    ],
    catatanUmum: 'Diberikan waktu perbaikan administrasi dan uji ulang wawancara untuk mencapai 80%.',
    updatedAt: new Date().toISOString(),
  },
  'peserta-3': {
    pesertaId: 'peserta-3',
    pengujiId: 'penguji-1',
    tanggalPenilaian: '2026-10-08',
    administrasi: DEFAULT_ADMINISTRASI_TEMPLATE.map((item) => ({
      ...item,
      tersedia: true,
      catatan: 'Lengkap dan tertib',
    })),
    wawancara: [
      { id: 1, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[0].pencapaian, poin: 4, catatan: '' },
      { id: 2, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[1].pencapaian, poin: 4, catatan: '' },
      { id: 3, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[2].pencapaian, poin: 4, catatan: '' },
      { id: 4, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[3].pencapaian, poin: 4, catatan: '' },
      { id: 5, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[4].pencapaian, poin: 4, catatan: '' },
      { id: 6, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[5].pencapaian, poin: 4, catatan: '' },
      { id: 7, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[6].pencapaian, poin: 4, catatan: '' },
      { id: 8, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[7].pencapaian, poin: 4, catatan: '' },
      { id: 9, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[8].pencapaian, poin: 4, catatan: '' },
      { id: 10, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[9].pencapaian, poin: 4, catatan: '' },
      { id: 11, pencapaian: DEFAULT_WAWANCARA_TEMPLATE[10].pencapaian, poin: 5, catatan: '' },
    ],
    catatanUmum: 'Memenuhi syarat kelulusan Pramuka Garuda Penggalang.',
    updatedAt: new Date().toISOString(),
  },
};
