/* ============================================================
   FIRST CHOICE AUTO HAIL - script.js
   ============================================================ */

/* ---------- Active nav state ---------- */
(function () {
  var page = document.body.getAttribute('data-page');
  if (!page) return;
  document.querySelectorAll('[data-nav]').forEach(function (link) {
    if (link.getAttribute('data-nav') === page) link.classList.add('is-active');
  });
})();

/* ---------- Hamburger / mobile menu (own IIFE) ---------- */
(function () {
  var body = document.body;
  var btn = document.querySelector('.hamburger');
  var backdrop = document.querySelector('.nav-backdrop');
  if (!btn) return;

  function open() { body.classList.add('nav-open'); btn.setAttribute('aria-expanded', 'true'); }
  function close() { body.classList.remove('nav-open'); btn.setAttribute('aria-expanded', 'false'); }
  function toggle() { body.classList.contains('nav-open') ? close() : open(); }

  btn.addEventListener('click', toggle);
  if (backdrop) backdrop.addEventListener('click', close);
  document.querySelectorAll('.mobile-menu a').forEach(function (a) {
    a.addEventListener('click', close);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 900) close(); });
})();

/* ---------- Formspree AJAX submit (own IIFE) ---------- */
(function () {
  var form = document.querySelector('form[data-formspree]');
  if (!form) return;
  var status = form.querySelector('.form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // honeypot: if filled, silently drop
    var hp = form.querySelector('input[name="_gotcha"]');
    if (hp && hp.value) return;

    if (status) { status.textContent = 'Sending...'; }
    var data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (res) {
      if (res.ok) {
        window.location.href = 'thank-you.html';
      } else {
        if (status) status.textContent = 'Something went wrong. Please call us at (469) 288-2639.';
      }
    }).catch(function () {
      if (status) status.textContent = 'Something went wrong. Please call us at (469) 288-2639.';
    });
  });
})();