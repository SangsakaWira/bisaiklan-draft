/* Lingkar Satwa — toko: katalog, keranjang, dan checkout.
   Produk dan harga adalah DATA CONTOH untuk mockup (lihat catatan-lingkarsatwa.md).
   Tidak ada server: pesanan disusun lalu dikirim ke WhatsApp cabang untuk dikonfirmasi admin.
   Butuh app.js dimuat lebih dulu (INFO, BASE, esc, waLink, WA_ICON, cabangPilihan, setCabang). */

const PRODUK = [
  { id: 'kering-kucing', nama: 'Makanan kering kucing dewasa', hewan: 'kucing', kat: 'makanan', foto: 'p-makanan-kucing',
    varian: [['500 g', 35000], ['1,5 kg', 95000], ['3 kg', 178000]],
    desk: 'Makanan kering lengkap dan seimbang untuk kucing dewasa, dengan protein hewani dan serat untuk pencernaan.' },
  { id: 'basah-kucing', nama: 'Makanan basah kucing', hewan: 'kucing', kat: 'makanan', foto: 'p-makanan-basah',
    varian: [['1 pouch 85 g', 9500], ['12 pouch', 108000]],
    desk: 'Makanan basah aneka rasa untuk membantu asupan cairan harian kucing. Bisa jadi selingan makanan kering.' },
  { id: 'kering-anjing', nama: 'Makanan kering anjing dewasa', hewan: 'anjing', kat: 'makanan', foto: 'p-makanan-anjing',
    varian: [['1,5 kg', 85000], ['3 kg', 160000], ['10 kg', 485000]],
    desk: 'Makanan kering untuk anjing dewasa semua ras, dengan butiran yang mudah dikunyah.' },
  { id: 'puppy', nama: 'Makanan anak anjing', hewan: 'anjing', kat: 'makanan', foto: 'p-anjing-makan',
    varian: [['1,5 kg', 98000], ['3 kg', 185000]],
    desk: 'Diformulasikan untuk masa pertumbuhan anak anjing, dengan butiran kecil yang mudah dimakan.' },
  { id: 'snack-anjing', nama: 'Biskuit camilan anjing', hewan: 'anjing', kat: 'makanan', foto: 'p-snack',
    varian: [['Toples 500 g', 45000]],
    desk: 'Camilan biskuit berbentuk tulang untuk hadiah saat latihan. Berikan secukupnya di luar makan utama.' },
  { id: 'pelet-kelinci', nama: 'Pelet kelinci', hewan: 'kecil', kat: 'makanan', foto: 'p-kelinci',
    varian: [['1 kg', 38000], ['2,5 kg', 89000]],
    desk: 'Pelet berserat tinggi untuk kelinci. Tetap sediakan rumput kering dan air bersih setiap hari.' },
  { id: 'pasir-gumpal', nama: 'Pasir kucing gumpal', hewan: 'kucing', kat: 'pasir', foto: 'p-pasir',
    varian: [['10 L', 65000], ['25 L', 145000]],
    desk: 'Pasir bentonit yang cepat menggumpal dan rendah debu, memudahkan membersihkan kotak pasir.' },
  { id: 'vitamin-bulu', nama: 'Vitamin bulu dan kulit', hewan: 'kucing anjing', kat: 'vitamin', foto: 'p-vitamin',
    varian: [['30 tablet', 75000], ['60 tablet', 140000]],
    desk: 'Suplemen omega untuk membantu menjaga kesehatan kulit dan kilau bulu. Konsultasikan dengan dokter untuk hewan yang sedang dirawat.' },
  { id: 'obat-cacing', nama: 'Obat cacing', hewan: 'kucing anjing', kat: 'vitamin', foto: 'p-kucing',
    varian: [['1 strip', 30000]],
    desk: 'Obat cacing untuk kucing dan anjing. Dosis mengikuti berat badan: tanyakan ke dokter kami sebelum memberikan.' },
  { id: 'kalung', nama: 'Kalung kucing dengan lonceng', hewan: 'kucing', kat: 'aksesoris', foto: 'p-kalung',
    varian: [['Satu ukuran', 25000]],
    desk: 'Kalung nyaman dengan pengait pengaman dan lonceng kecil. Panjang dapat disesuaikan.' },
  { id: 'bandana', nama: 'Bandana anjing', hewan: 'anjing', kat: 'aksesoris', foto: 'p-bandana',
    varian: [['S', 35000], ['M', 35000], ['L', 40000]],
    desk: 'Bandana katun yang adem untuk anjing, dengan kancing jepret yang mudah dipasang.' },
  { id: 'mangkuk', nama: 'Mangkuk makan anti-slip', hewan: 'kucing anjing', kat: 'aksesoris', foto: 'p-mangkuk',
    varian: [['Kecil', 45000], ['Besar', 65000]],
    desk: 'Mangkuk stainless dengan alas karet anti-slip, mudah dicuci dan tidak mudah terbalik.' },
];
const HEWAN_LABEL = { kucing: 'Kucing', anjing: 'Anjing', kecil: 'Hewan kecil' };
const KAT_LABEL = { makanan: 'Makanan', pasir: 'Pasir', vitamin: 'Vitamin & obat', aksesoris: 'Aksesoris' };

