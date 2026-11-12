(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');

  // ---------- language ----------
  function setLang(lang) {
    root.setAttribute('data-ui-lang', lang);
    root.setAttribute('lang', lang);
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === lang));
    });
    document.querySelectorAll('[data-href-en]').forEach(function (a) {
      a.setAttribute('href', a.getAttribute('data-href-' + lang) || a.getAttribute('data-href-en'));
    });
    var t = document.querySelector('meta[name="title-' + lang + '"]');
    if (t) document.title = t.getAttribute('content');
    try { localStorage.setItem('lang', lang); } catch (e) { /* storage blocked */ }
  }
  document.querySelectorAll('.lang-toggle button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.set); });
  });
  setLang(root.getAttribute('data-ui-lang') || 'en');

  // ---------- mobile menu ----------
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  // ---------- reveal on scroll ----------
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
