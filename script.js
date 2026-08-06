 // ==================== WHATSAPP ====================
const phone = "5548991843136";
function waLink(msg) {
  return "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);
}

// Qualquer link com atributo data-msg vira automaticamente um link de WhatsApp.
// Cobre o botão do menu, hero, cards de planos/produtos e banners de CTA em todas as páginas.
document.querySelectorAll('a[data-msg]').forEach(function (el) {
  el.href = waLink(el.getAttribute('data-msg'));
});

// ==================== MENU MOBILE ====================
const toggle = document.getElementById('mobileToggle');
const navUl = document.querySelector('nav ul');
if (toggle && navUl) {
  toggle.addEventListener('click', () => {
    const open = navUl.style.display === 'flex';
    if (open) {
      navUl.style.display = 'none';
    } else {
      navUl.style.cssText = 'display:flex;position:fixed;top:0;left:0;right:0;bottom:0;background:#08080aee;flex-direction:column;align-items:center;justify-content:center;gap:34px;z-index:99;';
      navUl.querySelectorAll('a').forEach((a) => { a.style.fontSize = '20px'; });
    }
  });
  document.querySelectorAll('nav a').forEach((a) => {
    a.addEventListener('click', () => { if (window.innerWidth <= 980) { navUl.style.display = 'none'; } });
  });
}

// ==================== HEADER AO ROLAR ====================
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.padding = '12px 0';
      header.style.background = 'rgba(8,8,10,0.85)';
    } else {
      header.style.padding = '20px 0';
      header.style.background = 'rgba(8,8,10,0.55)';
    }
  });
}

// ==================== REVEAL AO ROLAR ====================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ==================== TRANSIÇÃO SUAVE ENTRE PÁGINAS ====================
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // ignora âncoras, links externos, WhatsApp/Instagram e links que abrem em nova aba
    const isInternalPage = /\.html($|#)/.test(href) || href === 'index.html';
    if (!isInternalPage) return;
    if (link.target === '_blank') return;
    if (href.startsWith('http')) return;

    e.preventDefault();

    if (reduceMotion) {
      window.location.href = href;
      return;
    }

    document.body.classList.add('page-leaving');
    setTimeout(() => { window.location.href = href; }, 300);
  });
})();