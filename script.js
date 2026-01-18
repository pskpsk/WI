/* =====================================
   STRICT MOBILE PORTRAIT + DESKTOP MODE BLOCK
   WITH AUTO QR CODE
===================================== */

(function enforceStrictMobileWithQR() {

  const blocker = document.getElementById("device-blocker");
  const title = document.getElementById("blocker-title");
  const text = document.getElementById("blocker-text");
  const qrWrap = document.getElementById("qr-wrap");
  const qrImg = document.getElementById("qr-img");

  // Generate QR once
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

    // ❌ Desktop or Desktop Mode
    if (!isRealMobile()) {
      blocker.style.display = "flex";
      title.textContent = "📱 Open on Mobile";
      text.textContent =
        "We have designed a special immersive experience for you. Please scan the QR code or open this link on your mobile phone in portrait mode.";
      qrWrap.style.display = "block";
      generateQR();
      document.body.style.overflow = "hidden";
      return;
    }

    // 🔄 Mobile landscape
    if (!portrait) {
      blocker.style.display = "flex";
      title.textContent = "🔄 Rotate Your Phone";
      text.textContent =
        "Please rotate your phone to portrait mode to continue.";
      qrWrap.style.display = "none";
      document.body.style.overflow = "hidden";
      return;
    }

    // ✅ Mobile portrait
    blocker.style.display = "none";
    qrWrap.style.display = "none";
    document.body.style.overflow = "";

    // Attempt portrait lock (Android)
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("portrait").catch(() => {});
    }
  }

  check();
  window.addEventListener("resize", check);
  window.addEventListener("orientationchange", check);
  document.addEventListener("visibilitychange", check);

})();
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* --- Preloader + Controlled Animations (Option A: pause while loading) --- */
(function(){
  const MIN_SHOW_MS = 2500;     // minimum visible time in ms
  const MAX_AUTO_HIDE = 10000; // safety fallback in ms
  const preloader = document.getElementById('preloader');
  const body = document.body;
  const start = Date.now();

  // Ensure body has 'loading' to pause animations (HTML already sets it, but ensure)
  if (!body.classList.contains('loading')) body.classList.add('loading');

  // Utility: hide preloader and start page init
  function hidePreloaderAndInit(){
    if(!preloader){
      // still call inits if preloader absent
      body.classList.remove('loading');
      if (typeof initAfterLoad === 'function') initAfterLoad();
      return;
    }

    // Fade out the preloader
    preloader.style.transition = 'opacity 25ms ease';
    preloader.style.opacity = '0';

    // After fade completes, hide and run init
    setTimeout(() => {
      preloader.style.display = 'none';
      preloader.setAttribute('aria-hidden', 'true');

      // Remove loading class so page animations can run
      body.classList.remove('loading');

      // Small staggered reflow to ensure CSS animations start cleanly
      void document.body.offsetWidth;

      // Now call your site's initialization which starts flower fall, sparkles, countdown etc.
      if (typeof initAfterLoad === 'function') initAfterLoad();
    }, 500);
  }

  // When full window load fires (images/fonts/audio), ensure minimum show time then hide
  window.addEventListener('load', () => {
    const elapsed = Date.now() - start;
    const wait = Math.max(0, MIN_SHOW_MS - elapsed);
    setTimeout(hidePreloaderAndInit, wait);
  });

  // Safety fallback in case load never fires
  setTimeout(() => {
    if (preloader && preloader.style.display !== 'none') {
      hidePreloaderAndInit();
    }
  }, MAX_AUTO_HIDE);
})();

/* ------------- Existing site script (kept, unchanged but safe) ------------- */

/* Reveal text after card enters */
function revealTextEffects() {
  setTimeout(() => {
    document.querySelectorAll(".blessing, .invite-text, .muhurtham, .countdown")
      .forEach((el, i) => {
        el.style.animationDelay = (0.3 + i * 0.15) + "s";
      });
  }, 2500);
}

function initAfterLoad(){
  animateIntro();
  wireWishes()
  revealTextEffects();
  generateOrnaments();
  updateCountdown();
  startFallingFlowers();
  generateSparkles();
  setInterval(updateCountdown, 1000);
}

/* Intro animation */
function animateIntro(){
  document.querySelectorAll(".name.main-name").forEach((el,i)=>{
    el.style.opacity=0;
    el.style.transform="translateY(10px)";
    setTimeout(()=>{
      el.style.transition="0.50s";
      el.style.opacity=1;
      el.style.transform="translateY(0)";
    },200+i*150);
  });
}

/* Countdown */
function updateCountdown(){
  const el = $("#countdown-timer");
  const wedding = new Date("Mar 31, 2026 19:32:00").getTime();
  const now = Date.now();
  const diff = wedding-now;

  if(diff<=0){ el.textContent="🎉 Happily Married 🎉"; return; }

  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);

  el.textContent =
    `${String(d).padStart(2,'0')} D : `+
    `${String(h).padStart(2,'0')} H : `+
    `${String(m).padStart(2,'0')} M : `+
    `${String(s).padStart(2,'0')} S`;
}

