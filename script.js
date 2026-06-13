// script.js
document.addEventListener('DOMContentLoaded',()=>{
  const menuToggle=document.getElementById('menuToggle');
  const navMenu=document.getElementById('navMenu');
  if(menuToggle){menuToggle.addEventListener('click',()=>navMenu.classList.toggle('open'))}
  
  // FAQ
  document.querySelectorAll('.faq-question').forEach(q=>{
    q.addEventListener('click',()=>{
      const item=q.parentElement;
      item.classList.toggle('active');
      const icon=q.querySelector('i');
      if(icon){icon.classList.toggle('fa-plus');icon.classList.toggle('fa-minus')}
    })
  });
  
  // Back to top
  const backBtn=document.getElementById('backToTop');
  window.addEventListener('scroll',()=>{
    if(window.scrollY>400){backBtn?.classList.add('show')}else{backBtn?.classList.remove('show')}
  });
  backBtn?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  
  // Tracking
  document.addEventListener('click',e=>{
    const a=e.target.closest('a');
    if(!a)return;
    if(a.href.startsWith('tel:') && typeof gtag!=='undefined') gtag('event','conversion',{'send_to':'AW-CALL'});
    if(a.href.includes('wa.me') && typeof gtag!=='undefined') gtag('event','conversion',{'send_to':'AW-WA'});
  });
});
