// Chessboxing promo site: mobile menu, screenshot lightbox, scroll reveal.
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Screenshot lightbox
  var box = document.getElementById("lightbox");
  var img = document.getElementById("lb-img");
  var cap = document.getElementById("lb-cap");
  if (box && typeof box.showModal === "function") {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".shot-btn");
      if (btn) {
        img.src = btn.dataset.full;
        img.alt = btn.querySelector("img").alt;
        cap.textContent = btn.dataset.caption;
        box.showModal();
      } else if (e.target === box) {
        box.close(); // click on the backdrop
      }
    });
  }

  // Finale: crown either of the two playable champions at random
  var champ = document.querySelector(".finale-art img[data-alt-src]");
  if (champ && Math.random() < 0.5) {
    var other = champ.getAttribute("data-alt-src");
    champ.setAttribute("data-alt-src", champ.getAttribute("src"));
    champ.setAttribute("src", other);
  }

  // Fade sections in as they scroll into view
  var targets = document.querySelectorAll(".steps li, .preset, .level-block, .controls, .mechanics, .stats-explain, .ramp-block, .boxer, .gallery .shot");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { t.classList.add("reveal"); io.observe(t); });
  }
})();