/* Falling flowers */
function startFallingFlowers(){
  const wrap = $("#falling-flowers");
  const shapes = ["🌸","💮","🌼","💠","❀","✿"];

  function make(){
    const f=document.createElement("div");
    f.className="flower-fall spin"+(1+Math.floor(Math.random()*4));
    f.textContent=shapes[Math.floor(Math.random()*shapes.length)];
    // constrain flowers to central card area (roughly center 75vw)
    f.style.left=(12 + Math.random()*76) + "vw";
    f.style.fontSize=(13+Math.random()*12)+"px";
    wrap.appendChild(f);
    setTimeout(()=>f.remove(),12000);
  }

  setInterval(()=>{ make(); if(Math.random()>0.6) make(); },600);
}

/* Ornaments */
function generateOrnaments(){
  const box=document.querySelector(".ornaments");
  if(!box) return;
  box.innerHTML="";
  for(let i=0;i<3;i++){
    const img=document.createElement("img");
    img.src="ornament.png";
    img.alt = "ornament";
    box.appendChild(img);
  }
}

/* Golden sparkles from bottom */
function generateSparkles(){
  const count=16;
  for(let i=0;i<count;i++){
    const s=document.createElement("div");
    s.className="sparkle";
    s.style.left=(Math.random()*100)+"vw";
    s.style.top=(innerHeight-80+Math.random()*40)+"px";
    const dur=4+Math.random()*3;
    const delay=Math.random()*1.5;
    s.style.animation=`sparkleRise ${dur}s linear ${delay}s forwards`;
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),(dur+delay)*1000+800);
  }
}
setInterval(generateSparkles,4800);

/* Audio toggle */
function toggleAudio(){
  const audio=$("#myAudio");
  const btn=document.querySelector(".floating-button");
  if(!audio) return;
  if(audio.paused){ audio.play().catch(()=>{}); btn.textContent="🔊"; btn.setAttribute('aria-pressed','true'); }
  else{ audio.pause(); btn.textContent="🔇"; btn.setAttribute('aria-pressed','false'); }
}

/* Wishes popup */
function openWishesPopup(){ 
  const p = $("#wishesPopup");
  if(!p) return;
  p.style.display="block"; 
  p.setAttribute('aria-hidden','false');
}
function closeWishesPopup(){ 
  const p = $("#wishesPopup");
  if(!p) return;
  p.style.display="none"; 
  p.setAttribute('aria-hidden','true');
}


function wireWishes() {
    const open = $("#openWishes");
    const close = $("#closePopup");
    const close2 = $("#closePopup2");
    const popup = $("#wishesPopup");
    const form = $("#wishesForm");

    if (open) open.addEventListener('click', ()=> { if (popup) popup.style.display = 'flex'; });
    if (close) close.addEventListener('click', ()=> { if (popup) popup.style.display = 'none'; });
    if (close2) close2.addEventListener('click', ()=> { if (popup) popup.style.display = 'none'; });

    // Reactions wiring (unchanged)
    document.querySelectorAll('.reaction').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const parent = btn.closest('.popup-content');
        if (!parent) return;
        const el = document.createElement('div');
        el.textContent = btn.textContent;
        el.style.position = 'absolute';
        el.style.left = '50%';
        el.style.top = '60%';
        el.style.transform = 'translateX(-50%)';
        el.style.fontSize = '22px';
        parent.appendChild(el);
        el.animate([{transform:'translateY(0)', opacity:1},{transform:'translateY(-80px)', opacity:0}], {duration:900});
        setTimeout(()=> el.remove(), 900);
      });
    });

    // --- NEW: client-side submission using your Apps Script GET endpoint ---
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameEl = document.getElementById('wisherName');
        const msgEl = document.getElementById('wisherMessage');
        const name = nameEl ? nameEl.value.trim() : '';
        const message = msgEl ? msgEl.value.trim() : '';

        if (!name || !message) {
          alert('Please enter name and message.');
          return;
        }

        const thanks = document.getElementById('thanksMessage');
        if (thanks) { thanks.style.display = 'block'; }

        // <-- YOUR APPS SCRIPT URL (from deployment) -->
        const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxDYhoB3inef_tZ1wA4vaHMMNnJofXUw8XszrBSmLSX1eXolNwSXMfuH6Cwp-10ibHa/exec';

        // Build GET URL
        const url = APPS_SCRIPT_URL + '?name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message);

        // Use fetch with no-cors so the browser won't block due to missing CORS headers.
        // The request still reaches Apps Script and the sheet gets appended.
        fetch(url, { method: 'GET', mode: 'no-cors' })
          .catch((err) => {
            console.warn('Send error (this may still succeed server-side):', err);
          });

        // Close popup after brief delay and reset form
        setTimeout(()=> {
          if (popup) popup.style.display = 'none';
          if (thanks) thanks.style.display = 'none';
          form.reset();
        }, 1250);
      });
    }
  }
