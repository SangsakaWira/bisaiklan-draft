/* Data kos di bawah adalah data contoh untuk mockup (lihat catatan-balikos.com.md). */
const KOS = [
  { id: 'renon-a', nama: 'Kos Griya Renon', area: 'Denpasar', lokasi: 'Renon, Denpasar', dekat: ['Universitas Udayana (Sudirman)', 'Renon'], tipe: 'putri', kisaran: 'menengah', fasilitas: ['AC', 'Kamar mandi dalam', 'WiFi', 'Parkir motor'], foto: 'kamar-3', galeri: ['kamar-3', 'kamar-2', 'km-1'], pemilik: 'Bu Made',
    deskripsi: 'Kos putri yang tenang di kawasan Renon, dekat perkantoran dan kampus Udayana Sudirman. Kamar bersih dengan AC dan kamar mandi dalam, cocok untuk mahasiswi dan pekerja.',
    aturan: ['Khusus putri', 'Tamu lawan jenis hanya di ruang tamu', 'Jam tamu sampai pukul 21.00', 'Sewa minimum 3 bulan'] },
  { id: 'panjer-b', nama: 'Kos Panjer Asri', area: 'Denpasar', lokasi: 'Panjer, Denpasar', dekat: ['Universitas Warmadewa', 'Panjer'], tipe: 'putra', kisaran: 'hemat', fasilitas: ['Kipas angin', 'WiFi', 'Parkir motor', 'Dapur bersama'], foto: 'kamar-10', galeri: ['kamar-10', 'kamar-11', 'km-2'], pemilik: 'Pak Wayan',
    deskripsi: 'Kos putra hemat beberapa menit dari Universitas Warmadewa. Ada dapur bersama untuk masak sendiri dan parkir motor di dalam pagar.',
    aturan: ['Khusus putra', 'Jaga kebersihan dapur bersama', 'Tidak boleh membawa hewan peliharaan', 'Sewa bulanan'] },
  { id: 'isi-c', nama: 'Kos Nusa Indah', area: 'Denpasar', lokasi: 'Denpasar Timur', dekat: ['ISI Denpasar'], tipe: 'campur', kisaran: 'hemat', fasilitas: ['Kamar mandi dalam', 'WiFi', 'Parkir motor'], foto: 'kamar-5', galeri: ['kamar-5', 'kamar-2', 'km-3'], pemilik: 'Bu Ketut',
    deskripsi: 'Kos campur sederhana dengan kamar mandi dalam, dekat ISI Denpasar. Lingkungan perumahan yang tenang dan dekat warung makan.',
    aturan: ['Lantai putra dan putri terpisah', 'Jam tamu sampai pukul 22.00', 'Tidak boleh membawa hewan peliharaan', 'Sewa minimum 1 bulan'] },
  { id: 'jimbaran-a', nama: 'Kos Bukit Jimbaran', area: 'Jimbaran', lokasi: 'Jimbaran, Badung', dekat: ['Universitas Udayana (Jimbaran)', 'Politeknik Negeri Bali'], tipe: 'putra', kisaran: 'hemat', fasilitas: ['Kamar mandi dalam', 'WiFi', 'Parkir motor'], foto: 'kamar-6', galeri: ['kamar-6', 'kamar-11', 'km-1'], pemilik: 'Pak Nyoman',
    deskripsi: 'Kos putra di kawasan Bukit, dekat kampus Udayana Jimbaran dan Politeknik Negeri Bali. Pilihan praktis untuk mahasiswa yang ingin dekat kampus.',
    aturan: ['Khusus putra', 'Jam tamu sampai pukul 22.00', 'Tidak boleh membawa hewan peliharaan', 'Sewa minimum 6 bulan'] },
  { id: 'jimbaran-b', nama: 'Kos Taman Bukit', area: 'Jimbaran', lokasi: 'Jimbaran, Badung', dekat: ['Universitas Udayana (Jimbaran)'], tipe: 'putri', kisaran: 'menengah', fasilitas: ['AC', 'Kamar mandi dalam', 'WiFi', 'Parkir motor', 'Dapur bersama'], foto: 'kamar-1', galeri: ['kamar-1', 'kamar-2', 'km-2'], pemilik: 'Bu Kadek',
    deskripsi: 'Kos putri dengan taman kecil dan dapur bersama, dekat kampus Udayana Jimbaran. Kamar ber-AC dengan kamar mandi dalam.',
    aturan: ['Khusus putri', 'Tamu lawan jenis hanya di ruang tamu', 'Jam tamu sampai pukul 21.00', 'Sewa minimum 3 bulan'] },
  { id: 'kuta-a', nama: 'Kos Kuta Residence', area: 'Kuta', lokasi: 'Kuta, Badung', dekat: ['Kuta'], tipe: 'campur', kisaran: 'lengkap', fasilitas: ['AC', 'Kamar mandi dalam', 'WiFi', 'Parkir mobil', 'Parkir motor', 'Laundry'], foto: 'kamar-8', galeri: ['kamar-8', 'kamar-11', 'km-3'], pemilik: 'Pak Putu',
    deskripsi: 'Kos lengkap untuk pekerja di kawasan Kuta, dengan layanan laundry dan parkir mobil. Akses mudah ke pusat kota dan bandara.',
    aturan: ['Tidak boleh merokok di dalam kamar', 'Tidak boleh membawa hewan peliharaan', 'Sewa minimum 1 bulan'] },
  { id: 'kuta-b', nama: 'Kos Legian Indah', area: 'Kuta', lokasi: 'Legian, Badung', dekat: ['Legian', 'Kuta'], tipe: 'campur', kisaran: 'menengah', fasilitas: ['AC', 'WiFi', 'Parkir motor'], foto: 'kamar-7', galeri: ['kamar-7', 'kamar-2', 'km-1'], pemilik: 'Bu Komang',
    deskripsi: 'Kos ber-AC di Legian, cocok untuk pekerja pariwisata. Dekat jalan utama, minimarket, dan tempat makan.',
    aturan: ['Jam tamu sampai pukul 22.00', 'Tidak boleh merokok di dalam kamar', 'Sewa minimum 1 bulan'] },
  { id: 'canggu-a', nama: 'Kos Berawa Studio', area: 'Canggu', lokasi: 'Canggu, Badung', dekat: ['Canggu', 'Berawa'], tipe: 'campur', kisaran: 'lengkap', fasilitas: ['AC', 'Kamar mandi dalam', 'WiFi', 'Parkir motor', 'Meja kerja', 'Laundry'], foto: 'kamar-4', galeri: ['kamar-4', 'kamar-11', 'km-2'], pemilik: 'Pak Gede',
    deskripsi: 'Kamar model studio dengan meja kerja dan WiFi, cocok untuk pekerja remote di Canggu dan Berawa. Laundry tersedia.',
    aturan: ['Tidak boleh merokok di dalam kamar', 'Tidak boleh membawa hewan peliharaan', 'Sewa minimum 1 bulan'] },
  { id: 'ubud-a', nama: 'Kos Sawah Ubud', area: 'Ubud', lokasi: 'Ubud, Gianyar', dekat: ['Ubud'], tipe: 'campur', kisaran: 'menengah', fasilitas: ['Kamar mandi dalam', 'WiFi', 'Parkir motor', 'Meja kerja'], foto: 'kamar-9', galeri: ['kamar-9', 'kamar-2', 'km-3'], pemilik: 'Bu Luh',
    deskripsi: 'Kos tenang dengan suasana hijau di Ubud. Ada meja kerja di setiap kamar, cocok untuk yang ingin tinggal jauh dari keramaian.',
    aturan: ['Jam tamu sampai pukul 21.00', 'Jaga ketenangan setelah pukul 22.00', 'Sewa minimum 3 bulan'] },
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
    <div class="photo"><img src="${BASE}assets/foto/${k.foto}.jpg" alt="Foto kamar ${esc(k.nama)}" loading="lazy" width="1000" height="750"></div>
    <div class="kos-body">
      <div class="kos-meta"><span class="tag ${k.tipe}">${TIPE_LABEL[k.tipe]}</span><span class="small muted">${esc(k.area)}</span></div>
      <h3><a href="${BASE}kos/?id=${encodeURIComponent(k.id)}">${esc(k.nama)}</a></h3>
      <p class="kos-loc">${PIN}${esc(k.lokasi)}</p>
      <p class="kos-fac">${k.fasilitas.slice(0, 3).map(esc).join(' · ')}${k.fasilitas.length > 3 ? ' · +' + (k.fasilitas.length - 3) : ''}</p>
      <p class="kos-price">Kelas <strong>${KISARAN_LABEL[k.kisaran]}</strong> · Tanya harga ke pemilik</p>
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
      ? `${list.length} kos ditemukan${q ? ` untuk “${qInput.value.trim()}”` : ''}`
      : 'Tidak ada kos yang cocok';
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
  document.title = `${k.nama} — Balikos.com`;
  document.querySelectorAll('[data-k]').forEach(el => {
    const key = el.dataset.k;
    if (key === 'tipe') el.innerHTML = `<span class="tag ${k.tipe}">${TIPE_LABEL[k.tipe]}</span>`;
    else if (key === 'kisaran') el.textContent = KISARAN_LABEL[k.kisaran];
    else if (key === 'dekat') el.textContent = k.dekat.join(', ');
    else if (key === 'fasilitas') el.innerHTML = k.fasilitas.map(f => `<li>${esc(f)}</li>`).join('');
    else if (key === 'aturan') el.innerHTML = k.aturan.map(f => `<li>${esc(f)}</li>`).join('');
    else if (key === 'inisial') el.textContent = k.pemilik.split(' ').pop()[0];
    else el.textContent = k[key];
  });
  const labels = ['Kamar', 'Sudut kamar', 'Kamar mandi'];
  detail.querySelectorAll('.gallery img').forEach((img, i) => {
    img.src = `${BASE}assets/foto/${k.galeri[i]}.jpg`;
    img.alt = `${labels[i]}, ${k.nama}`;
  });
  const others = KOS.filter(x => x.area === k.area && x.id !== k.id).concat(KOS.filter(x => x.area !== k.area)).slice(0, 3);
  document.getElementById('similar').innerHTML = others.map(kosCard).join('');
  const pesan = document.getElementById('c-pesan');
  if (pesan) pesan.value = `Halo ${k.pemilik}, saya tertarik dengan ${k.nama}. Apakah masih ada kamar kosong untuk bulan depan? Berapa harga per bulannya?`;
}

/* Formulir (belum terhubung ke server: hanya menampilkan status terkirim) */
function sentState(formId, noticeId, msg) {
  const f = document.getElementById(formId);
  if (!f) return;
  f.addEventListener('submit', e => {
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const n = document.getElementById(noticeId);
    const nama = f.querySelector('[name=nama]').value.trim().split(' ')[0];
    n.textContent = msg(nama);
    n.hidden = false;
    f.querySelector('[type=submit]').disabled = true;
    n.focus();
  });
}
sentState('contact-form', 'contact-notice', nama => `Terima kasih, ${nama}. Pesanmu sudah diteruskan ke pemilik. Balasan akan masuk ke WhatsApp-mu.`);
sentState('owner-form', 'owner-notice', nama => `Terima kasih, ${nama}. Data kosmu sudah kami terima. Tim Balikos akan menghubungimu lewat WhatsApp untuk langkah berikutnya.`);
