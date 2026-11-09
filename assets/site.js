'use strict';

// Redirect to this checkout after visitor fills the form
const CONFIG = Object.freeze({
  CHECKOUT_URL: 'https://pay.lowify.com.br/checkout.php?product_id=fCjFAD',
  GA4_ID: '',
  GADS_ID: ''
});

const SAMPLES = Object.freeze([
  {src:'assets/amostra-geometria-espacial.webp',title:'Geometria espacial',alt:'Página de Geometria espacial com fórmulas e diagramas de volumes de sólidos',caption:'Fórmulas de volume para prismas, cilindros, pirâmides e cones.'},
  {src:'assets/amostra-funcao-quadratica.webp',title:'Função quadrática',alt:'Página de Função quadrática com raízes, concavidade da parábola e coordenadas do vértice',caption:'Raízes, concavidade da parábola e coordenadas do vértice.'},
  {src:'assets/amostra-volume-esfera.webp',title:'Esfera e planificação',alt:'Página com volume da esfera e representações de planificação de sólidos',caption:'Volume da esfera e visualização das faces de sólidos planificados.'}
]);

const bookMotionToggle=document.querySelector('.book-motion-toggle');
bookMotionToggle?.addEventListener('click',()=>{
  const paused=bookMotionToggle.getAttribute('aria-pressed')!=='true';
  bookMotionToggle.setAttribute('aria-pressed',String(paused));
  bookMotionToggle.closest('.hero-product').classList.toggle('is-paused',paused);
  bookMotionToggle.querySelector('.book-motion-label').textContent=paused?'Retomar movimento':'Pausar movimento';
  bookMotionToggle.querySelector('[aria-hidden]').textContent=paused?'▷':'Ⅱ';
});

function trackEvent(name,params={}) {
  if(typeof window.gtag === 'function') window.gtag('event',name,params);
  window.dispatchEvent(new CustomEvent('retafinal:event',{detail:{name,...params}}));
}

if(CONFIG.GA4_ID) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){window.dataLayer.push(arguments);};
  window.gtag('js',new Date());
  window.gtag('config',CONFIG.GA4_ID);
  if(CONFIG.GADS_ID) window.gtag('config',CONFIG.GADS_ID);
  const script=document.createElement('script');
  script.async=true;
  script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(CONFIG.GA4_ID);
  document.head.append(script);
}

const campaignKeys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'];
const incoming=new URLSearchParams(window.location.search);
const leadForm=document.getElementById('lead-form');
const leadStatus=document.getElementById('lead-status');
const leadSubmit=leadForm?.querySelector('button[type="submit"]');
const phoneInput=document.getElementById('lead-phone');

// Máscara automática de telefone para formato brasileiro: (XX) 9XXXX-XXXX
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      e.target.value = `(${value}`;
    }
  });
}

