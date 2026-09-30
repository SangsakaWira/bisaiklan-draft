(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('menu');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var firstBad = null;
      form.querySelectorAll('input[required],select[required],textarea[required]').forEach(function (f) {
        var err = f.nextElementSibling;
        var bad = !f.value.trim();
        f.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (err && err.classList.contains('err')) err.hidden = !bad;
        if (bad) { ok = false; if (!firstBad) firstBad = f; }
      });
      var msg = form.querySelector('.ok');
      if (!ok) { if (msg) msg.hidden = true; if (firstBad) firstBad.focus(); return; }
      form.querySelectorAll('input,select,textarea').forEach(function (f) { f.value = ''; });
      if (msg) { msg.hidden = false; }
    });
  });
})();
