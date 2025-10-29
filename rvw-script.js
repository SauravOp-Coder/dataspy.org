// rvw-script.js (responsive version)
// same rvw- prefix to avoid conflicts

const rvwReviews = [
  {name:'Ananya R.', role:'Product Manager', avatar:'logos/logo2.webp', rating:5, post:'Verified buyer', review:"Excellent course! The explanations are crisp and project-based — I built something useful in weeks."},
  {name:'Rohit S.', role:'Student', avatar:'logos/smiling-young-man-illustration_1308-174669.webp', rating:4, post:'Course participant', review:"Great teacher, code samples were very helpful. Would love an extra Q&A session."},
  {name:'Meera K.', role:'Manager', avatar:'logos/logo13s.webp', rating:5, post:'Client', review:"We engaged for product UI work. Delivered on time with a professional touch. Highly recommend."},
  {name:'Vikram P.', role:'Developer', avatar:'logos/logo8.webp', rating:4, post:'Bootcamp attendee', review:"Solid content and clean code patterns. Some topics were fast but overall great."},
  {name:'Sana L.', role:'UI Designer', avatar:'logos/logo11hd.webp', rating:5, post:'Workshop attendee', review:"The workshop gave actionable UI patterns I could use immediately. Clean delivery."},
  {name:'Arjun M.', role:'Freelancer', avatar:'logos/logo7.webp', rating:4, post:'Client', review:"Good communication and timely delivery. Some minor polish requested, but overall satisfied."},
  {name:'Priya D.', role:'Marketing Lead', avatar:'logos/logo9.webp', rating:5, post:'Corporate training', review:"Our team improved drastically after the training. Clear structure and practical examples."},
  {name:'Kabir N.', role:'Student', avatar:'logos/smiling-young-man-illustration_1308-174669.webp', rating:4, post:'Course participant', review:"Content is excellent; a few advanced topics could use more depth but great value."}
];

const rvwTrack = document.getElementById('rvw-track');
const rvwDots = document.getElementById('rvw-dots');
const rvwViewport = document.getElementById('rvw-viewport');
let rvwIndex = 0;
let rvwAutoplay = true;
let rvwTimer = null;
const rvwInterval = 3100; // slightly slower for readable mobile

// Build cards
function rvwRenderCards(){
  rvwTrack.innerHTML = '';
  rvwReviews.forEach(r => {
    const c = document.createElement('article');
    c.className = 'rvw-card';
    c.innerHTML = `
      <div class="rvw-avatar"><img src="${r.avatar}" alt="${rvwEscape(r.name)} photo"></div>
      <div class="rvw-content">
        <div class="rvw-meta">
          <div>
            <div class="rvw-name">${rvwEscape(r.name)}</div>
            <div class="rvw-role rvw-muted">${rvwEscape(r.role)}</div>
          </div>
          <div>
            <div class="rvw-stars">${rvwStars(r.rating)}</div>
            <div class="rvw-post rvw-muted">${rvwEscape(r.post)}</div>
          </div>
        </div>
        <p class="rvw-review-text">${rvwEscape(r.review)}</p>
      </div>
    `;
    rvwTrack.appendChild(c);
  });
}

// Build dots
function rvwRenderDots(){
  rvwDots.innerHTML = '';
  rvwReviews.forEach((_,i)=>{
    const d=document.createElement('button');
    d.className='rvw-dot';
    if(i===0) d.classList.add('active');
    d.addEventListener('click',()=>{rvwGo(i); rvwPause();});
    rvwDots.appendChild(d);
  });
}

