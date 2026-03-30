(function () {
  var STORAGE_KEY = "nf-theme";
  var ATTR = "data-theme";
  var LIGHT = "light";
  var DARK = "dark";
  var META_COLOR = { light: "#f3f3f3", dark: "#000000" };
  var MQ_LIGHT = "(prefers-color-scheme: light)";

  function storedOrNull() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === LIGHT || v === DARK) return v;
    } catch (_) {}
    return null;
  }

  function systemTheme() {
    return matchMedia(MQ_LIGHT).matches ? LIGHT : DARK;
  }

  function effectiveTheme() {
    return storedOrNull() || systemTheme();
  }

  function apply(theme, persist) {
    if (theme !== LIGHT && theme !== DARK) theme = DARK;
    document.documentElement.setAttribute(ATTR, theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", META_COLOR[theme]);
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (_) {}
    }
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var isLight = theme === LIGHT;
    btn.setAttribute("aria-pressed", isLight ? "false" : "true");
    btn.setAttribute(
      "aria-label",
      isLight ? "Ativar modo escuro" : "Ativar modo claro"
    );
    var sun = btn.querySelector('[data-theme-icon="sun"]');
    var moon = btn.querySelector('[data-theme-icon="moon"]');
    var hidden = "theme-toggle__icon--hidden";
    if (sun && moon) {
      sun.classList.toggle(hidden, isLight);
      moon.classList.toggle(hidden, !isLight);
    }
  }

  function toggle() {
    var cur = document.documentElement.getAttribute(ATTR) || DARK;
    apply(cur === LIGHT ? DARK : LIGHT, true);
  }

  function init() {
    apply(effectiveTheme(), false);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", toggle);
    matchMedia(MQ_LIGHT).addEventListener("change", function (e) {
      if (storedOrNull() !== null) return;
      apply(e.matches ? LIGHT : DARK, false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
