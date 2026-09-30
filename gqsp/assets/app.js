(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  // Demo forms: validate, never send
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  document.querySelectorAll('form.js-demo').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var firstBad = null;
      form.querySelectorAll('[required]').forEach(function (f) {
        var bad = !f.value.trim() || (f.type === 'email' && !emailRe.test(f.value.trim()));
        f.setAttribute('aria-invalid', bad ? 'true' : 'false');
        var id = f.id + '-err';
        var msg = document.getElementById(id);
        if (bad) {
          if (!msg) {
            msg = document.createElement('p');
            msg.className = 'err';
            msg.id = id;
            (f.closest('.nl-row') || f).insertAdjacentElement('afterend', msg);
          }
          msg.textContent = f.getAttribute('data-err');
          f.setAttribute('aria-describedby', id);
          if (!firstBad) firstBad = f;
        } else if (msg) {
          msg.remove();
          f.removeAttribute('aria-describedby');
        }
      });
      var ok = form.querySelector('.ok');
      if (firstBad) {
        ok.hidden = true;
        firstBad.focus();
        return;
      }
      ok.textContent = form.getAttribute('data-ok');
      ok.hidden = false;
      form.reset();
    });
  });

  // Listing filters
  var filters = document.querySelector('.filters');
  if (filters) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.list .card'));
    var chips = Array.prototype.slice.call(filters.querySelectorAll('.chip'));
    var q = document.getElementById('q');
    var count = filters.querySelector('.count');
    var empty = document.querySelector('.empty');
    var tpl = filters.getAttribute('data-results');
    var kind = '';
    var apply = function () {
      var term = q.value.trim().toLowerCase();
      var n = 0;
      cards.forEach(function (c) {
        var show = (!kind || c.getAttribute('data-kind') === kind) && (!term || c.getAttribute('data-q').indexOf(term) > -1);
        c.hidden = !show;
        if (show) n++;
      });
      count.textContent = tpl.replace('{n}', n);
      empty.hidden = n > 0;
    };
    chips.forEach(function (ch) {
      ch.addEventListener('click', function () {
        kind = ch.getAttribute('data-k');
        chips.forEach(function (o) { o.setAttribute('aria-pressed', o === ch ? 'true' : 'false'); });
        apply();
      });
    });
    q.addEventListener('input', apply);
    empty.querySelector('.reset').addEventListener('click', function () {
      q.value = '';
      chips[0].click();
      q.focus();
    });
    var params = new URLSearchParams(location.search);
    if (params.get('k')) {
      var pre = filters.querySelector('.chip[data-k="' + params.get('k') + '"]');
      if (pre) pre.click();
    }
    apply();
  }
})();
