/* Balikos demo — semua data di bawah adalah CONTOH, bukan listing aktual. */
const KOS = [
  { id: 'renon-a', nama: 'Kos Contoh Renon A', area: 'Denpasar', lokasi: 'Renon, Denpasar', dekat: ['Universitas Udayana (Sudirman)', 'Renon'], tipe: 'putri', kisaran: 'menengah', fasilitas: ['AC', 'Kamar mandi dalam', 'WiFi', 'Parkir motor'], art: '' },
  { id: 'panjer-b', nama: 'Kos Contoh Panjer B', area: 'Denpasar', lokasi: 'Panjer, Denpasar', dekat: ['Universitas Warmadewa', 'Panjer'], tipe: 'putra', kisaran: 'hemat', fasilitas: ['Kipas angin', 'WiFi', 'Parkir motor', 'Dapur bersama'], art: 'v2' },
  { id: 'isi-c', nama: 'Kos Contoh Nusa Indah C', area: 'Denpasar', lokasi: 'Denpasar Timur', dekat: ['ISI Denpasar'], tipe: 'campur', kisaran: 'hemat', fasilitas: ['Kamar mandi dalam', 'WiFi', 'Parkir motor'], art: 'v3' },
  { id: 'jimbaran-a', nama: 'Kos Contoh Bukit A', area: 'Jimbaran', lokasi: 'Jimbaran, Badung', dekat: ['Universitas Udayana (Jimbaran)', 'Politeknik Negeri Bali'], tipe: 'putra', kisaran: 'hemat', fasilitas: ['Kamar mandi dalam', 'WiFi', 'Parkir motor'], art: 'v3' },
  { id: 'jimbaran-b', nama: 'Kos Contoh Bukit B', area: 'Jimbaran', lokasi: 'Jimbaran, Badung', dekat: ['Universitas Udayana (Jimbaran)'], tipe: 'putri', kisaran: 'menengah', fasilitas: ['AC', 'Kamar mandi dalam', 'WiFi', 'Parkir motor', 'Dapur bersama'], art: '' },
  { id: 'kuta-a', nama: 'Kos Contoh Kuta A', area: 'Kuta', lokasi: 'Kuta, Badung', dekat: ['Kuta'], tipe: 'campur', kisaran: 'lengkap', fasilitas: ['AC', 'Kamar mandi dalam', 'WiFi', 'Parkir mobil', 'Parkir motor', 'Laundry'], art: 'v2' },
  { id: 'kuta-b', nama: 'Kos Contoh Legian B', area: 'Kuta', lokasi: 'Legian, Badung', dekat: ['Legian', 'Kuta'], tipe: 'campur', kisaran: 'menengah', fasilitas: ['AC', 'WiFi', 'Parkir motor'], art: '' },
  { id: 'canggu-a', nama: 'Kos Contoh Canggu A', area: 'Canggu', lokasi: 'Canggu, Badung', dekat: ['Canggu', 'Berawa'], tipe: 'campur', kisaran: 'lengkap', fasilitas: ['AC', 'Kamar mandi dalam', 'WiFi', 'Parkir motor', 'Meja kerja', 'Laundry'], art: 'v3' },
  { id: 'ubud-a', nama: 'Kos Contoh Ubud A', area: 'Ubud', lokasi: 'Ubud, Gianyar', dekat: ['Ubud'], tipe: 'campur', kisaran: 'menengah', fasilitas: ['Kamar mandi dalam', 'WiFi', 'Parkir motor', 'Meja kerja'], art: 'v2' },
];

const TIPE_LABEL = { putra: 'Putra', putri: 'Putri', campur: 'Campur' };
const KISARAN_LABEL = { hemat: 'Hemat', menengah: 'Menengah', lengkap: 'Lengkap' };
const FASILITAS_FILTER = ['AC', 'Kamar mandi dalam', 'WiFi', 'Parkir motor'];

const BASE = document.documentElement.dataset.base || '';

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const PIN = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';

function kosCard(k) {
  return `<article class="kos-card">
    <div class="arch-art ${k.art}"><span class="art-label">Ilustrasi</span></div>
    <div class="kos-body">
      <div class="kos-meta"><span class="tag ${k.tipe}">${TIPE_LABEL[k.tipe]}</span><span class="small muted">Contoh</span></div>
      <h3><a href="${BASE}kos/?id=${encodeURIComponent(k.id)}">${esc(k.nama)}</a></h3>
      <p class="kos-loc">${PIN}${esc(k.lokasi)}</p>
      <p class="kos-fac">${k.fasilitas.slice(0, 3).map(esc).join(' · ')}${k.fasilitas.length > 3 ? ' · +' + (k.fasilitas.length - 3) : ''}</p>
      <p class="kos-price">Kisaran contoh: <strong>${KISARAN_LABEL[k.kisaran]}</strong> · Harga belum dicantumkan</p>
    </div>
  </article>`;
}

/* Menu HP */
document.addEventListener('click', e => {
  const t = e.target.closest('.nav-toggle');
  if (!t) return;
  const nav = document.getElementById('nav');
  const open = nav.classList.toggle('open');
  t.setAttribute('aria-expanded', open);
});

