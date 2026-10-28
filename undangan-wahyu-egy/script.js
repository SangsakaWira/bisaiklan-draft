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
})();
