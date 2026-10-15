(function () {
  var WA = '6280000000000';
  function waLink(msg) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg); }

  // Tombol WhatsApp dengan pesan template
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.href = waLink(el.getAttribute('data-wa'));
    el.target = '_blank';
    el.rel = 'noopener';
  });

  // Menu mobile
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Tab harga
  var tabs = document.querySelectorAll('[role=tab]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on);
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  // Formulir -> WhatsApp
  var form = document.getElementById('form-pesan');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var err = document.getElementById('form-err');
    if (!f.layanan.value || !f.nama.value.trim() || !f.area.value) { err.hidden = false; return; }
    err.hidden = true;
    var tgl = f.tanggal.value ? new Date(f.tanggal.value).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'fleksibel';
    var msg = 'Halo Shadowtrois, saya mau pesan:\n' +
      '• Layanan: ' + f.layanan.value + '\n' +
      '• Nama: ' + f.nama.value.trim() + '\n' +
      '• Kecamatan: ' + f.area.value + '\n' +
      '• Tanggal: ' + tgl +
      (f.detail.value.trim() ? '\n• Detail: ' + f.detail.value.trim() : '');
    window.open(waLink(msg), '_blank', 'noopener');
    document.getElementById('form-done').hidden = false;
  });
})();
