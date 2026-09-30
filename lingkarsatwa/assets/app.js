/* Lingkar Satwa — data dan interaksi situs.
   Kontak dan layanan dari lisa.pet (30 September 2026). Daftar produk toko adalah data demo. */
const INFO = {
  jam: 'Senin–Minggu, 09.00–21.00 WIB',
  cabang: {
    gubeng: { nama: 'Gubeng', alamat: 'Jl. Sumatera No. 31-L, Gubeng, Kertajaya, Surabaya', wa: '628113273223', tampil: '0811-3273-223', peta: 'https://s.id/lokasilisa' },
    kedurus: { nama: 'Kedurus', alamat: 'Jl. Mastrip No. 37, Kedurus, Karang Pilang, Surabaya', wa: '628113449800', tampil: '0811-3449-800', peta: 'https://s.id/lokasilisacabangkedurus' },
  },
};
const CABANG_IDS = Object.keys(INFO.cabang);

const LAYANAN = {
  'general-check-up': 'General check-up', 'vaksinasi': 'Vaksinasi', 'microchip': 'Microchip', 'house-call': 'House call',
  'pemeriksaan-darah': 'Pemeriksaan darah', 'profil-gol-darah': 'Profil golongan darah', 'usg': 'Pemeriksaan USG',
  'mikroskop': 'Pemeriksaan mikroskop', 'test-kit': 'Screening test penyakit', 'bedah': 'Bedah mayor & minor',
  'sterilisasi': 'Sterilisasi', 'scaling-gigi': 'Scaling gigi', 'akupunktur': 'Terapi akupunktur',
  'nebulizer-icu': 'Nebulizer & ruang ICU', 'rawat-inap': 'Rawat inap', 'pet-hotel': 'Pet hotel',
};

const PRODUK = [
  { id: 'kering-kucing', nama: 'Makanan kering kucing dewasa', ket: 'Kemasan 1,5 kg', hewan: 'kucing', kat: 'makanan', foto: 'p-makanan-kucing' },
  { id: 'basah-kucing', nama: 'Makanan basah kucing', ket: 'Pouch 85 g, aneka rasa', hewan: 'kucing', kat: 'makanan', foto: 'p-makanan-basah' },
  { id: 'kering-anjing', nama: 'Makanan kering anjing dewasa', ket: 'Kemasan 3 kg', hewan: 'anjing', kat: 'makanan', foto: 'p-makanan-anjing' },
  { id: 'puppy', nama: 'Makanan anak anjing', ket: 'Kemasan 1,5 kg', hewan: 'anjing', kat: 'makanan', foto: 'p-anjing-makan' },
  { id: 'snack-anjing', nama: 'Biskuit camilan anjing', ket: 'Toples 500 g', hewan: 'anjing', kat: 'makanan', foto: 'p-snack' },
  { id: 'pelet-kelinci', nama: 'Pelet kelinci', ket: 'Kemasan 1 kg', hewan: 'kecil', kat: 'makanan', foto: 'p-kelinci' },
  { id: 'pasir-gumpal', nama: 'Pasir kucing gumpal', ket: 'Kantong 10 L, rendah debu', hewan: 'kucing', kat: 'pasir', foto: 'p-pasir' },
  { id: 'vitamin-bulu', nama: 'Vitamin bulu dan kulit', ket: 'Untuk kucing dan anjing', hewan: 'kucing anjing', kat: 'vitamin', foto: 'p-vitamin' },
  { id: 'obat-cacing', nama: 'Obat cacing', ket: 'Dosis sesuai anjuran dokter', hewan: 'kucing anjing', kat: 'vitamin', foto: 'p-kucing' },
  { id: 'kalung', nama: 'Kalung kucing dengan lonceng', ket: 'Ukuran dapat disesuaikan', hewan: 'kucing', kat: 'aksesoris', foto: 'p-kalung' },
  { id: 'bandana', nama: 'Bandana anjing', ket: 'Ukuran S–L', hewan: 'anjing', kat: 'aksesoris', foto: 'p-bandana' },
  { id: 'mangkuk', nama: 'Mangkuk makan anti-slip', ket: 'Stainless, 2 ukuran', hewan: 'kucing anjing', kat: 'aksesoris', foto: 'p-mangkuk' },
];
const HEWAN_LABEL = { kucing: 'Kucing', anjing: 'Anjing', kecil: 'Hewan kecil' };
const KAT_LABEL = { makanan: 'Makanan', pasir: 'Pasir', vitamin: 'Vitamin & obat', aksesoris: 'Aksesoris' };

