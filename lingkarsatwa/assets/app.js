/* Lingkar Satwa — data dan interaksi situs.
   Nomor, jam, dan produk di bawah adalah data demo (lihat catatan-lingkarsatwa.md). */
const INFO = {
  wa: '6281200000000',
  waTampil: '0812-0000-0000',
  jam: [['Senin–Jumat', '08.00–20.00'], ['Sabtu', '08.00–17.00'], ['Minggu', '09.00–14.00']],
  kota: 'Surabaya, Jawa Timur',
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
const waLink = text => `https://wa.me/${INFO.wa}?text=${encodeURIComponent(text)}`;
const WA_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>';

/* Menu HP */
document.addEventListener('click', e => {
  const t = e.target.closest('.nav-toggle');
  if (!t) return;
  const open = document.getElementById('nav').classList.toggle('open');
  t.setAttribute('aria-expanded', open);
});

/* Tautan WhatsApp umum: <a data-wa="pesan"> */
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = waLink(a.dataset.wa || 'Halo Lingkar Satwa, saya ingin bertanya.');
  a.target = '_blank';
  a.rel = 'noopener';
});

/* Kartu produk */
function productCard(p) {
  const hewan = p.hewan.split(' ').map(h => `<span class="tag">${HEWAN_LABEL[h]}</span>`).join('');
  return `<article class="product-card">
    <div class="photo"><img src="${BASE}assets/foto/${p.foto}.jpg" alt="${esc(p.nama)}" loading="lazy" width="800" height="800"></div>
    <div class="body">
      <div class="tags">${hewan}<span class="tag kat">${KAT_LABEL[p.kat]}</span></div>
      <h3>${esc(p.nama)}</h3>
      <p class="desc">${esc(p.ket)}</p>
      <p class="price">Tanya harga</p>
      <a class="btn btn-wa btn-sm" href="${waLink(`Halo Lingkar Satwa, saya mau tanya harga dan stok: ${p.nama} (${p.ket}).`)}" target="_blank" rel="noopener">${WA_ICON}Pesan via WhatsApp</a>
    </div>
  </article>`;
}

const featured = document.getElementById('featured-products');
if (featured) featured.innerHTML = ['kering-kucing', 'kering-anjing', 'pasir-gumpal', 'bandana'].map(id => productCard(PRODUK.find(p => p.id === id))).join('');

/* Toko: filter */
const catalog = document.getElementById('catalog');
if (catalog) {
  const state = { hewan: new URLSearchParams(location.search).get('hewan') || '', kat: new URLSearchParams(location.search).get('kat') || '' };
  const count = document.getElementById('result-count');
  function render() {
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', state[b.dataset.filter] === b.dataset.value));
    const list = PRODUK.filter(p => (!state.hewan || p.hewan.split(' ').includes(state.hewan)) && (!state.kat || p.kat === state.kat));
    count.textContent = `${list.length} produk`;
    catalog.innerHTML = list.length
      ? `<div class="product-grid">${list.map(productCard).join('')}</div>`
      : `<div class="empty"><h3>Produk belum tersedia di kategori ini.</h3><p class="muted">Tanyakan ke admin, mungkin bisa kami carikan.</p><a class="btn btn-wa" href="${waLink('Halo Lingkar Satwa, saya mencari produk yang belum ada di katalog.')}" target="_blank" rel="noopener">${WA_ICON}Tanya admin</a></div>`;
  }
  document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => {
    state[b.dataset.filter] = b.dataset.value;
    render();
  }));
  render();
}