const KURIR = [
  { id: 'ambil', nama: 'Ambil di klinik', ket: 'Siap diambil di cabang pilihanmu', eta: 'Hari yang sama', ongkir: 'Gratis', badge: 'LISA', warna: '#6E5DA1', lokal: true, ambil: true },
  { id: 'gosend-instant', nama: 'GoSend Instant', ket: 'Dikirim dari cabang dengan GoSend', eta: '1–3 jam', ongkir: 'Sesuai tarif aplikasi', badge: 'GoSend', warna: '#00880F', lokal: true },
  { id: 'gosend-sameday', nama: 'GoSend Same Day', ket: 'Dikirim di hari yang sama', eta: '6–8 jam', ongkir: 'Sesuai tarif aplikasi', badge: 'GoSend', warna: '#00880F', lokal: true },
  { id: 'grab-instant', nama: 'GrabExpress Instant', ket: 'Dikirim dari cabang dengan GrabExpress', eta: '1–3 jam', ongkir: 'Sesuai tarif aplikasi', badge: 'Grab', warna: '#00843D', lokal: true },
  { id: 'grab-sameday', nama: 'GrabExpress Same Day', ket: 'Dikirim di hari yang sama', eta: '6–8 jam', ongkir: 'Sesuai tarif aplikasi', badge: 'Grab', warna: '#00843D', lokal: true },
  { id: 'jne', nama: 'JNE REG', ket: 'Untuk luar Surabaya', eta: '2–4 hari', ongkir: 'Sesuai tarif JNE', badge: 'JNE', warna: '#1B3A7A' },
  { id: 'jnt', nama: 'J&T Express', ket: 'Untuk luar Surabaya', eta: '2–4 hari', ongkir: 'Sesuai tarif J&T', badge: 'J&T', warna: '#C8102E' },
  { id: 'sicepat', nama: 'SiCepat REG', ket: 'Untuk luar Surabaya', eta: '2–4 hari', ongkir: 'Sesuai tarif SiCepat', badge: 'SiCepat', warna: '#B3261E' },
];
const BAYAR = [
  { id: 'transfer', nama: 'Transfer bank', ket: 'Nomor rekening dikirim admin setelah pesanan dikonfirmasi' },
  { id: 'qris', nama: 'QRIS', ket: 'Kode QRIS dikirim admin, bisa dibayar dengan e-wallet atau m-banking' },
  { id: 'kasir', nama: 'Bayar di kasir', ket: 'Bayar saat mengambil pesanan di klinik', ambil: true },
];

const rp = n => 'Rp' + Number(n).toLocaleString('id-ID');
const produkById = id => PRODUK.find(p => p.id === id);
const hargaMulai = p => Math.min(...p.varian.map(v => v[1]));
const produkUrl = p => `${BASE}toko/produk/?id=${p.id}`;
const CART_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6"/></svg>';

