
'use strict';
let __storyStarted = false;
/* =====================================
   STRICT MOBILE PORTRAIT + DESKTOP BLOCK
   WITH AUTO QR CODE
===================================== */
(function enforceStrictMobileWithQR() {
   const blocker = document.getElementById("device-blocker");
   const title = document.getElementById("blocker-title");
   const text = document.getElementById("blocker-text");
   const qrWrap = document.getElementById("qr-wrap");
   const qrImg = document.getElementById("qr-img");

   function generateQR() {
      if (!qrImg.src) {
         const url = encodeURIComponent(window.location.href);
         qrImg.src =
            "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + url;
      }
   }

   function isRealMobile() {
      const ua = navigator.userAgent || "";
      const isMobileUA = /Android|iPhone|iPod/i.test(ua);
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isDesktopViewport = window.innerWidth >= 900;
      return isMobileUA && isTouch && !isDesktopViewport;
   }

   function check() {
      const portrait = window.innerHeight > window.innerWidth;

      if (!isRealMobile()) {
         blocker.style.display = "flex";
         title.textContent = "📱 Open on Mobile";
         text.textContent =
            "Please scan the QR code or open this link on a mobile phone in portrait mode.";
         qrWrap.style.display = "block";
         generateQR();
         document.body.style.overflow = "hidden";
         return;
      }

      if (!portrait) {
         blocker.style.display = "flex";
         title.textContent = "🔄 Rotate Your Phone";
         text.textContent = "Please rotate your phone to portrait mode.";
         qrWrap.style.display = "none";
         document.body.style.overflow = "hidden";
         return;
      }

      blocker.style.display = "none";
      qrWrap.style.display = "none";
      document.body.style.overflow = "";

      if (screen.orientation?.lock) {
         screen.orientation.lock("portrait").catch(() => {});
      }
   }

   check();
   window.addEventListener("resize", check);
   window.addEventListener("orientationchange", check);
})();

/* ================= UTILITIES ================= */
const $ = sel => document.querySelector(sel);

/* ================= PRELOADER ================= */
(function () {
   const MIN_SHOW_MS = 2500;
   const MAX_AUTO_HIDE = 10000;
   const preloader = document.getElementById("preloader");
   const body = document.body;
   const start = Date.now();

   if (!body.classList.contains("loading")) body.classList.add("loading");

   function hideAndInit() {
      if (!preloader) {
         body.classList.remove("loading");
         initAfterLoad();
         return;
      }

      preloader.style.opacity = "0";
      setTimeout(() => {
         preloader.style.display = "none";
         preloader.setAttribute("aria-hidden", "true");
         body.classList.remove("loading");
         void body.offsetWidth;
         initAfterLoad();
      }, 500);
   }

   window.addEventListener("load", () => {
      const wait = Math.max(0, MIN_SHOW_MS - (Date.now() - start));
      setTimeout(hideAndInit, wait);
   });

   setTimeout(hideAndInit, MAX_AUTO_HIDE);
})();

/* ================= INIT ================= */
function initAfterLoad() {
   if (document.body.dataset.started) return;
document.body.dataset.started = "1";
   if (__storyStarted) return; // 🔒 BLOCK second run
   __storyStarted = true;

   wireWishes();
   generateOrnaments();
   startCountdown();
   startFallingFlowers();
   startSparkles();
   setTimeout(startRevealStory, 1400);
}

/* ================= COUNTDOWN ================= */
let countdownTimer = null;

function startCountdown(){
  if(countdownTimer) return;
  countdownTimer = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
   const el = $("#countdown-timer");
   if (!el) return;

   const wedding = new Date("Mar 31, 2026 19:32:00").getTime();
   const diff = wedding - Date.now();

   if (diff <= 0) {
      el.textContent = "🎉 Happily Married 🎉";
      clearInterval(countdownTimer);
      countdownTimer = null;
      return;
   }

   const d = Math.floor(diff / 86400000);
   const h = Math.floor((diff % 86400000) / 3600000);
   const m = Math.floor((diff % 3600000) / 60000);
   const s = Math.floor((diff % 60000) / 1000);

   el.textContent =
      `${String(d).padStart(2, "0")} D : ` +
      `${String(h).padStart(2, "0")} H : ` +
      `${String(m).padStart(2, "0")} M : ` +
      `${String(s).padStart(2, "0")} S`;
}
/* ================= FLOWERS ================= */
let flowerTimer = null;