/* Beranda: kos pilihan */
const featured = document.getElementById('featured');
if (featured) featured.innerHTML = ['renon-a', 'jimbaran-a', 'canggu-a'].map(id => kosCard(KOS.find(k => k.id === id))).join('');

/* Halaman cari */
const results = document.getElementById('results');
if (results) {
  const params = new URLSearchParams(location.search);
  const form = document.getElementById('filter-form');
  const qInput = document.getElementById('q');
  qInput.value = params.get('q') || '';
  const tipeParam = params.get('tipe');
  if (tipeParam) form.querySelectorAll('[name=tipe]').forEach(c => { c.checked = c.value === tipeParam; });

  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function apply() {
    const q = norm(qInput.value.trim());
    const tipe = [...form.querySelectorAll('[name=tipe]:checked')].map(c => c.value);
    const kisaran = [...form.querySelectorAll('[name=kisaran]:checked')].map(c => c.value);
    const fas = [...form.querySelectorAll('[name=fas]:checked')].map(c => c.value);
    const sort = document.getElementById('sort').value;

    let list = KOS.filter(k => {
      const hay = norm([k.nama, k.area, k.lokasi, ...k.dekat].join(' '));
      return (!q || q.split(/\s+/).every(w => hay.includes(w)))
        && (!tipe.length || tipe.includes(k.tipe))
        && (!kisaran.length || kisaran.includes(k.kisaran))
        && fas.every(f => k.fasilitas.includes(f));
    });
    if (sort === 'nama') list.sort((a, b) => a.nama.localeCompare(b.nama, 'id'));
    if (sort === 'area') list.sort((a, b) => a.area.localeCompare(b.area, 'id') || a.nama.localeCompare(b.nama, 'id'));
    if (sort === 'fasilitas') list.sort((a, b) => b.fasilitas.length - a.fasilitas.length);

    document.getElementById('count').textContent = list.length
      ? `${list.length} kos contoh${q ? ` untuk “${qInput.value.trim()}”` : ''}`
      : 'Tidak ada kos contoh';
    results.innerHTML = list.length
      ? `<div class="kos-grid">${list.map(kosCard).join('')}</div>`
      : `<div class="empty"><h3>Belum ada hasil untuk filter ini.</h3><p class="muted" style="margin-inline:auto">Coba ubah lokasi atau fasilitas.</p><button type="button" class="btn btn-outline" id="reset-empty">Hapus filter</button></div>`;
    const r = document.getElementById('reset-empty');
    if (r) r.addEventListener('click', reset);

    const u = new URL(location);
    q ? u.searchParams.set('q', qInput.value.trim()) : u.searchParams.delete('q');
    u.searchParams.delete('tipe');
    history.replaceState(null, '', u);
  }
  function reset() {
    form.reset();
    qInput.value = '';
    apply();
  }
  form.addEventListener('change', apply);
  document.getElementById('sort').addEventListener('change', apply);
  document.getElementById('search-form').addEventListener('submit', e => { e.preventDefault(); apply(); });
  document.getElementById('reset').addEventListener('click', reset);
  document.querySelector('.filter-toggle').addEventListener('click', e => {
    const f = document.querySelector('.filters');
    e.currentTarget.setAttribute('aria-expanded', f.classList.toggle('open'));
  });
  apply();
}

/* Halaman detail */
const detail = document.getElementById('detail');
if (detail) {
  const id = new URLSearchParams(location.search).get('id');
  const k = KOS.find(x => x.id === id) || KOS[0];
  document.title = `${k.nama} — Balikos.com (demo)`;
  document.querySelectorAll('[data-k]').forEach(el => {
    const key = el.dataset.k;
    if (key === 'tipe') el.innerHTML = `<span class="tag ${k.tipe}">${TIPE_LABEL[k.tipe]}</span>`;
    else if (key === 'kisaran') el.textContent = KISARAN_LABEL[k.kisaran];
    else if (key === 'dekat') el.textContent = k.dekat.join(', ');
    else if (key === 'fasilitas') el.innerHTML = k.fasilitas.map(f => `<li>${esc(f)}</li>`).join('');
    else el.textContent = k[key];
  });
  const arts = detail.querySelectorAll('.gallery .arch-art');
  const order = [k.art, ...['', 'v2', 'v3'].filter(v => v !== k.art)];
  arts.forEach((a, i) => { if (order[i]) a.classList.add(order[i]); });
  const others = KOS.filter(x => x.area === k.area && x.id !== k.id).concat(KOS.filter(x => x.area !== k.area)).slice(0, 3);
  document.getElementById('similar').innerHTML = others.map(kosCard).join('');
}

/* Tombol kontak demo */
document.querySelectorAll('[data-demo-contact]').forEach(b => b.addEventListener('click', () => {
  const n = document.getElementById(b.dataset.demoContact);
  n.hidden = false;
  n.focus();
}));

/* Formulir pemilik (tidak mengirim data) */
const ownerForm = document.getElementById('owner-form');
if (ownerForm) ownerForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!ownerForm.checkValidity()) { ownerForm.reportValidity(); return; }
  const n = document.getElementById('owner-notice');
  n.hidden = false;
  n.focus();
});
