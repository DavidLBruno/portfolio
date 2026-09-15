// Applies the saved theme before Angular boots so there is no flash of the
// wrong theme. Kept as an external file so the CSP can stay `script-src 'self'`.
(function () {
  try {
    var theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add('theme-' + theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0a0a0f');
    var lang = localStorage.getItem('lan') === 'en' ? 'en' : 'es';
    document.documentElement.lang = lang;
  } catch (e) {
    /* storage unavailable: keep the defaults */
  }
})();