function startFallingFlowers() {
  const wrap = $("#falling-flowers");
  if (!wrap || flowerTimer) return;

  const shapes = ["🌸","💮","🌼","💠","❀","✿"];
  const MAX_FLOWERS = 20;

  flowerTimer = setInterval(() => {
    if (wrap.children.length > MAX_FLOWERS) return;

    const f = document.createElement("div");
    f.className = "flower-fall spin" + (1 + Math.floor(Math.random() * 4));
    f.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    f.style.left = 12 + Math.random() * 76 + "vw";
    f.style.fontSize = 13 + Math.random() * 12 + "px";
    wrap.appendChild(f);
    setTimeout(() => f.remove(), 12000);
  }, 900);
}

function stopFallingFlowers(){
  clearInterval(flowerTimer);
  flowerTimer = null;
}

/* ================= ORNAMENTS ================= */
function generateOrnaments() {
   const box = document.querySelector(".ornaments");
   if (!box) return;

   box.innerHTML = "";
   for (let i = 0; i < 4; i++) {
      const img = document.createElement("img");
      img.src = "ornament.png";
      img.alt = "ornament";
      box.appendChild(img);
   }
}

/* ================= SPARKLES ================= */
function generateSparkles() {
   for (let i = 0; i < 4; i++) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.style.left = Math.random() * 100 + "vw";
      s.style.top = window.innerHeight - 80 + Math.random() * 40 + "px";const dur = 4 + Math.random() * 3;
      const delay = Math.random() * 1.5;
      s.style.animation = `sparkleRise ${dur}s linear ${delay}s forwards`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), (dur + delay) * 1000 + 800);
   }
}
let sparkleTimer = null;

function startSparkles(){
  if(!sparkleTimer){
    sparkleTimer = setInterval(generateSparkles, 4800);
  }
}

function stopSparkles(){
  clearInterval(sparkleTimer);
  sparkleTimer = null;
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopSparkles();
    stopFallingFlowers();
  } else {
    startSparkles();
    startFallingFlowers();
  }
});
/* ================= AUDIO ================= */
function toggleAudio() {
   const audio = $("#myAudio");
   const btn = document.querySelector(".floating-button");
   if (!audio || !btn) return;

   if (audio.paused) {
      audio.play().catch(() => {});
      btn.textContent = "🔊";
      btn.setAttribute("aria-pressed", "true");
   } else {
      audio.pause();
      btn.textContent = "🔇";
      btn.setAttribute("aria-pressed", "false");
   }
}

/* ================= WISHES POPUP ================= */
function openWishesPopup() {
   const p = $("#wishesPopup");
   if (!p) return;
   p.style.display = "block";
   p.setAttribute("aria-hidden", "false");
   document.body.style.overflow = "hidden"; // ✅ add
}

function closeWishesPopup() {
   const p = $("#wishesPopup");
   if (!p) return;
   p.style.display = "none";
   p.setAttribute("aria-hidden", "true");
   document.body.style.overflow = ""; // ✅ add
}
/* ===============================
   Split text into letters
================================ */
function splitLetters(el) {
   if (!el || el.dataset.split === "1") return;

   el.dataset.split = "1";
   const text = el.textContent.trim();
   el.textContent = "";

   [...text].forEach(char => {
      const span = document.createElement("span");
      span.className = "letter";
      span.textContent = char === " " ? "\u00A0" : char;
      el.appendChild(span);
   });
}

/* ===============================
   Animate letters one by one
================================ */
function animateLetters(el, delay = 45) {
   const letters = el.querySelectorAll(".letter");

   letters.forEach((l, i) => {
      setTimeout(() => {
         l.classList.add("show");
         if (i % 2 === 0) glowTrailAt(l); // every 2nd letter
      }, i * delay);
   });
}
/* ===============================
   Swamy Divine Spark (text-bound)
================================ */
function swamySpark(el) {
   const r = el.getBoundingClientRect();
   const count = 10;

   for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "spark-point";

      const x = r.left + Math.random() * r.width;
      const y = r.top + Math.random() * r.height;

      s.style.left = x + "px";
      s.style.top = y + "px";

      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
   }
}
/* ===============================
   Petal burst at element center
================================ */
function petalBurstAt(el) {
   const rect = el.getBoundingClientRect();
   const cx = rect.left + rect.width / 2;
   const cy = rect.top + rect.height / 2;

   const petals = ["🌸", "💮", "🌺", "🌷", "❀"];

   for (let i = 0; i < 14; i++) {
      const p = document.createElement("div");
      p.className = "petal";
      p.textContent = petals[Math.floor(Math.random() * petals.length)];

      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 60;

      p.style.left = cx + "px";
      p.style.top = cy + "px";
      p.style.setProperty("--x", Math.cos(angle) * dist + "px");
      p.style.setProperty("--y", Math.sin(angle) * dist + "px");

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1800);
   }
}