const BASE = document.documentElement.dataset.base || '';
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const waLink = (text, cab = 'gubeng') => `https://wa.me/${INFO.cabang[cab].wa}?text=${encodeURIComponent(text)}`;
const WA_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>';

/* Cabang pilihan pengunjung (untuk toko dan tautan WA umum) */
let cabangPilihan = null;
try { cabangPilihan = localStorage.getItem('lisa-cabang'); } catch (e) { /* storage diblokir */ }
if (!INFO.cabang[cabangPilihan]) cabangPilihan = 'gubeng';
function setCabang(id) { cabangPilihan = id; try { localStorage.setItem('lisa-cabang', id); } catch (e) { /* abaikan */ } }

/* Menu HP */
document.addEventListener('click', e => {
  const t = e.target.closest('.nav-toggle');
  if (!t) return;
  const open = document.getElementById('nav').classList.toggle('open');
  t.setAttribute('aria-expanded', open);
});

/* Tautan WhatsApp umum: <a data-wa="pesan"> ke cabang pilihan */
function refreshWaLinks() {
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = waLink(a.dataset.wa || 'Hai LISA Animal Care, saya ingin bertanya.', cabangPilihan);
    a.target = '_blank';
    a.rel = 'noopener';
  });
}
refreshWaLinks();

/* Kartu produk */
function productCard(p) {
  const hewan = p.hewan.split(' ').map(h => `<span class="tag">${HEWAN_LABEL[h]}</span>`).join('');
  const cab = INFO.cabang[cabangPilihan];
  return `<article class="product-card">
    <div class="photo"><img src="${BASE}assets/foto/${p.foto}.jpg" alt="${esc(p.nama)}" loading="lazy" width="800" height="800"></div>
    <div class="body">
      <div class="tags">${hewan}<span class="tag kat">${KAT_LABEL[p.kat]}</span></div>
      <h3>${esc(p.nama)}</h3>
      <p class="desc">${esc(p.ket)}</p>
      <p class="price">Tanya harga</p>
      <a class="btn btn-wa btn-sm" href="${waLink(`Hai LISA Animal Care cabang ${cab.nama}, saya mau tanya harga dan stok: ${p.nama} (${p.ket}).`, cabangPilihan)}" target="_blank" rel="noopener">${WA_ICON}Pesan via WhatsApp</a>
    </div>
  </article>`;
}

const featured = document.getElementById('featured-products');
if (featured) featured.innerHTML = ['kering-kucing', 'kering-anjing', 'pasir-gumpal', 'vitamin-bulu'].map(id => productCard(PRODUK.find(p => p.id === id))).join('');

/* Toko: filter hewan, kategori, dan cabang */
const catalog = document.getElementById('catalog');
if (catalog) {
  const q = new URLSearchParams(location.search);
  const state = { hewan: q.get('hewan') || '', kat: q.get('kat') || '' };
  const count = document.getElementById('result-count');
  function render() {
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', state[b.dataset.filter] === b.dataset.value));
    document.querySelectorAll('[data-cabang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.cabang === cabangPilihan));
    const list = PRODUK.filter(p => (!state.hewan || p.hewan.split(' ').includes(state.hewan)) && (!state.kat || p.kat === state.kat));
    count.textContent = `${list.length} produk · pesanan dikirim ke cabang ${INFO.cabang[cabangPilihan].nama}`;
    catalog.innerHTML = list.length
      ? `<div class="product-grid">${list.map(productCard).join('')}</div>`
      : `<div class="empty"><h3>Produk belum tersedia di kategori ini.</h3><p class="muted">Tanyakan ke admin, mungkin bisa kami carikan.</p><a class="btn btn-wa" href="${waLink('Hai LISA Animal Care, saya mencari produk yang belum ada di katalog.', cabangPilihan)}" target="_blank" rel="noopener">${WA_ICON}Tanya admin</a></div>`;
  }
  document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { state[b.dataset.filter] = b.dataset.value; render(); }));
  document.querySelectorAll('[data-cabang]').forEach(b => b.addEventListener('click', () => { setCabang(b.dataset.cabang); render(); refreshWaLinks(); }));
  render();
}