// Helpers
function rvwStars(n){
  let s='';
  for(let i=1;i<=5;i++){
    if(i<=n) s+='<svg class="rvw-star" viewBox="0 0 24 24" fill="currentColor" style="color:var(--rvw-accent)"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.79 1.4 8.168L12 18.896 4.666 23.17l1.4-8.168L.132 9.212l8.2-1.193z"/></svg>';
    else s+='<svg class="rvw-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="color:rgba(255,255,255,0.3)"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.79 1.4 8.168L12 18.896 4.666 23.17l1.4-8.168L.132 9.212l8.2-1.193z"/></svg>';
  }
  return s;
}
function rvwEscape(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;")}

// Center active card (robust across sizes)
function rvwUpdate(){
  const cards=rvwTrack.querySelectorAll('.rvw-card');
  if(!cards.length) return;
  // clamp index within bounds
  if(rvwIndex < 0) rvwIndex = rvwReviews.length - 1;
  if(rvwIndex >= rvwReviews.length) rvwIndex = 0;

  const active=cards[rvwIndex];
  const vpW=rvwViewport.clientWidth;
  const cW=active.offsetWidth;
  const left=active.offsetLeft;
  const desired=(vpW - cW) / 2;
  // apply transform with a tiny rounding to avoid subpixel blurriness
  const tx = Math.round(-(left - desired));
  rvwTrack.style.transform = `translateX(${tx}px)`;

  cards.forEach((c,i)=>{c.removeAttribute('data-animate');if(i===rvwIndex)c.setAttribute('data-animate','in');});
  [...rvwDots.children].forEach((d,i)=>d.classList.toggle('active',i===rvwIndex));
}

function rvwGo(i){rvwIndex=(i+rvwReviews.length)%rvwReviews.length;rvwUpdate();}
function rvwNext(){rvwGo(rvwIndex+1);}
function rvwPrev(){rvwGo(rvwIndex-1);}

function rvwStart(){ if(rvwTimer) clearInterval(rvwTimer); if(rvwAutoplay) rvwTimer = setInterval(rvwNext, rvwInterval); }
function rvwPause(){ rvwAutoplay = false; const btn = document.getElementById('rvw-pauseBtn'); if(btn){ btn.innerText='Paused'; btn.setAttribute('aria-pressed','true'); } if(rvwTimer) clearInterval(rvwTimer); }
function rvwResume(){ rvwAutoplay = true; const btn = document.getElementById('rvw-pauseBtn'); if(btn){ btn.innerText='Pause'; btn.setAttribute('aria-pressed','false'); } rvwStart(); }

function rvwWire(){
  document.getElementById('rvw-nextBtn').onclick=()=>{rvwNext();rvwPause();};
  document.getElementById('rvw-prevBtn').onclick=()=>{rvwPrev();rvwPause();};
  document.getElementById('rvw-pauseBtn').onclick=()=>{ rvwAutoplay ? rvwPause() : rvwResume(); };
  rvwViewport.onmouseenter = ()=> { if(rvwTimer) clearInterval(rvwTimer); };
  rvwViewport.onmouseleave = ()=> { if(rvwAutoplay) rvwStart(); };

  // keyboard nav
  document.addEventListener('keydown', (e)=> {
    if(e.key === 'ArrowRight'){ rvwNext(); rvwPause(); }
    else if(e.key === 'ArrowLeft'){ rvwPrev(); rvwPause(); }
  });

  // touch swipe support (simple)
  let startX = null;
  rvwViewport.addEventListener('touchstart', (ev)=> { startX = ev.touches[0].clientX; });
  rvwViewport.addEventListener('touchmove', (ev)=> {
    if(startX === null) return;
    const dx = ev.touches[0].clientX - startX;
    // don't move the track here; just detect swipe threshold
    if(Math.abs(dx) > 40){
      if(dx < 0){ rvwNext(); rvwPause(); } else { rvwPrev(); rvwPause(); }
      startX = null;
    }
  });
  rvwViewport.addEventListener('touchend', ()=> { startX = null; });

  // recalc on resize
  let resizeTimer;
  window.addEventListener('resize', ()=> { clearTimeout(resizeTimer); resizeTimer = setTimeout(rvwUpdate, 120); });
}

function rvwInit(){
  rvwRenderCards();
  rvwRenderDots();
  rvwWire();
  // small delay for images/layout
  setTimeout(()=> { rvwUpdate(); rvwStart(); }, 80);
}
rvwInit();