/* ---------- Keranjang (localStorage) ---------- */
const Cart = {
  key: 'lisa-cart',
  get() {
    try {
      const c = JSON.parse(localStorage.getItem(this.key)) || [];
      return c.filter(i => produkById(i.id) && produkById(i.id).varian[i.v]);
    } catch (e) { return []; }
  },
  set(items) { try { localStorage.setItem(this.key, JSON.stringify(items)); } catch (e) { /* abaikan */ } renderCartUI(); },
  add(id, v = 0, qty = 1) {
    const items = this.get();
    const ada = items.find(i => i.id === id && i.v === v);
    if (ada) ada.qty = Math.min(99, ada.qty + qty); else items.push({ id, v, qty });
    this.set(items);
  },
  qty(id, v, qty) {
    let items = this.get();
    items = qty <= 0 ? items.filter(i => !(i.id === id && i.v === v)) : items.map(i => (i.id === id && i.v === v ? { ...i, qty: Math.min(99, qty) } : i));
    this.set(items);
  },
  lines() { return this.get().map(i => { const p = produkById(i.id); const [label, harga] = p.varian[i.v]; return { ...i, p, label, harga, total: harga * i.qty }; }); },
  count() { return this.get().reduce((n, i) => n + i.qty, 0); },
  subtotal() { return this.lines().reduce((n, l) => n + l.total, 0); },
  clear() { this.set([]); },
};

/* ---------- Laci keranjang ---------- */
function buildDrawer() {
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';
  overlay.hidden = true;
  const drawer = document.createElement('aside');
  drawer.className = 'cart-drawer';
  drawer.id = 'cart-drawer';
  drawer.hidden = true;
  drawer.setAttribute('aria-label', 'Keranjang belanja');
  drawer.innerHTML = `
    <div class="drawer-head"><h2>${CART_ICON} Keranjang</h2><button class="close" type="button" aria-label="Tutup keranjang">×</button></div>
    <div class="drawer-body" data-cart-lines></div>
    <div class="drawer-foot">
      <div class="sum-row"><span>Subtotal</span><strong data-cart-subtotal>Rp0</strong></div>
      <p class="small muted">Ongkir dan pembayaran diatur di checkout.</p>
      <a class="btn btn-primary btn-block" href="${BASE}toko/checkout/" data-need-items>Lanjut ke checkout</a>
      <a class="btn btn-ghost btn-block" href="${BASE}toko/" style="margin-top:.5rem">Belanja lagi</a>
    </div>`;
  document.body.append(overlay, drawer);
  const open = () => { overlay.hidden = false; drawer.hidden = false; requestAnimationFrame(() => drawer.classList.add('open')); drawer.querySelector('.close').focus(); };
  const close = () => { drawer.classList.remove('open'); overlay.hidden = true; setTimeout(() => { drawer.hidden = true; }, 200); };
  overlay.addEventListener('click', close);
  drawer.querySelector('.close').addEventListener('click', close);
  drawer.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-cart-open]');
    if (t) { e.preventDefault(); open(); }
  });
  window.openCart = open;
}

function lineHTML(l, compact) {
  return `<div class="cart-line">
    <a href="${produkUrl(l.p)}" class="cl-photo"><img src="${BASE}assets/foto/${l.p.foto}.jpg" alt="" width="64" height="64" loading="lazy"></a>
    <div class="cl-info">
      <a href="${produkUrl(l.p)}" class="cl-name">${esc(l.p.nama)}</a>
      <span class="cl-var">${esc(l.label)} · ${rp(l.harga)}</span>
      ${compact ? `<span class="cl-var">× ${l.qty}</span>` : `<div class="stepper" role="group" aria-label="Jumlah ${esc(l.p.nama)}">
        <button type="button" data-q="${l.id}|${l.v}|${l.qty - 1}" aria-label="Kurangi">−</button><span>${l.qty}</span><button type="button" data-q="${l.id}|${l.v}|${l.qty + 1}" aria-label="Tambah">+</button>
      </div>`}
    </div>
    <div class="cl-total">${rp(l.total)}${compact ? '' : `<button type="button" class="cl-remove" data-q="${l.id}|${l.v}|0">Hapus</button>`}</div>
  </div>`;
}

