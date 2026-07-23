// WhatsApp links
const phone = "5548991843136";
function waLink(msg){ return "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg); }

document.getElementById('nav-whats').href = waLink("Olá Fabyana, gostaria de saber mais sobre seus planos de personal trainer.");
document.getElementById('hero-whats').href = waLink("Olá Fabyana, gostaria de saber mais sobre seus planos de personal trainer.");
document.getElementById('contact-whats').href = waLink("Olá Fabyana, gostaria de saber mais sobre seus planos de personal trainer.");

document.querySelectorAll('.plan-btn').forEach(btn=>{
  const plan = btn.getAttribute('data-plan');
  btn.href = waLink("Olá Fabyana, tenho interesse no plano de Personal Trainer " + plan + ". Gostaria de saber mais informações.");
});

document.querySelectorAll('.product-btn').forEach(btn=>{
  const prod = btn.getAttribute('data-product');
  btn.href = waLink("Olá Fabyana, tenho interesse no produto " + prod + ". Gostaria de saber mais informações e como posso comprar.");
});

// mobile menu
const toggle = document.getElementById('mobileToggle');
const navUl = document.querySelector('nav ul');
toggle.addEventListener('click', ()=>{
  const open = navUl.style.display === 'flex';
  if(open){
    navUl.style.display = 'none';
  } else {
    navUl.style.cssText = 'display:flex;position:fixed;top:0;left:0;right:0;bottom:0;background:#08080aee;flex-direction:column;align-items:center;justify-content:center;gap:34px;z-index:99;';
    navUl.querySelectorAll('a').forEach(a=>{a.style.fontSize='20px';});
  }
});
document.querySelectorAll('nav a').forEach(a=>{
  a.addEventListener('click', ()=>{ if(window.innerWidth<=980){ navUl.style.display='none'; } });
});

// header shrink
const header = document.getElementById('site-header');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 40){ header.style.padding = '12px 0'; header.style.background='rgba(8,8,10,0.85)'; }
  else { header.style.padding = '20px 0'; header.style.background='rgba(8,8,10,0.55)'; }
});

// reveal on scroll
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
  });
}, {threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));