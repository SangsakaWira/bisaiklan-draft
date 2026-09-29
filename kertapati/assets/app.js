// Kecamatan Kertapati — demo statis
(function () {
  // Menu ponsel
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Pencarian layanan (halaman /layanan/)
  var q = document.getElementById('cari-layanan');
  var items = document.querySelectorAll('.svc-item');
  var empty = document.getElementById('svc-empty');
  function filter() {
    var term = q.value.trim().toLowerCase();
    var shown = 0;
    items.forEach(function (el) {
      var hit = !term || el.textContent.toLowerCase().indexOf(term) !== -1;
      el.hidden = !hit;
      if (hit) shown++;
    });
    if (empty) empty.style.display = shown ? 'none' : 'block';
  }
  if (q && items.length) {
    var p = new URLSearchParams(location.search).get('q');
    if (p) q.value = p;
    q.addEventListener('input', filter);
    filter();
    if (location.hash) {
      var t = document.querySelector(location.hash);
      if (t && t.tagName === 'DETAILS') t.open = true;
    }
  }

  // Formulir pengaduan demo: tidak mengirim apa pun
  var form = document.getElementById('form-pengaduan');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      form.querySelectorAll('[required]').forEach(function (inp) {
        var f = inp.closest('.field');
        var bad = !inp.value.trim();
        f.classList.toggle('error', bad);
        inp.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (bad) { ok = false; if (!first) first = inp; }
      });
      if (!ok) { first.focus(); return; }
      var r = document.getElementById('form-result');
      r.style.display = 'block';
      r.focus();
      form.reset();
    });
  }
})();