// Intercepta e processa o envio do formulário de compra direta
if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!leadForm.reportValidity()) return;

    const formData = new FormData(leadForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const rawPhone = String(formData.get('whatsapp') || '').trim();
    const phone = rawPhone.replace(/\D/g, '');

    if (phone.length < 10 || phone.length > 11) {
      if (leadStatus) leadStatus.textContent = 'Por favor, informe seu WhatsApp completo com DDD.';
      phoneInput?.focus();
      return;
    }

    // Feedback imediato no botão
    if (leadSubmit) {
      leadSubmit.disabled = true;
      leadSubmit.innerHTML = 'REDIRECIONANDO PARA O CHECKOUT... <span aria-hidden="true">⏳</span>';
    }
    if (leadStatus) {
      leadStatus.textContent = 'Aguarde um instante, preparando seu pagamento com desconto...';
    }

    const eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

    // 1. Disparo de Conversão Meta Pixel (Lead + InitiateCheckout)
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: 'Reta Final ENEM 2026 — Matemática',
        content_category: 'Material Digital',
        value: 19.90,
        currency: 'BRL'
      }, { eventID: eventId });

      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Reta Final ENEM 2026 — Matemática',
        content_category: 'Material Digital',
        value: 19.90,
        currency: 'BRL',
        num_items: 1
      });
    }

    // 2. Disparo de Analytics
    trackEvent('lead_submit', { location: 'offer', offer: 'black_friday_antecipada' });
    trackEvent('begin_checkout', {
      value: 19.90,
      currency: 'BRL',
      items: [{ item_name: 'Reta Final ENEM 2026 — Matemática', price: 19.90 }]
    });

    // 3. Captura resiliente de lead (LocalStorage + envio silencioso em background)
    const payload = Object.fromEntries(formData.entries());
    payload.whatsapp = phone;
    campaignKeys.forEach(key => {
      if (incoming.has(key)) payload[key] = String(incoming.get(key)).slice(0, 160);
    });

    try {
      localStorage.setItem('enem_last_buyer', JSON.stringify({
        name,
        email,
        phone,
        date: new Date().toISOString()
      }));

      const bodyData = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        const blob = new Blob([bodyData], { type: 'application/json' });
        navigator.sendBeacon(leadForm.action, blob);
      } else {
        fetch(leadForm.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: bodyData,
          keepalive: true
        }).catch(() => {});
      }
    } catch (e) {
      console.debug('[Lead capture]', e);
    }

    // 4. Montagem da URL de checkout com preenchimento automático para Lowify
    let checkoutTarget = CONFIG.CHECKOUT_URL;
    try {
      const url = new URL(checkoutTarget);
      url.searchParams.set('name', name);
      url.searchParams.set('email', email);
      url.searchParams.set('whatsapp', phone);
      url.searchParams.set('phone', phone);
      url.searchParams.set('telefone', phone);
      url.searchParams.set('tel', phone);
      url.searchParams.set('nome', name);

      campaignKeys.forEach(key => {
        if (incoming.has(key)) url.searchParams.set(key, incoming.get(key));
      });
      if (incoming.has('utm_source')) {
        url.searchParams.set('src', incoming.get('utm_source'));
      }
      checkoutTarget = url.toString();
    } catch (e) {
      checkoutTarget = CONFIG.CHECKOUT_URL;
    }

    // 5. Redirecionamento fluido para o checkout
    setTimeout(() => {
      window.location.href = checkoutTarget;
    }, 200);
  });
}

// Rolagem suave e foco no formulário para todos os botões que apontam para #oferta
document.querySelectorAll('a[href="#oferta"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const offerSection = document.getElementById('oferta');
    if (offerSection) {
      e.preventDefault();
      offerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        document.getElementById('lead-name')?.focus();
      }, 500);
    }
  });
});

const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.getElementById('mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')!=='true';
  mobileNav.hidden=!open;
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!mobileNav.hidden&&!event.target.closest('.site-header'))closeMenu();});
const mobileMedia=window.matchMedia('(max-width:699px)');
mobileMedia.addEventListener('change',()=>{if(!mobileMedia.matches)closeMenu();updatePurchaseBar();});

const tabs=[...document.querySelectorAll('[data-sample]')];
const previewImage=document.getElementById('preview-image');
const previewButton=document.getElementById('open-preview');
const panel=document.getElementById('sample-panel');
const dialog=document.getElementById('sample-dialog');
const dialogImage=document.getElementById('dialog-image');
const dialogArea=document.querySelector('.dialog-image-area');
const zoomButton=document.getElementById('zoom-sample');
let selectedSample=0;