function renderCartUI() {
  const n = Cart.count();
  document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = n; el.hidden = n === 0; });
  const lines = Cart.lines();
  document.querySelectorAll('[data-cart-lines]').forEach(el => {
    el.innerHTML = lines.length ? lines.map(l => lineHTML(l)).join('')
      : `<div class="cart-empty"><img src="${BASE}assets/sapa.png" alt="" width="72" height="72"><p><strong>Keranjangmu masih kosong.</strong></p><p class="muted small">Yuk, pilih kebutuhan harian kesayanganmu.</p><a class="btn btn-primary btn-sm" href="${BASE}toko/">Mulai belanja</a></div>`;
  });
  document.querySelectorAll('[data-cart-subtotal]').forEach(el => { el.textContent = rp(Cart.subtotal()); });
  document.querySelectorAll('[data-need-items]').forEach(el => el.classList.toggle('disabled', lines.length === 0));
  if (typeof renderCheckout === 'function') renderCheckout();
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-q]');
  if (!b) return;
  const [id, v, q] = b.dataset.q.split('|');
  Cart.qty(id, Number(v), Number(q));
});

/* Notifikasi kecil */
function toast(html) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.innerHTML = html;
  t.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 3200);
}
function tambahKeKeranjang(id, v = 0, qty = 1) {
  Cart.add(id, v, qty);
  const p = produkById(id);
  toast(`<span>${CART_ICON}</span><span><strong>Ditambahkan ke keranjang</strong><br>${esc(p.nama)} · ${esc(p.varian[v][0])}</span><button type="button" data-cart-open>Lihat</button>`);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]');
  if (!b) return;
  e.preventDefault();
  tambahKeKeranjang(b.dataset.add, Number(b.dataset.v || 0), 1);
});

/* ---------- Kartu produk ---------- */
function productCard(p) {
  const hewan = p.hewan.split(' ').map(h => `<span class="tag">${HEWAN_LABEL[h]}</span>`).join('');
  const banyak = p.varian.length > 1;
  return `<article class="product-card">
    <a class="photo" href="${produkUrl(p)}"><img src="${BASE}assets/foto/${p.foto}.jpg" alt="${esc(p.nama)}" loading="lazy" width="800" height="800"></a>
    <div class="body">
      <div class="tags">${hewan}<span class="tag kat">${KAT_LABEL[p.kat]}</span></div>
      <h3><a href="${produkUrl(p)}">${esc(p.nama)}</a></h3>
      <p class="desc">${p.varian.map(v => esc(v[0])).join(' · ')}</p>
      <p class="price">${banyak ? '<span>mulai</span> ' : ''}${rp(hargaMulai(p))}</p>
      <button class="btn btn-primary btn-sm" type="button" data-add="${p.id}">${CART_ICON}+ Keranjang</button>
    </div>
  </article>`;
}

const featured = document.getElementById('featured-products');
if (featured) featured.innerHTML = ['kering-kucing', 'kering-anjing', 'pasir-gumpal', 'vitamin-bulu'].map(id => productCard(produkById(id))).join('');

