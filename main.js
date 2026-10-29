// Moon Over Seaville — homepage concept by Astra Productions
// 1) Each episode's fire rises to its level once, as the panel arrives.
// 2) Small-screen menu.
(function () {
  var panels = Array.prototype.slice.call(document.querySelectorAll('.ep'));
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (panels.length) {
    if (!('IntersectionObserver' in window) || reduce) {
      panels.forEach(function (p) { p.classList.add('lit'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('lit');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      panels.forEach(function (p) { io.observe(p); });
    }
  }

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.setAttribute('data-open', String(open));
  }
  toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });
})();