/* Booking */
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  const pre = new URLSearchParams(location.search).get('layanan');
  if (pre) { const opt = bookingForm.querySelector(`[name=layanan][value="${CSS.escape(pre)}"]`); if (opt) opt.checked = true; }
  const tgl = bookingForm.querySelector('[name=tanggal]');
  tgl.min = new Date().toISOString().slice(0, 10);
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!bookingForm.checkValidity()) { bookingForm.reportValidity(); return; }
    const f = Object.fromEntries(new FormData(bookingForm));
    const tanggal = new Date(f.tanggal + 'T00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const pesan = `Halo Lingkar Satwa, saya ingin booking layanan.\n\nNama: ${f.nama}\nNomor WA: ${f.wa}\nHewan: ${f.hewan}${f.namahewan ? ` (${f.namahewan})` : ''}\nLayanan: ${f.layanan}\nTanggal: ${tanggal}${f.catatan ? `\nCatatan: ${f.catatan}` : ''}\n\nMohon info ketersediaan jadwalnya. Terima kasih.`;
    const link = waLink(pesan);
    const n = document.getElementById('booking-notice');
    n.querySelector('a').href = link;
    n.hidden = false;
    n.focus();
    window.open(link, '_blank', 'noopener');
  });
}

/* ============ Chat Sapa (terskrip, bukan AI) ============ */
const SAPA_IMG = `${BASE}assets/sapa.png`;
const JAM_TEKS = INFO.jam.map(([h, j]) => `<li>${h}: ${j}</li>`).join('');
const BTN_DARURAT = `<a class="btn btn-danger btn-sm" href="tel:+${INFO.wa}">Hubungi darurat ${INFO.waTampil}</a>`;
const BTN_ADMIN = t => `<a class="btn btn-wa btn-sm" href="${waLink(t || 'Halo Lingkar Satwa, saya ingin bertanya.')}" target="_blank" rel="noopener">${WA_ICON}Hubungi admin</a>`;
const BTN_BOOKING = l => `<a class="btn btn-primary btn-sm" href="${BASE}booking/${l ? '?layanan=' + encodeURIComponent(l) : ''}">Booking layanan</a>`;
const QUICK_UTAMA = ['Lihat layanan', 'Cara booking', 'Produk', 'Lokasi & jam', '!Hubungi darurat'];

