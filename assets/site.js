'use strict';

// Keep the existing checkout and offer identifier. Analytics is opt-in.
const CONFIG = Object.freeze({
  CHECKOUT_URL: 'https://checkoutseguro.info/checkout/cmvc9q3um0j8k01om69f3hvp1?offer=AIT9ILJ',
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
const checkout=new URL(CONFIG.CHECKOUT_URL);
campaignKeys.forEach(key=>{if(incoming.has(key)) checkout.searchParams.set(key,incoming.get(key));});
document.querySelectorAll('.checkout-link').forEach(link=>{
  link.href=checkout.href;
  link.addEventListener('click',()=>{
    const params={location:link.dataset.location,button_text:link.textContent.trim(),value:19.90,currency:'BRL'};
    trackEvent('cta_click',params);
    trackEvent('checkout_start',params);
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