/* Booking */
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  const q = new URLSearchParams(location.search);
  const sel = bookingForm.querySelector('[name=layanan]');
  if (LAYANAN[q.get('layanan')]) sel.value = q.get('layanan');
  const cab = INFO.cabang[q.get('cabang')] ? q.get('cabang') : cabangPilihan;
  bookingForm.querySelector(`[name=cabang][value="${cab}"]`).checked = true;
  const today = new Date().toISOString().slice(0, 10);
  bookingForm.querySelectorAll('input[type=date]').forEach(i => { i.min = today; });

  function syncFields() {
    const v = sel.value;
    bookingForm.querySelectorAll('[data-show]').forEach(el => {
      const on = el.dataset.show === v;
      el.hidden = !on;
      el.querySelectorAll('input').forEach(i => { i.required = on; });
    });
    bookingForm.querySelectorAll('[data-hide]').forEach(el => {
      const off = el.dataset.hide === v;
      el.hidden = off;
      el.querySelectorAll('input').forEach(i => { i.required = !off; });
    });
  }
  sel.addEventListener('change', syncFields);
  syncFields();

  const tgl = s => new Date(s + 'T00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!bookingForm.checkValidity()) { bookingForm.reportValidity(); return; }
    const f = Object.fromEntries(new FormData(bookingForm));
    setCabang(f.cabang);
    const c = INFO.cabang[f.cabang];
    const baris = [
      `Hai LISA Animal Care cabang ${c.nama},`,
      `Namaku: ${f.nama}`,
      `No. WA: ${f.wa}`,
      f.alamat ? `Alamatku di: ${f.alamat}` : null,
      `Aku mau reservasi ${LAYANAN[f.layanan]} nih!`,
      '',
      `Nama pet: ${f.pet}`,
      `Jenis/breed: ${f.jenis}`,
      f.usia ? `Usia: ${f.usia}` : null,
      f.bb ? `BB: ${f.bb}` : null,
      f.layanan === 'pet-hotel' ? `Check-in: ${tgl(f.checkin)}\nCheck-out: ${tgl(f.checkout)}` : `Tanggal: ${tgl(f.tanggal)}`,
      f.keluhan ? `Keluhan/catatan: ${f.keluhan}` : null,
      '',
      'Terima kasih!',
    ].filter(x => x !== null);
    const link = waLink(baris.join('\n'), f.cabang);
    const n = document.getElementById('booking-notice');
    n.querySelector('a').href = link;
    n.hidden = false;
    n.focus();
    window.open(link, '_blank', 'noopener');
  });
}

/* ============ Chat Sapa (terskrip, bukan AI) ============ */
const SAPA_IMG = `${BASE}assets/sapa.png`;
const CAB_LIST = CABANG_IDS.map(id => { const c = INFO.cabang[id]; return `<li><strong>${c.nama}</strong>: ${c.alamat}. WA ${c.tampil}</li>`; }).join('');
const BTN_DARURAT = CABANG_IDS.map(id => `<a class="btn btn-danger btn-sm" href="tel:+${INFO.cabang[id].wa}">Telepon ${INFO.cabang[id].nama} ${INFO.cabang[id].tampil}</a>`).join(' ');
const BTN_ADMIN = t => CABANG_IDS.map(id => `<a class="btn btn-wa btn-sm" href="${waLink(t || 'Hai LISA Animal Care, saya ingin bertanya.', id)}" target="_blank" rel="noopener">${WA_ICON}Admin ${INFO.cabang[id].nama}</a>`).join(' ');
const BTN_BOOKING = l => `<a class="btn btn-primary btn-sm" href="${BASE}booking/${l ? '?layanan=' + l : ''}">Booking${l ? ' ' + LAYANAN[l].toLowerCase() : ' layanan'}</a>`;
const BTN_LAYANAN = id => `<a class="btn btn-outline btn-sm" href="${BASE}layanan/#${id}">Lihat detail</a>`;
const QUICK_UTAMA = ['Lihat layanan', 'Cabang & jam', 'Pet hotel', 'Cara booking', '!Hubungi darurat'];

const svc = (id, teks, quick) => () => ({ html: `<p>${teks}</p>${BTN_BOOKING(id)} ${BTN_LAYANAN(id)}`, quick: quick || ['Cabang & jam', 'Harga'] });

