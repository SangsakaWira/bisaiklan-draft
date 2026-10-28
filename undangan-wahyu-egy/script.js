(function () {
  // guest name from ?to=Nama+Tamu
  var to = new URLSearchParams(location.search).get('to');
  if (to) document.getElementById('guestName').textContent = to.trim().slice(0, 60);

  // open invitation
  var cover = document.getElementById('cover');
  document.getElementById('openBtn').addEventListener('click', function () {
    cover.classList.add('open');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    setTimeout(function () { cover.style.display = 'none'; }, 1200);
  });

  // countdown to akad: Sabtu 12 Des 2026 16:00 WIB
  var target = new Date('2026-12-12T16:00:00+07:00').getTime();
  var el = {
    d: document.getElementById('cd-d'), h: document.getElementById('cd-h'),
    m: document.getElementById('cd-m'), s: document.getElementById('cd-s')
  };
  function tick() {
    var diff = Math.max(0, target - Date.now());
    el.d.textContent = Math.floor(diff / 864e5);
    el.h.textContent = Math.floor(diff / 36e5) % 24;
    el.m.textContent = Math.floor(diff / 6e4) % 60;
    el.s.textContent = Math.floor(diff / 1e3) % 60;
  }
  tick();
  setInterval(tick, 1000);

  // reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (n) { io.observe(n); });

  // lightbox
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  document.querySelectorAll('.g').forEach(function (b) {
    b.addEventListener('click', function () {
      lbImg.src = b.dataset.full;
      lbImg.alt = b.querySelector('img').alt;
      lb.hidden = false;
    });
  });
  lb.addEventListener('click', function () { lb.hidden = true; lbImg.src = ''; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.click(); });

  // ucapan & rsvp
  var API = 'https://undangan-api.bisaiklan.online/wishes/wahyu-egy';
  var LABEL = { hadir: 'Hadir', ragu: 'Masih Ragu', tidak: 'Tidak Hadir' };
  var list = document.getElementById('wishes');
  var form = document.getElementById('wishForm');
  var msg = document.getElementById('formMsg');
  var sendBtn = document.getElementById('wSend');
  if (to) document.getElementById('wName').value = to.trim().slice(0, 60);

  function ago(iso) {
    var s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
    if (s < 60) return 'baru saja';
    if (s < 3600) return Math.floor(s / 60) + ' menit lalu';
    if (s < 86400) return Math.floor(s / 3600) + ' jam lalu';
    if (s < 86400 * 30) return Math.floor(s / 86400) + ' hari lalu';
    return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function render(data) {
    ['hadir', 'ragu', 'tidak'].forEach(function (k) {
      document.getElementById('st-' + k).textContent = data.stats[k] || 0;
    });
    list.textContent = '';
    if (!data.wishes.length) {
      var p = document.createElement('p');
      p.className = 'empty';
      p.textContent = 'Belum ada ucapan. Jadilah yang pertama mendoakan kedua mempelai.';
      list.appendChild(p);
      return;
    }
    data.wishes.forEach(function (w) {
      var card = document.createElement('article'); card.className = 'wish';
      var head = document.createElement('div'); head.className = 'wish-head';
      var name = document.createElement('strong'); name.textContent = w.name;
      var badge = document.createElement('span'); badge.className = 'badge ' + w.attendance; badge.textContent = LABEL[w.attendance] || '';
      var text = document.createElement('p'); text.textContent = w.message;
      var time = document.createElement('time'); time.dateTime = w.created_at; time.textContent = ago(w.created_at);
      head.appendChild(name); head.appendChild(badge);
      card.appendChild(head); card.appendChild(text); card.appendChild(time);
      list.appendChild(card);
    });
  }
  function load() {
    fetch(API).then(function (r) { return r.json(); }).then(render).catch(function () {
      list.innerHTML = '<p class="empty">Ucapan belum dapat dimuat. Silakan muat ulang halaman.</p>';
    });
  }
  load();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var body = { name: fd.get('name'), attendance: fd.get('attendance'), message: fd.get('message'), website: fd.get('website') };
    msg.className = 'form-msg err';
    if (!body.name || body.name.trim().length < 2) { msg.textContent = 'Mohon isi nama Anda.'; return; }
    if (!body.attendance) { msg.textContent = 'Mohon pilih konfirmasi kehadiran.'; return; }
    if (!body.message || body.message.trim().length < 2) { msg.textContent = 'Mohon tulis ucapan Anda.'; return; }
    msg.textContent = '';
    sendBtn.disabled = true; sendBtn.textContent = 'Mengirim…';
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.d.error || 'Gagal mengirim');
        render(res.d);
        form.elements.message.value = '';
        msg.className = 'form-msg';
        msg.textContent = 'Terima kasih, ucapan Anda sudah terkirim.';
      })
      .catch(function (err) { msg.textContent = err.message === 'Failed to fetch' ? 'Koneksi bermasalah, coba lagi.' : err.message; })
      .finally(function () { sendBtn.disabled = false; sendBtn.textContent = 'Kirim Ucapan'; });
  });
})();
