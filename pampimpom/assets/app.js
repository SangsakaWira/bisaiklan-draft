(function () {
  var WA = "6289690851310";
  function waUrl(text) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text); }

  // Tautan WA: bangun ulang dari data-wa agar pesan template selalu ter-encode benar
  document.querySelectorAll(".wa-link[data-wa]").forEach(function (a) {
    a.href = waUrl(a.getAttribute("data-wa"));
  });

  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    };
    toggle.addEventListener("click", function () { setOpen(!menu.classList.contains("is-open")); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  // Scroll halus untuk tautan internal (cadangan bila CSS scroll-behavior tidak didukung)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var top = target.getBoundingClientRect().top + window.pageYOffset - 76;
      window.scrollTo({ top: id === "#atas" ? 0 : top, behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });

  // Formulir pesanan (tanpa backend): validasi, status terkirim, lalu tombol kirim ke WA
  var form = document.getElementById("order-form");
  if (form) {
    var err = document.getElementById("form-error");
    var ok = document.getElementById("form-success");
    var summary = document.getElementById("form-summary");
    var waBtn = document.getElementById("form-wa");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nama = form.nama.value.trim();
      var pilihan = form.menu.value;
      var jumlah = parseInt(form.jumlah.value, 10);
      var catatan = form.catatan.value.trim();

      form.nama.setAttribute("aria-invalid", nama ? "false" : "true");
      form.menu.setAttribute("aria-invalid", pilihan ? "false" : "true");
      form.jumlah.setAttribute("aria-invalid", jumlah >= 1 ? "false" : "true");
      if (!nama || !pilihan || !(jumlah >= 1)) {
        err.hidden = false;
        (!nama ? form.nama : !pilihan ? form.menu : form.jumlah).focus();
        return;
      }
      err.hidden = true;

      var pesan = "Halo Pampimpom, saya " + nama + " mau pesan:\n- " + jumlah + "x " + pilihan +
        (catatan ? "\nCatatan: " + catatan : "");
      summary.textContent = jumlah + "x " + pilihan + (catatan ? " · " + catatan : "") +
        ". Tekan tombol di bawah untuk mengirim pesanan ke WhatsApp Pampimpom.";
      waBtn.href = waUrl(pesan);
      form.classList.add("is-sent");
      ok.hidden = false;
      ok.setAttribute("tabindex", "-1");
      ok.focus();
    });

    document.getElementById("form-reset").addEventListener("click", function () {
      form.reset();
      form.classList.remove("is-sent");
      ok.hidden = true;
      form.nama.focus();
    });
  }

  var tahun = document.getElementById("tahun");
  if (tahun) tahun.textContent = new Date().getFullYear();
})();