/* ---------- Katalog ---------- */
const catalog = document.getElementById('catalog');
if (catalog) {
  const q = new URLSearchParams(location.search);
  const state = { hewan: q.get('hewan') || '', kat: q.get('kat') || '', cari: '', urut: 'populer' };
  const count = document.getElementById('result-count');
  const cari = document.getElementById('shop-search');
  const urut = document.getElementById('shop-sort');
  const norm = s => s.toLowerCase();
  function render() {
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', state[b.dataset.filter] === b.dataset.value));
    let list = PRODUK.filter(p => (!state.hewan || p.hewan.split(' ').includes(state.hewan)) && (!state.kat || p.kat === state.kat)
      && (!state.cari || norm(p.nama + ' ' + p.desk + ' ' + KAT_LABEL[p.kat]).includes(norm(state.cari))));
    if (state.urut === 'murah') list = [...list].sort((a, b) => hargaMulai(a) - hargaMulai(b));
    if (state.urut === 'mahal') list = [...list].sort((a, b) => hargaMulai(b) - hargaMulai(a));
    if (state.urut === 'nama') list = [...list].sort((a, b) => a.nama.localeCompare(b.nama, 'id'));
    count.textContent = `${list.length} produk`;
    catalog.innerHTML = list.length
      ? `<div class="product-grid">${list.map(productCard).join('')}</div>`
      : `<div class="empty"><h3>Produk tidak ditemukan.</h3><p class="muted">Coba kata lain, atau tanyakan ke admin. Mungkin bisa kami carikan.</p><a class="btn btn-wa" href="${waLink('Hai LISA Animal Care, saya mencari produk yang belum ada di katalog.', cabangPilihan)}" target="_blank" rel="noopener">${WA_ICON}Tanya admin</a></div>`;
  }
  document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { state[b.dataset.filter] = b.dataset.value; render(); }));
  cari.addEventListener('input', () => { state.cari = cari.value.trim(); render(); });
  urut.addEventListener('change', () => { state.urut = urut.value; render(); });
  render();
}

/* ---------- Detail produk ---------- */
const detail = document.getElementById('product-detail');
if (detail) {
  const p = produkById(new URLSearchParams(location.search).get('id')) || PRODUK[0];
  document.title = `${p.nama} — Toko Lingkar Satwa`;
  let v = 0, qty = 1;
  const hewan = p.hewan.split(' ').map(h => `<span class="tag">${HEWAN_LABEL[h]}</span>`).join('');
  detail.innerHTML = `
    <p class="breadcrumb"><a href="${BASE}">Beranda</a> / <a href="${BASE}toko/">Toko</a> / <a href="${BASE}toko/?kat=${p.kat}">${KAT_LABEL[p.kat]}</a></p>
    <div class="pd-grid">
      <div class="pd-photo"><img src="${BASE}assets/foto/${p.foto}.jpg" alt="${esc(p.nama)}" width="800" height="800"></div>
      <div class="pd-info">
        <div class="tags">${hewan}<span class="tag kat">${KAT_LABEL[p.kat]}</span></div>
        <h1>${esc(p.nama)}</h1>
        <p class="pd-price" data-price></p>
        <p class="small muted">Harga dapat berubah, dikonfirmasi admin saat pesanan diproses.</p>
        <fieldset class="field"><legend class="label">${p.varian.length > 1 ? 'Pilih varian' : 'Varian'}</legend>
          <div class="radio-chips">${p.varian.map((x, i) => `<input type="radio" name="varian" id="v${i}" value="${i}"${i === 0 ? ' checked' : ''}><label for="v${i}">${esc(x[0])}</label>`).join('')}</div>
        </fieldset>
        <div class="field"><span class="label">Jumlah</span>
          <div class="stepper big"><button type="button" data-step="-1" aria-label="Kurangi">−</button><span data-qty>1</span><button type="button" data-step="1" aria-label="Tambah">+</button></div>
        </div>
        <div class="pd-actions">
          <button class="btn btn-primary" type="button" data-pd-add>${CART_ICON}Tambah ke keranjang</button>
          <button class="btn btn-mustard" type="button" data-pd-buy>Beli sekarang</button>
        </div>
        <a class="pd-wa" href="${waLink(`Hai LISA Animal Care, saya mau tanya tentang ${p.nama}.`, cabangPilihan)}" target="_blank" rel="noopener">${WA_ICON}Tanya dulu ke admin</a>
        <div class="pd-desc"><h2>Deskripsi</h2><p>${esc(p.desk)}</p></div>
        <ul class="pd-perks">
          <li><strong>Ambil di klinik</strong><span>Gubeng atau Kedurus, gratis</span></li>
          <li><strong>Kirim instan</strong><span>GoSend & GrabExpress area Surabaya</span></li>
          <li><strong>Kirim ke luar kota</strong><span>JNE, J&T, SiCepat</span></li>
        </ul>
      </div>
    </div>`;
  const price = detail.querySelector('[data-price]');
  const qtyEl = detail.querySelector('[data-qty]');
  const upd = () => { price.textContent = rp(p.varian[v][1] * qty); qtyEl.textContent = qty; };
  detail.querySelectorAll('[name=varian]').forEach(r => r.addEventListener('change', () => { v = Number(r.value); upd(); }));
  detail.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => { qty = Math.max(1, Math.min(99, qty + Number(b.dataset.step))); upd(); }));
  detail.querySelector('[data-pd-add]').addEventListener('click', () => tambahKeKeranjang(p.id, v, qty));
  detail.querySelector('[data-pd-buy]').addEventListener('click', () => { Cart.add(p.id, v, qty); location.href = `${BASE}toko/checkout/`; });
  upd();
  const related = document.getElementById('related-products');
  if (related) related.innerHTML = PRODUK.filter(x => x.id !== p.id && (x.kat === p.kat || x.hewan.split(' ').some(h => p.hewan.includes(h)))).slice(0, 4).map(productCard).join('');
}