const INTENTS = [
  { id: 'darurat', prioritas: true,
    kata: ['darurat', 'sesak', 'susah napas', 'sulit bernapas', 'kejang', 'keracunan', 'racun', 'kecelakaan', 'tertabrak', 'ketabrak', 'jatuh', 'muntah terus', 'muntah-muntah', 'tidak mau makan', 'gak mau makan', 'ga mau makan', 'nggak mau makan', 'mogok makan', 'berdarah', 'pendarahan', 'pingsan', 'lemas', 'lemes', 'tidak sadar', 'melahirkan', 'susah lahir', 'digigit ular', 'hubungi darurat'],
    jawab: () => ({ urgent: true, html: `<p>Aku paham kamu khawatir. Kondisi yang kamu ceritakan perlu segera dinilai dokter hewan.</p><p><strong>Hubungi nomor darurat klinik sekarang</strong> melalui tombol di bawah. Jangan menunggu jawaban chat ini. Aku tidak bisa mendiagnosis atau memberi dosis obat.</p>${BTN_DARURAT}` }) },
  { id: 'medis',
    kata: ['dosis', 'obat apa', 'obatnya apa', 'kasih obat', 'diagnosa', 'diagnosis', 'sakit apa', 'kenapa ya', 'penyakit', 'gejala', 'diare', 'mencret', 'bersin', 'pilek', 'gatal', 'jamur', 'kutu', 'luka', 'demam', 'batuk', 'muntah', 'paracetamol', 'antibiotik'],
    jawab: () => ({ html: `<p>Penyebabnya perlu dinilai dokter hewan, jadi aku tidak bisa menentukan penyakit, obat, atau dosis.</p><p>Kamu bisa booking pemeriksaan, atau tanya admin untuk jadwal dokter. Kalau hewanmu lemas, sesak, kejang, atau tidak mau makan, segera hubungi darurat.</p>${BTN_BOOKING('Pemeriksaan umum')} ${BTN_ADMIN('Halo Lingkar Satwa, saya ingin konsultasi dengan dokter hewan.')}`, quick: ['!Hubungi darurat', 'Lokasi & jam'] }) },
  { id: 'sapaan',
    kata: ['halo', 'hai', 'hi', 'hello', 'pagi', 'siang', 'sore', 'malam', 'permisi', 'assalamualaikum'],
    jawab: () => ({ html: '<p>Hai juga! Aku Sapa. Mau cari info apa hari ini?</p>', quick: QUICK_UTAMA }) },
  { id: 'terima-kasih',
    kata: ['terima kasih', 'makasih', 'thanks', 'thank you', 'oke', 'ok sip', 'siap'],
    jawab: () => ({ html: '<p>Sama-sama! Semoga kesayanganmu sehat selalu. Kalau ada yang ingin ditanyakan lagi, aku di sini.</p>', quick: QUICK_UTAMA }) },
  { id: 'vaksin',
    kata: ['vaksin', 'vaksinasi', 'imunisasi', 'rabies', 'suntik'],
    jawab: () => ({ html: '<p>Kami melayani vaksinasi untuk kucing dan anjing. Jenis vaksin dan jadwal yang tepat ditentukan dokter setelah pemeriksaan.</p><p>Bawa buku vaksin kalau sudah punya, ya.</p>' + BTN_BOOKING('Vaksinasi'), quick: ['Harga', 'Lokasi & jam'] }) },
  { id: 'grooming',
    kata: ['grooming', 'mandi', 'potong kuku', 'potong bulu', 'cukur', 'salon', 'bersihin telinga'],
    jawab: () => ({ html: '<p>Layanan grooming kami: mandi, potong kuku, bersihkan telinga, dan rapikan bulu untuk kucing dan anjing.</p><p>Sebaiknya booking dulu supaya tidak menunggu lama.</p>' + BTN_BOOKING('Grooming'), quick: ['Penitipan', 'Harga'] }) },
  { id: 'penitipan',
    kata: ['titip', 'penitipan', 'hotel', 'pet hotel', 'inap', 'nginep', 'mudik', 'liburan', 'boarding'],
    jawab: () => ({ html: '<p>Ada penitipan (pet hotel) untuk kucing dan anjing. Hewan yang dititipkan perlu sudah vaksin dan dalam kondisi sehat.</p><p>Ketersediaan kandang dicek admin sesuai tanggalmu.</p>' + BTN_BOOKING('Penitipan'), quick: ['Vaksinasi', 'Harga'] }) },
  { id: 'homevisit',
    kata: ['home visit', 'datang ke rumah', 'ke rumah', 'panggil dokter', 'homecare', 'kunjungan'],
    jawab: () => ({ html: '<p>Dokter bisa datang ke rumah untuk pemeriksaan, vaksin, atau hewan yang sulit dibawa keluar.</p><p>Area jangkauan dan jadwalnya dikonfirmasi admin dulu, ya.</p>' + BTN_BOOKING('Home visit') + ' ' + BTN_ADMIN('Halo Lingkar Satwa, apakah home visit bisa ke alamat saya?'), quick: ['Harga', 'Cara booking'] }) },
  { id: 'layanan',
    kata: ['layanan', 'lihat layanan', 'bisa apa', 'melayani apa', 'jasa', 'klinik', 'periksa', 'pemeriksaan', 'cek kesehatan', 'dokter', 'steril', 'kebiri', 'sterilisasi'],
    jawab: () => ({ html: `<p>Ini layanan Lingkar Satwa:</p><ul><li>Klinik: pemeriksaan umum dan konsultasi</li><li>Vaksinasi dan obat cacing/kutu</li><li>Grooming dan penitipan</li><li>Home visit</li><li>Layanan darurat</li></ul><p><a href="${BASE}layanan/">Lihat detail layanan</a></p>`, quick: ['Vaksinasi', 'Grooming', 'Penitipan', 'Home visit', 'Cara booking'] }) },
  { id: 'hewan-kecil',
    kata: ['kelinci', 'hamster', 'burung', 'marmut', 'guinea', 'kura', 'reptil', 'musang', 'sugar glider', 'ikan'],
    jawab: () => ({ html: '<p>Untuk hewan selain kucing dan anjing, layanan yang tersedia perlu dicek dulu ke admin, karena tergantung jenis hewan dan dokter yang bertugas.</p><p>Di toko ada pelet kelinci dan beberapa kebutuhan hewan kecil.</p>' + BTN_ADMIN('Halo Lingkar Satwa, apakah bisa melayani hewan saya?'), quick: ['Produk', 'Lokasi & jam'] }) },
  { id: 'produk',
    kata: ['produk', 'toko', 'jual', 'beli', 'belanja', 'makanan', 'pakan', 'makan', 'dry food', 'wet food', 'pasir', 'litter', 'vitamin', 'snack', 'camilan', 'aksesoris', 'kalung', 'mainan', 'stok', 'ready', 'kirim', 'antar', 'ongkir', 'delivery'],
    jawab: () => ({ html: `<p>Di toko kami ada makanan kucing dan anjing, pasir, vitamin, obat cacing, dan aksesoris.</p><p>Pesan lewat tombol WhatsApp di setiap produk. Admin akan mengonfirmasi harga, stok, dan pengiriman.</p><a class="btn btn-primary btn-sm" href="${BASE}toko/">Lihat toko</a>`, quick: ['Harga', 'Lokasi & jam'] }) },
  { id: 'lokasi',
    kata: ['lokasi', 'alamat', 'dimana', 'di mana', 'maps', 'peta', 'arah', 'parkir', 'lokasi & jam', 'surabaya'],
    jawab: () => ({ html: `<p>Kami ada di ${INFO.kota}. Petunjuk arah dan peta ada di halaman kontak.</p><ul>${JAM_TEKS}</ul><a class="btn btn-primary btn-sm" href="${BASE}kontak/">Lihat lokasi</a>`, quick: ['Cara booking'] }) },
  { id: 'jam',
    kata: ['jam', 'buka', 'tutup', 'operasional', 'libur', 'minggu', 'sabtu', 'hari ini'],
    jawab: () => ({ html: `<p>Jam buka Lingkar Satwa:</p><ul>${JAM_TEKS}</ul><p>Di luar jam itu, untuk kondisi darurat hubungi nomor darurat.</p>`, quick: ['Lokasi & jam', 'Cara booking', '!Hubungi darurat'] }) },
  { id: 'harga',
    kata: ['harga', 'biaya', 'tarif', 'berapa', 'mahal', 'murah', 'bayar', 'promo', 'diskon', 'price'],
    jawab: () => ({ html: '<p>Harga layanan dan produk dikonfirmasi langsung oleh admin, karena bisa berbeda sesuai jenis hewan, ukuran, dan kebutuhannya.</p>' + BTN_ADMIN('Halo Lingkar Satwa, saya ingin tanya harga.'), quick: ['Lihat layanan', 'Produk'] }) },
  { id: 'booking',
    kata: ['booking', 'book', 'daftar', 'reservasi', 'janji', 'jadwal', 'antri', 'antre', 'cara booking', 'appointment'],
    jawab: () => ({ html: `<p>Cara booking gampang:</p><ul><li>Isi formulir booking (nama, hewan, layanan, tanggal).</li><li>Tekan <strong>Lanjut ke WhatsApp</strong>, lalu kirim pesannya.</li><li>Admin mengonfirmasi jadwalmu.</li></ul>${BTN_BOOKING()}`, quick: ['Lihat layanan', 'Lokasi & jam'] }) },
  { id: 'kontak',
    kata: ['kontak', 'admin', 'whatsapp', 'wa', 'telepon', 'telpon', 'nomor', 'cs', 'manusia', 'orang'],
    jawab: () => ({ html: `<p>Kamu bisa menghubungi admin lewat WhatsApp ${INFO.waTampil}.</p>${BTN_ADMIN()}`, quick: ['Lokasi & jam'] }) },
];
const FALLBACK = () => ({ html: '<p>Aku belum bisa menjawab pertanyaan itu. Hubungi admin agar kamu mendapat informasi yang sesuai.</p>' + BTN_ADMIN(), quick: QUICK_UTAMA });

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
    <p class="chat-note">Sapa membantu informasi umum, bukan diagnosis atau dosis obat. Untuk kondisi darurat, hubungi <a href="tel:+${INFO.wa}">${INFO.waTampil}</a>.</p>
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
      tambah('<p>Hai, aku Sapa, asisten chat otomatis Lingkar Satwa. Aku bisa bantu cari info layanan, produk, dan cara booking. Mau mulai dari mana?</p>', 'bot');
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