const INTENTS = [
  { id: 'darurat', prioritas: true,
    kata: ['darurat', 'sesak', 'susah napas', 'sulit bernapas', 'kejang', 'keracunan', 'racun', 'kecelakaan', 'tertabrak', 'ketabrak', 'jatuh', 'muntah terus', 'muntah-muntah', 'tidak mau makan', 'gak mau makan', 'ga mau makan', 'nggak mau makan', 'mogok makan', 'berdarah', 'pendarahan', 'pingsan', 'lemas', 'lemes', 'tidak sadar', 'susah lahir', 'digigit ular', 'hubungi darurat'],
    jawab: () => ({ urgent: true, html: `<p>Aku paham kamu khawatir. Kondisi yang kamu ceritakan perlu segera dinilai dokter hewan.</p><p><strong>Telepon cabang terdekat sekarang</strong> supaya tim bisa bersiap. Jangan menunggu jawaban chat ini. Aku tidak bisa mendiagnosis atau memberi dosis obat.</p>${BTN_DARURAT}` }) },
  { id: 'medis',
    kata: ['dosis', 'obat apa', 'obatnya apa', 'kasih obat', 'diagnosa', 'diagnosis', 'sakit apa', 'kenapa ya', 'penyakit', 'gejala', 'diare', 'mencret', 'bersin', 'pilek', 'gatal', 'jamur', 'kutu', 'luka', 'demam', 'batuk', 'muntah', 'paracetamol', 'antibiotik', 'pincang'],
    jawab: () => ({ html: `<p>Penyebabnya perlu dinilai dokter hewan, jadi aku tidak bisa menentukan penyakit, obat, atau dosis.</p><p>Kamu bisa booking general check-up, atau tanya admin cabang. Kalau hewanmu lemas, sesak, kejang, atau tidak mau makan, segera telepon cabang terdekat.</p>${BTN_BOOKING('general-check-up')}`, quick: ['!Hubungi darurat', 'Cabang & jam'] }) },
  { id: 'sapaan', kata: ['halo', 'hai', 'hi', 'hello', 'pagi', 'siang', 'sore', 'malam', 'permisi', 'assalamualaikum'],
    jawab: () => ({ html: '<p>Hai juga! Aku Sapa. Mau cari info apa hari ini?</p>', quick: QUICK_UTAMA }) },
  { id: 'terima-kasih', kata: ['terima kasih', 'makasih', 'thanks', 'thank you', 'ok sip', 'siap'],
    jawab: () => ({ html: '<p>Sama-sama! Semoga kesayanganmu sehat selalu. #YourPetBuddies</p>', quick: QUICK_UTAMA }) },
  { id: 'grooming', kata: ['grooming', 'mandi', 'potong kuku', 'potong bulu', 'cukur', 'salon'],
    jawab: () => ({ html: `<p>Layanan kami berfokus pada kesehatan hewan. Untuk grooming, tanyakan dulu ke admin cabang apakah tersedia.</p>${BTN_ADMIN('Hai LISA Animal Care, apakah ada layanan grooming?')}`, quick: ['Lihat layanan'] }) },
  { id: 'pet-hotel', kata: ['titip', 'penitipan', 'hotel', 'pet hotel', 'nginep', 'mudik', 'liburan', 'boarding'],
    jawab: svc('pet-hotel', 'Pet hotel kami menyediakan kamar kucing dan anjing terpisah, pakan dan pasir premium, serta <strong>laporan video kegiatan harian</strong>. Setiap hewan diperiksa tenaga medis sebelum menginap untuk mencegah penularan.', ['Vaksinasi', 'Harga']) },
  { id: 'rawat-inap', kata: ['rawat inap', 'opname', 'dirawat', 'inap'],
    jawab: svc('rawat-inap', 'Rawat inap ditangani tenaga medis dengan detail terapi dan laporan kondisi setiap hari. Setelah pulang, kondisi hewan tetap dipantau.') },
  { id: 'vaksin', kata: ['vaksin', 'vaksinasi', 'imunisasi', 'rabies', 'suntik'],
    jawab: svc('vaksinasi', 'Kami memberikan vaksin berstandar internasional dengan program lengkap. Jadwal vaksin disesuaikan dokter dengan usia dan kondisi hewanmu. Bawa buku vaksin kalau sudah punya.') },
  { id: 'steril', kata: ['steril', 'sterilisasi', 'kebiri', 'kastrasi', 'birahi'],
    jawab: svc('sterilisasi', 'Sterilisasi dilakukan tim medis khusus tindakan steril, dengan pemantauan intensif setelah operasi. Dokter akan menjelaskan persiapannya saat konsultasi.') },
  { id: 'bedah', kata: ['bedah', 'operasi', 'tumor', 'benjolan', 'jahit'],
    jawab: svc('bedah', 'Kami melayani bedah mayor dan minor dengan monitoring tanda vital selama tindakan. Perlu atau tidaknya operasi ditentukan dokter setelah pemeriksaan.') },
  { id: 'gigi', kata: ['gigi', 'karang gigi', 'scaling', 'scalling', 'bau mulut', 'gusi'],
    jawab: svc('scaling-gigi', 'Scaling gigi membersihkan karang gigi dengan ultrasonic scaler, disertai obat pemulihan gusi. Sebaiknya dilakukan berkala.') },
  { id: 'lab', kata: ['cek darah', 'tes darah', 'darah', 'lab', 'laboratorium', 'usg', 'mikroskop', 'test kit', 'screening', 'golongan darah', 'feses', 'hematologi'],
    jawab: () => ({ html: `<p>Layanan diagnostik kami: pemeriksaan darah lengkap dan kimia darah, profil golongan darah, USG, pemeriksaan mikroskop (feses, darah, bulu, kulit), dan screening test penyakit. Hasilnya disertai surat resmi.</p><a class="btn btn-outline btn-sm" href="${BASE}layanan/#diagnostik">Lihat layanan diagnostik</a> ${BTN_BOOKING('pemeriksaan-darah')}`, quick: ['Cabang & jam', 'Harga'] }) },
  { id: 'nebulizer', kata: ['nebulizer', 'uap', 'icu', 'kritis'],
    jawab: svc('nebulizer-icu', 'Nebulizer memberikan obat lewat uap untuk gangguan saluran napas. Ruang ICU kami mengatur suhu, udara, dan kelembapan untuk kondisi kritis.') },
  { id: 'akupunktur', kata: ['akupunktur', 'akupuntur', 'fisioterapi', 'terapi'],
    jawab: svc('akupunktur', 'Terapi akupunktur adalah fisioterapi pendukung untuk kondisi kronis dan cedera alat gerak, untuk kucing dan anjing.') },
  { id: 'microchip', kata: ['microchip', 'chip', 'mikrocip'],
    jawab: svc('microchip', 'Microchip memberi identitas elektronik untuk hewanmu. Registrasi langsung dilakukan administrasi klinik, dan chip terbaca oleh reader berstandar internasional.') },
  { id: 'house-call', kata: ['house call', 'home visit', 'datang ke rumah', 'ke rumah', 'panggil dokter', 'homecare', 'kunjungan'],
    jawab: svc('house-call', 'Tim medis bisa datang ke rumah untuk pemeriksaan dan tindakan ringan. Kirim alamat dan data hewanmu saat booking, admin akan mengatur jadwalnya.') },
  { id: 'dokter', kata: ['dokter', 'drh', 'tim', 'spesialis'],
    jawab: () => ({ html: `<p>Kami punya 7 dokter hewan dengan fokus keahlian berbeda, misalnya nutrisi dan fisioterapi, penyakit dalam, gigi, bedah, serta emergency dan intensive care.</p><a class="btn btn-outline btn-sm" href="${BASE}tentang/#tim">Lihat tim dokter</a>`, quick: ['Cara booking'] }) },
  { id: 'layanan', kata: ['layanan', 'lihat layanan', 'bisa apa', 'melayani apa', 'jasa', 'klinik', 'periksa', 'pemeriksaan', 'check up', 'checkup', 'cek kesehatan', 'konsultasi'],
    jawab: () => ({ html: `<p>Lingkar Satwa punya 16 layanan:</p><ul><li>Pemeriksaan & pencegahan: check-up, vaksinasi, microchip, house call</li><li>Diagnostik: darah, golongan darah, USG, mikroskop, test kit</li><li>Tindakan: bedah, sterilisasi, scaling gigi, akupunktur, nebulizer & ICU</li><li>Perawatan: rawat inap, pet hotel</li></ul><a class="btn btn-outline btn-sm" href="${BASE}layanan/">Lihat semua layanan</a>`, quick: ['Pet hotel', 'Vaksinasi', 'Sterilisasi', 'Cara booking'] }) },
  { id: 'hewan-kecil', kata: ['kelinci', 'hamster', 'burung', 'marmut', 'guinea', 'kura', 'reptil', 'musang', 'sugar glider', 'ikan'],
    jawab: () => ({ html: `<p>Untuk hewan selain kucing dan anjing, tanyakan dulu ke admin cabang ya, supaya bisa dipastikan layanan dan dokter yang tersedia.</p>${BTN_ADMIN('Hai LISA Animal Care, apakah bisa melayani hewan saya?')}`, quick: ['Cabang & jam'] }) },
  { id: 'produk', kata: ['produk', 'toko', 'petshop', 'pet shop', 'jual', 'beli', 'belanja', 'makanan', 'pakan', 'dry food', 'wet food', 'pasir', 'litter', 'vitamin', 'snack', 'camilan', 'aksesoris', 'kalung', 'mainan', 'stok'],
    jawab: () => ({ html: `<p>Di toko ada makanan kucing dan anjing, pasir, vitamin, obat cacing, dan aksesoris. Pesan lewat tombol WhatsApp di setiap produk, admin cabang akan mengonfirmasi harga dan stok.</p><a class="btn btn-primary btn-sm" href="${BASE}toko/">Lihat toko</a>`, quick: ['Harga', 'Cabang & jam'] }) },
  { id: 'lokasi', kata: ['lokasi', 'alamat', 'dimana', 'di mana', 'maps', 'peta', 'arah', 'cabang', 'terdekat', 'gubeng', 'kedurus', 'parkir', 'cabang & jam', 'surabaya'],
    jawab: () => ({ html: `<p>Kami punya dua cabang di Surabaya:</p><ul>${CAB_LIST}</ul><p>Keduanya buka ${INFO.jam}.</p><a class="btn btn-primary btn-sm" href="${BASE}kontak/">Lihat peta</a>`, quick: ['Cara booking', 'Lihat layanan'] }) },
  { id: 'jam', kata: ['jam', 'buka', 'tutup', 'operasional', 'libur', 'minggu', 'sabtu', 'hari ini', 'malam ini'],
    jawab: () => ({ html: `<p>Cabang Gubeng dan Kedurus buka <strong>${INFO.jam}</strong>.</p><p>Untuk kondisi darurat, telepon cabang terdekat sebelum berangkat.</p>`, quick: ['Cabang & jam', 'Cara booking', '!Hubungi darurat'] }) },
  { id: 'harga', kata: ['harga', 'biaya', 'tarif', 'berapa', 'mahal', 'murah', 'bayar', 'promo', 'diskon', 'price'],
    jawab: () => ({ html: `<p>Biaya tergantung jenis hewan, kondisi, dan tindakan yang dibutuhkan, jadi admin cabang yang akan menginformasikan.</p>${BTN_ADMIN('Hai LISA Animal Care, saya ingin tanya harga.')}`, quick: ['Lihat layanan', 'Produk'] }) },
  { id: 'booking', kata: ['booking', 'book', 'daftar', 'reservasi', 'janji', 'jadwal', 'antri', 'antre', 'cara booking', 'appointment'],
    jawab: () => ({ html: `<p>Cara booking gampang:</p><ul><li>Isi formulir: cabang, layanan, data kamu dan hewanmu.</li><li>Tekan <strong>Lanjut ke WhatsApp</strong>, lalu kirim pesannya.</li><li>Admin cabang mengonfirmasi jadwalmu.</li></ul>${BTN_BOOKING()}`, quick: ['Lihat layanan', 'Cabang & jam'] }) },
  { id: 'kontak', kata: ['kontak', 'admin', 'whatsapp', 'wa', 'telepon', 'telpon', 'nomor', 'cs', 'email', 'instagram', 'manusia', 'orang'],
    jawab: () => ({ html: `<p>Hubungi admin cabang lewat WhatsApp, atau customer service di 0811-3307-722.</p>${BTN_ADMIN()}`, quick: ['Cabang & jam'] }) },
];
const FALLBACK = () => ({ html: `<p>Aku belum bisa menjawab pertanyaan itu. Hubungi admin cabang agar kamu mendapat informasi yang sesuai.</p>${BTN_ADMIN()}`, quick: QUICK_UTAMA });