/* ---------- Checkout ---------- */
const checkout = document.getElementById('checkout-form');
let renderCheckout = null;
if (checkout) {
  const kurirWrap = document.getElementById('kurir-options');
  const bayarWrap = document.getElementById('bayar-options');
  kurirWrap.innerHTML = KURIR.map((k, i) => `<input type="radio" name="kurir" id="k-${k.id}" value="${k.id}"${i === 0 ? ' checked' : ''}>
    <label for="k-${k.id}" class="option-card"><span class="cour-badge" style="background:${k.warna}">${esc(k.badge)}</span><span class="oc-main"><strong>${esc(k.nama)}</strong><span>${esc(k.ket)} · ${esc(k.eta)}</span></span><span class="oc-price">${esc(k.ongkir)}</span></label>`).join('');
  bayarWrap.innerHTML = BAYAR.map((b, i) => `<input type="radio" name="bayar" id="b-${b.id}" value="${b.id}"${i === 0 ? ' checked' : ''}>
    <label for="b-${b.id}" class="option-card" data-bayar="${b.id}"><span class="oc-main"><strong>${esc(b.nama)}</strong><span>${esc(b.ket)}</span></span></label>`).join('');
  checkout.querySelector(`[name=cabang][value="${cabangPilihan}"]`).checked = true;

  const val = n => (checkout.querySelector(`[name=${n}]:checked`) || checkout.querySelector(`[name=${n}]`) || {}).value;
  function sync() {
    const k = KURIR.find(x => x.id === val('kurir'));
    checkout.querySelectorAll('[data-alamat]').forEach(el => { el.hidden = !!k.ambil; el.querySelectorAll('input,textarea').forEach(i => { i.required = !k.ambil && i.dataset.req !== undefined; }); });
    checkout.querySelectorAll('[data-luar]').forEach(el => { el.hidden = !!k.lokal; el.querySelectorAll('input').forEach(i => { i.required = !k.lokal; }); });
    const kasir = checkout.querySelector('#b-kasir');
    kasir.disabled = !k.ambil;
    checkout.querySelector('[data-bayar=kasir]').classList.toggle('is-disabled', !k.ambil);
    if (!k.ambil && kasir.checked) checkout.querySelector('#b-transfer').checked = true;
    document.getElementById('cabang-label').textContent = k.ambil ? 'Ambil di cabang' : 'Dikirim dari cabang';
    document.getElementById('kurir-note').textContent = k.ambil ? 'Admin akan mengabari saat pesanan siap diambil.'
      : k.lokal ? 'Pengiriman instan dan same day khusus area Surabaya. Ongkir mengikuti tarif aplikasi dan dikonfirmasi admin sebelum pembayaran.'
      : 'Ongkir ekspedisi dihitung dari berat paket dan kota tujuan, lalu dikonfirmasi admin sebelum pembayaran.';
    renderCheckout();
  }
  renderCheckout = function () {
    const lines = Cart.lines();
    const sum = document.getElementById('order-summary');
    const k = KURIR.find(x => x.id === val('kurir'));
    document.getElementById('checkout-empty').hidden = lines.length > 0;
    document.getElementById('checkout-main').hidden = lines.length === 0;
    if (!lines.length) return;
    sum.innerHTML = `${lines.map(l => lineHTML(l, true)).join('')}
      <div class="sum-rows">
        <div class="sum-row"><span>Subtotal (${Cart.count()} barang)</span><span>${rp(Cart.subtotal())}</span></div>
        <div class="sum-row"><span>Ongkir · ${esc(k.nama)}</span><span>${k.ambil ? 'Gratis' : 'Dikonfirmasi admin'}</span></div>
        <div class="sum-row total"><span>Total</span><strong>${rp(Cart.subtotal())}${k.ambil ? '' : '<small> + ongkir</small>'}</strong></div>
      </div>`;
  };
  checkout.addEventListener('change', e => { if (['kurir', 'cabang', 'bayar'].includes(e.target.name)) sync(); });

  checkout.addEventListener('submit', e => {
    e.preventDefault();
    if (!Cart.count()) return;
    if (!checkout.checkValidity()) { checkout.reportValidity(); return; }
    const f = Object.fromEntries(new FormData(checkout));
    const k = KURIR.find(x => x.id === f.kurir);
    const b = BAYAR.find(x => x.id === f.bayar);
    const c = INFO.cabang[f.cabang];
    setCabang(f.cabang);
    const d = new Date();
    const no = `LS-${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const lines = Cart.lines();
    const msg = [
      `Hai LISA Animal Care cabang ${c.nama}, aku mau pesan dari toko online.`,
      `No. pesanan: ${no}`,
      '',
      ...lines.map((l, i) => `${i + 1}. ${l.p.nama} (${l.label}) x${l.qty} = ${rp(l.total)}`),
      `Subtotal: ${rp(Cart.subtotal())}`,
      '',
      `Pengiriman: ${k.nama}${k.ambil ? ` di cabang ${c.nama}` : ` dari cabang ${c.nama}`}`,
      k.ambil ? null : `Alamat: ${f.alamat}${f.kecamatan ? ', ' + f.kecamatan : ''}${!k.lokal ? `, ${f.kota} ${f.kodepos}` : ''}`,
      k.ambil || !f.patokan ? null : `Patokan: ${f.patokan}`,
      `Pembayaran: ${b.nama}`,
      '',
      `Nama: ${f.nama}`,
      `No. WA: ${f.wa}`,
      f.catatan ? `Catatan: ${f.catatan}` : null,
      '',
      'Mohon konfirmasi stok, ongkir, dan total pembayarannya. Terima kasih!',
    ].filter(x => x !== null).join('\n');
    const link = waLink(msg, f.cabang);
    try { localStorage.setItem('lisa-last-order', JSON.stringify({ no, total: Cart.subtotal(), cabang: f.cabang, link })); } catch (err) { /* abaikan */ }
    Cart.clear();
    const done = document.getElementById('checkout-done');
    done.querySelector('[data-no]').textContent = no;
    done.querySelector('[data-cab]').textContent = c.nama;
    done.querySelector('a.btn-wa').href = link;
    document.getElementById('checkout-main').hidden = true;
    document.getElementById('checkout-empty').hidden = true;
    done.hidden = false;
    done.focus();
    window.scrollTo({ top: 0 });
    window.open(link, '_blank', 'noopener');
  });
  sync();
}

/* ---------- Mulai ---------- */
buildDrawer();
renderCartUI();
