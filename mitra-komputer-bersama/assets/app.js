(function () {
  var WA = "6285899731884";

  // Menu mobile
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Buka menu");
      }
    });
  }

  // Scroll halus untuk tautan internal
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  var tahun = document.getElementById("tahun");
  if (tahun) tahun.textContent = new Date().getFullYear();

  // Alur pembayaran (pratinjau, tanpa backend)
  var checkout = document.getElementById("checkout");
  if (checkout) {
    var panes = checkout.querySelectorAll(".pane");
    var steps = checkout.querySelectorAll(".progress li");
    var go = function (n) {
      panes.forEach(function (p) { p.hidden = p.getAttribute("data-pane") !== String(n); });
      steps.forEach(function (s) { s.classList.toggle("active", Number(s.getAttribute("data-step")) <= n); });
      if (n === 3) {
        var metode = checkout.querySelector('input[name="metode"]:checked').value;
        checkout.querySelectorAll("[data-method]").forEach(function (m) {
          m.hidden = m.getAttribute("data-method") !== metode;
        });
      }
    };
    checkout.addEventListener("click", function (e) {
      var b = e.target.closest("[data-go]");
      if (b) go(Number(b.getAttribute("data-go")));
    });
    drawQr(document.getElementById("qr"));
  }

  // Gambar pola QR dekoratif untuk pratinjau (bukan kode pembayaran asli)
  function drawQr(canvas) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var n = canvas.width;
    var seed = 2026;
    var rand = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, n, n);
    ctx.fillStyle = "#142D4E";
    for (var y = 0; y < n; y++) {
      for (var x = 0; x < n; x++) {
        if (rand() > 0.52) ctx.fillRect(x, y, 1, 1);
      }
    }
    [[0, 0], [n - 7, 0], [0, n - 7]].forEach(function (p) {
      ctx.fillStyle = "#fff"; ctx.fillRect(p[0] - 1, p[1] - 1, 9, 9);
      ctx.fillStyle = "#142D4E"; ctx.fillRect(p[0], p[1], 7, 7);
      ctx.fillStyle = "#fff"; ctx.fillRect(p[0] + 1, p[1] + 1, 5, 5);
      ctx.fillStyle = "#009B8D"; ctx.fillRect(p[0] + 2, p[1] + 2, 3, 3);
    });
  }

  // Formulir: tampilkan status terkirim, tawarkan lanjut ke WhatsApp
  var form = document.getElementById("form-konsultasi");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (!form.checkValidity()) {
        status.textContent = "Mohon lengkapi nama, nomor WhatsApp, dan kebutuhan Anda.";
        status.classList.add("show");
        var invalid = form.querySelector(":invalid");
        if (invalid) invalid.focus();
        return;
      }
      var d = new FormData(form);
      var teks = "Halo Mitra Komputer Bersama, saya " + d.get("nama") +
        ". Saya mencari " + d.get("jenis").toLowerCase() +
        (d.get("anggaran") ? " dengan anggaran " + d.get("anggaran") : "") +
        ". Kebutuhan: " + d.get("pesan");
      status.innerHTML = "";
      status.appendChild(document.createTextNode("Terima kasih, " + d.get("nama") + "! Permintaan Anda sudah terkirim. Kami akan menghubungi Anda lewat WhatsApp. Ingin lebih cepat? "));
      var link = document.createElement("a");
      link.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(teks);
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Lanjutkan di WhatsApp";
      status.appendChild(link);
      status.classList.add("show");
      form.reset();
    });
  }
})();
