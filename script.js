// current year
document.getElementById('year').textContent = new Date().getFullYear();

// preloader
window.addEventListener('load', () => {
  setTimeout(()=>{
    document.getElementById('preloader').classList.add('hide');
  }, 500);
});

// header scroll state
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// mobile menu
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('menuOverlay');
function closeMenu(){ mobileMenu.classList.remove('open'); overlay.classList.remove('open'); }
burger.addEventListener('click', ()=>{ mobileMenu.classList.add('open'); overlay.classList.add('open'); });
overlay.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeMenu));

// WhatsApp links
const WA_NUMBER = "5548991843136";
const DEFAULT_MSG = "Olá! Vi seu site e gostaria de saber mais sobre os planos de Personal Trainer.";
document.querySelectorAll('.wa-link').forEach(el=>{
  el.addEventListener('click', (e)=>{
    e.preventDefault();
    const msg = el.getAttribute('data-msg') || DEFAULT_MSG;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
});

// orb parallax
const orb = document.getElementById('orb');
if(window.matchMedia('(min-width:981px)').matches){
  document.addEventListener('mousemove', (e)=>{
    const x = (e.clientX / window.innerWidth - .5) * 16;
    const y = (e.clientY / window.innerHeight - .5) * 16;
    orb.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  });
}

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
  });
}, {threshold:.15});
revealEls.forEach(el=>io.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>{
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// testimonial carousel
const slides = document.querySelectorAll('.testi-slide');
const dotsWrap = document.getElementById('testiDots');
let current = 0;
slides.forEach((_,i)=>{
  const dot = document.createElement('button');
  if(i===0) dot.classList.add('active');
  dot.addEventListener('click', ()=>goTo(i));
  dotsWrap.appendChild(dot);
});
function goTo(i){
  slides[current].classList.remove('active');
  dotsWrap.children[current].classList.remove('active');
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
  dotsWrap.children[current].classList.add('active');
}
document.getElementById('testiPrev').addEventListener('click', ()=>goTo(current-1));
document.getElementById('testiNext').addEventListener('click', ()=>goTo(current+1));
setInterval(()=>goTo(current+1), 6000);

// respect reduced motion preference
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// animated stat counters (start only when visible)
const counters = document.querySelectorAll('.counter');
function animateCounter(el){
  const target = parseInt(el.dataset.count, 10) || 0;
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  if(reduceMotion){
    el.textContent = prefix + target + suffix;
    return;
  }
  const duration = 1400;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = prefix + value + suffix;
    if(progress < 1){ requestAnimationFrame(tick); }
  }
  requestAnimationFrame(tick);
}
if(counters.length){
  const counterIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        animateCounter(entry.target);
        counterIO.unobserve(entry.target);
      }
    });
  }, {threshold:.4});
  counters.forEach(c=>counterIO.observe(c));
}

// ripple effect on primary buttons
const rippleTargets = document.querySelectorAll('.btn-primary, .btn-ghost, .btn-block, .plan-btn, .nav-cta');
rippleTargets.forEach(btn=>{
  btn.classList.add('ripple-host');
  btn.addEventListener('click', (e)=>{
    if(reduceMotion) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', ()=>ripple.remove());
  });
});

// subtle scroll parallax on select images
const parallaxEls = document.querySelectorAll('.parallax-img');
if(parallaxEls.length && !reduceMotion){
  const parallaxVisible = new Set();
  const pIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) parallaxVisible.add(entry.target);
      else parallaxVisible.delete(entry.target);
    });
  }, {threshold:0});
  parallaxEls.forEach(el=>pIO.observe(el));

  let ticking = false;
  function updateParallax(){
    parallaxVisible.forEach(el=>{
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-14, Math.min(14, center * -0.04));
      el.style.setProperty('--py', offset + 'px');
    });
    ticking = false;
  }
  window.addEventListener('scroll', ()=>{
    if(!ticking){ requestAnimationFrame(updateParallax); ticking = true; }
  }, {passive:true});
}

// smooth anchor scroll offset (for fixed header)
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    const id = this.getAttribute('href');
    if(id.length>1 && document.querySelector(id)){
      e.preventDefault();
      const target = document.querySelector(id);
      const offset = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({top:offset, behavior:'smooth'});
      closeMenu();
    }
  });
});