function glowTrailAt(el) {
   const r = el.getBoundingClientRect();
   const cx = r.left + r.width / 2;
   const cy = r.top + r.height / 2;

   const count = 4;
   const curve = 18 + Math.random() * 10;
   const direction = Math.random() > 0.5 ? 1 : -1;

   let lastX = cx;
   let lastY = cy;

   for (let i = 0; i < count; i++) {
      const g = document.createElement("div");
      g.className = "glow-trail";

      const t = i / count;
      const x = cx + (t * 16);
      const y = cy - (t * t * curve * direction);

      lastX = x;
      lastY = y;

      g.style.left = x + "px";
      g.style.top = y + "px";

      document.body.appendChild(g);
      setTimeout(() => g.remove(), 1100);
   }

   /* ✨ Spark points at curve end */
   setTimeout(() => sparkPointsAt(lastX, lastY), 120);
}
/* ===============================
   Spark Points at Curve End
================================ */
function sparkPointsAt(x, y) {
   const sparks = 6 + Math.floor(Math.random() * 4);

   for (let i = 0; i < sparks; i++) {
      const s = document.createElement("div");
      s.className = "spark-point";

      const angle = Math.random() * Math.PI * 2;
      const dist = 6 + Math.random() * 12;

      s.style.left = x + Math.cos(angle) * dist + "px";
      s.style.top = y + Math.sin(angle) * dist + "px";

      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
   }
}
/* ================= STORY REVEAL ================= */
function startRevealStory() {
   const steps = [
      "step-0",
      "balajiload",
      "step-1",
      "step-2",
      "step-3",
      "step-4",
      "step-5",
      "step-6",
      "countdown-timer",
      "footerload",
      "danceload1",
      "danceload2"
   ];

   let index = 0;

   // Reset transitions safely
   const reveals = document.querySelectorAll(".reveal");
reveals.forEach(el => el.style.transition = "none");
requestAnimationFrame(() => {
  reveals.forEach(el => el.style.transition = "");
});

   function revealNext() {
      if (index >= steps.length) return;

      const el = document.getElementById(steps[index++]);
      if (!el) {
         setTimeout(revealNext, 1000);
         return;
      }

      /* 🔹 FIRST: reveal the section */
      el.classList.add("show");
      /* 🔔 Divine Aarti Wave */
      if (el.id === "step-2") {
         el.classList.add("swamy-divine");
      }
      setTimeout(() => {
  document.querySelector(".shimmer-text")?.classList.add("no-shimmer");
}, 4000);
      /* 🔹 SECOND: special handling for names */
      if (el.id === "step-4") {
         const groom = el.querySelector(".groom");
         const heart = el.querySelector(".heart-anim");
         const bride = el.querySelector(".bride");

         // Prepare letter splitting
         splitLetters(groom);
         splitLetters(bride);

         // Groom letters
         setTimeout(() => {
            groom.classList.add("show");
            animateLetters(groom, 55);
         }, 200);

         // Heart
         setTimeout(() => {
            heart.classList.add("show");
         }, 700);

         // Bride letters + petal burst 🌸
         setTimeout(() => {
            bride.classList.add("show");
            animateLetters(bride, 50); // faster, richer glow
            petalBurstAt(bride);
         }, 1200);
      }


      /* 🔹 Dance animation */
      if (el.classList.contains("dance")) {
         setTimeout(() => el.classList.add("dancing"), 950);
      }

      setTimeout(revealNext, 850);
   }

   requestAnimationFrame(() =>
      requestAnimationFrame(revealNext)
   );
}

/* ================= FORM SUBMISSION ================= */
function wireWishes() {
   const form = $("#wishesForm");
   if (!form) return;

   form.addEventListener("submit", e => {
      e.preventDefault();

      const name = $("#wisherName")?.value.trim();
      const message = $("#wisherMessage")?.value.trim();
      if (!name || !message) return alert("Please enter name and message.");

      $("#thanksMessage").style.display = "block";

      const url =
         "https://script.google.com/macros/s/AKfycbxDYhoB3inef_tZ1wA4vaHMMNnJofXUw8XszrBSmLSX1eXolNwSXMfuH6Cwp-10ibHa/exec" +
         "?name=" + encodeURIComponent(name) +
         "&message=" + encodeURIComponent(message);

      fetch(url, {
         method: "GET",
         mode: "no-cors"
      }).catch(() => {});

      setTimeout(() => {
         closeWishesPopup();
         $("#thanksMessage").style.display = "none";
         form.reset();
      }, 1250);
   });
}