function cariJawaban(teks) {
  const t = ' ' + teks.toLowerCase().replace(/[^a-z0-9&\s-]/g, ' ').replace(/\s+/g, ' ') + ' ';
  const cocok = i => i.kata.some(k => t.includes(' ' + k + ' ') || (k.length > 4 && t.includes(k)));
  const darurat = INTENTS.find(i => i.prioritas && cocok(i));
  if (darurat) return darurat.jawab();
  const i = INTENTS.find(i => !i.prioritas && cocok(i));
  return i ? i.jawab() : FALLBACK();
}

function buildChat() {
  const launcher = document.createElement('button');
  launcher.className = 'chat-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-controls', 'chat-panel');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.innerHTML = `<img src="${SAPA_IMG}" alt="" width="52" height="52"><span class="dot" aria-hidden="true"></span><span class="label">Tanya Sapa</span><span class="sr-only">Buka chat dengan Sapa</span>`;

  const panel = document.createElement('section');
  panel.className = 'chat-panel';
  panel.id = 'chat-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Chat dengan Sapa');
  panel.innerHTML = `
    <div class="chat-head">
      <img src="${SAPA_IMG}" alt="" width="44" height="44">
      <div><strong>Sapa</strong><span>Asisten chat otomatis Lingkar Satwa</span></div>
      <button class="close" type="button" aria-label="Tutup chat">×</button>
    </div>
    <p class="chat-note">Sapa membantu informasi umum, bukan diagnosis atau dosis obat. Untuk kondisi darurat, telepon Gubeng <a href="tel:+628113273223">0811-3273-223</a> atau Kedurus <a href="tel:+628113449800">0811-3449-800</a>.</p>
    <div class="chat-log" role="log" aria-live="polite"></div>
    <form class="chat-form" autocomplete="off">
      <label class="sr-only" for="chat-input">Tulis pertanyaan</label>
      <input id="chat-input" type="text" placeholder="Tulis pertanyaanmu…" maxlength="300">
      <button type="submit" aria-label="Kirim"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
    </form>`;
  document.body.append(launcher, panel);

  const log = panel.querySelector('.chat-log');
  const input = panel.querySelector('#chat-input');
  let dimulai = false;

  function tambah(html, kelas) {
    const m = document.createElement('div');
    m.className = 'msg ' + kelas;
    m.innerHTML = html;
    log.append(m);
    log.scrollTop = log.scrollHeight;
    return m;
  }
  function quick(list) {
    if (!list || !list.length) return;
    const q = document.createElement('div');
    q.className = 'quick';
    list.forEach(l => {
      const b = document.createElement('button');
      b.type = 'button';
      const danger = l.startsWith('!');
      b.textContent = danger ? l.slice(1) : l;
      if (danger) b.className = 'danger';
      b.addEventListener('click', () => kirim(b.textContent));
      q.append(b);
    });
    log.append(q);
    log.scrollTop = log.scrollHeight;
  }
  function balas(j) {
    const typing = tambah('Sapa sedang mengetik…', 'bot typing');
    setTimeout(() => {
      typing.remove();
      tambah(j.html, 'bot' + (j.urgent ? ' urgent' : ''));
      quick(j.quick);
    }, j.urgent ? 250 : 650);
  }
  function kirim(teks) {
    teks = teks.trim();
    if (!teks) return;
    log.querySelectorAll('.quick').forEach(q => q.remove());
    tambah(esc(teks), 'user');
    balas(cariJawaban(teks));
  }
  function buka() {
    panel.hidden = false;
    launcher.hidden = true;
    launcher.setAttribute('aria-expanded', 'true');
    if (!dimulai) {
      dimulai = true;
      tambah('<p>Hai, aku Sapa, asisten chat otomatis Lingkar Satwa. Aku bisa bantu cari info layanan, cabang, produk, dan cara booking. Mau mulai dari mana?</p>', 'bot');
      quick(QUICK_UTAMA);
    }
    input.focus();
  }
  function tutup() {
    panel.hidden = true;
    launcher.hidden = false;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  }
  launcher.addEventListener('click', buka);
  panel.querySelector('.close').addEventListener('click', tutup);
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') tutup(); });
  panel.querySelector('.chat-form').addEventListener('submit', e => { e.preventDefault(); kirim(input.value); input.value = ''; });
  document.querySelectorAll('[data-open-chat]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); buka(); }));
  if (location.hash === '#chat') buka();
}
buildChat();