function setZoom(zoomed){
  dialogArea.classList.toggle('is-zoomed',zoomed);
  zoomButton.setAttribute('aria-pressed',String(zoomed));
  zoomButton.textContent=zoomed?'Ajustar à tela −':'Ampliar leitura +';
  dialogArea.scrollTop=0;
  dialogArea.scrollLeft=0;
}
function selectSample(index,{focus=false,report=false}={}) {
  selectedSample=(index+SAMPLES.length)%SAMPLES.length;
  const sample=SAMPLES[selectedSample];
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===selectedSample));tab.tabIndex=i===selectedSample?0:-1;});
  panel.setAttribute('aria-labelledby',tabs[selectedSample].id);
  previewImage.src=sample.src;previewImage.alt=sample.alt;
  previewButton.setAttribute('aria-label','Ampliar amostra de '+sample.title);
  document.getElementById('preview-caption').textContent=sample.caption;
  const count=String(selectedSample+1).padStart(2,'0')+' / 03';
  document.getElementById('preview-counter').textContent=count;
  dialogImage.src=sample.src;dialogImage.alt=sample.alt;
  document.getElementById('dialog-counter').textContent=count;
  document.getElementById('dialog-title').textContent=sample.title;
  setZoom(false);
  if(focus)tabs[selectedSample].focus();
  if(report)trackEvent('sample_select',{sample_title:sample.title,sample_index:selectedSample+1});
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectSample(index,{report:true}));
  tab.addEventListener('keydown',event=>{
    let index;
    if(event.key==='ArrowDown'||event.key==='ArrowRight')index=selectedSample+1;
    if(event.key==='ArrowUp'||event.key==='ArrowLeft')index=selectedSample-1;
    if(event.key==='Home')index=0;
    if(event.key==='End')index=SAMPLES.length-1;
    if(index!==undefined){event.preventDefault();selectSample(index,{focus:true,report:true});}
  });
});
previewButton.addEventListener('click',()=>{
  selectSample(selectedSample);
  dialog.showModal();
  document.body.classList.add('dialog-open');
  document.getElementById('close-dialog').focus();
  updatePurchaseBar();
  trackEvent('sample_open',{sample_title:SAMPLES[selectedSample].title,sample_index:selectedSample+1});
});
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');setZoom(false);updatePurchaseBar();previewButton.focus({preventScroll:true});});
document.getElementById('previous-sample').addEventListener('click',()=>selectSample(selectedSample-1,{report:true}));
document.getElementById('next-sample').addEventListener('click',()=>selectSample(selectedSample+1,{report:true}));
zoomButton.addEventListener('click',()=>setZoom(zoomButton.getAttribute('aria-pressed')!=='true'));
dialog.addEventListener('keydown',event=>{
  if(zoomButton.getAttribute('aria-pressed')==='true')return;
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();selectSample(selectedSample+(event.key==='ArrowRight'?1:-1),{report:true});}
});
let touchStart;
dialogArea.addEventListener('touchstart',event=>{const touch=event.changedTouches[0];touchStart={x:touch.clientX,y:touch.clientY};},{passive:true});
dialogArea.addEventListener('touchend',event=>{
  if(!touchStart||zoomButton.getAttribute('aria-pressed')==='true')return;
  const touch=event.changedTouches[0],dx=touch.clientX-touchStart.x,dy=touch.clientY-touchStart.y;
  if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)selectSample(selectedSample+(dx<0?1:-1),{report:true});
  touchStart=null;
},{passive:true});

const purchaseBar=document.querySelector('.mobile-purchase');
const offer=document.getElementById('oferta');
const hero=document.querySelector('.hero');
const footer=document.querySelector('.site-footer');
let heroPassed=false,offerVisible=false,footerVisible=false,offerReported=false;
function updatePurchaseBar(){
  const visible=mobileMedia.matches&&heroPassed&&!offerVisible&&!footerVisible&&!dialog.open;
  purchaseBar.hidden=!visible;
}
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.target===hero)heroPassed=!entry.isIntersecting&&entry.boundingClientRect.bottom<0;
      if(entry.target===offer){offerVisible=entry.isIntersecting;if(offerVisible&&!offerReported){trackEvent('offer_view',{section:'oferta'});offerReported=true;}}
      if(entry.target===footer)footerVisible=entry.isIntersecting;
    });updatePurchaseBar();
  },{threshold:0});
  [hero,offer,footer].forEach(element=>observer.observe(element));
}
// Reserve mobile footer clearance without changing page height during scrolling.
document.body.classList.add('has-mobile-bar');
document.querySelectorAll('.faq-list details').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)trackEvent('faq_open',{question:item.querySelector('summary').textContent.replace('+','').trim()});}));

const progress=document.querySelector('.reading-progress');
let framePending=false;
function updateReadingProgress(){const available=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform='scaleX('+(available>0?Math.min(1,Math.max(0,window.scrollY/available)):0)+')';framePending=false;}
window.addEventListener('scroll',()=>{if(!framePending){framePending=true;requestAnimationFrame(updateReadingProgress);}},{passive:true});
window.addEventListener('resize',updateReadingProgress);
window.addEventListener('load',updateReadingProgress);
updateReadingProgress();

