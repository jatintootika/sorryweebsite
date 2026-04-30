// Autoplay Music
(function(){
    const a=document.getElementById('bgMusic');
    if(!a)return;
    let u=false;
    function m(){if(!u&&a){a.muted=false;a.play().then(()=>{u=true;}).catch(()=>{});}}
    ['click','touchstart','scroll','keydown','mousemove'].forEach(e=>{document.addEventListener(e,m,{once:true});});
    setTimeout(()=>{if(!u){a.muted=false;a.play().catch(()=>{});}},2000);
})();

// Music Toggle
const mt=document.getElementById('musicToggle');
const bm=document.getElementById('bgMusic');
if(mt&&bm){let p=true;mt.addEventListener('click',()=>{if(p){bm.pause();mt.innerHTML='<i class="fas fa-music" style="opacity:0.4;"></i>';}else{bm.muted=false;bm.play();mt.innerHTML='<i class="fas fa-music" style="color:#ff6b9d;"></i>';}p=!p;});mt.innerHTML='<i class="fas fa-music" style="color:#ff6b9d;"></i>';}

// Typewriter
const te=document.getElementById('typed-text');
if(te){const t=["I'm so sorry, Sipra... 💔","Please forgive me... 🥺","You're my everything... 💝","Your Jatin loves you... ❤️","Maaf karde baby... 🫶🏻"];let i=0,j=0,d=false;function ty(){const x=t[i];te.textContent=x.substring(0,j+(d?-1:1));j+=d?-1:1;if(!d&&j===x.length){d=true;setTimeout(ty,2000);return;}if(d&&j===0){d=false;i=(i+1)%t.length;setTimeout(ty,500);return;}setTimeout(ty,d?50:100);}ty();}

// Stats Counter
const st=document.querySelectorAll('.stat-number[data-target]');
if(st.length){let done=false;function as(){st.forEach(s=>{const t=parseInt(s.getAttribute('data-target')),dur=2000,step=t/(dur/16);let c=0;const u=()=>{c+=step;if(c<t){s.textContent=Math.floor(c);requestAnimationFrame(u);}else s.textContent=t;};u();});}window.addEventListener('scroll',function ch(){const sec=document.querySelector('.love-stats');if(sec&&sec.getBoundingClientRect().top<window.innerHeight*0.8&&!done){done=true;as();window.removeEventListener('scroll',ch);}});}

// Custom Cursor
const cursor=document.querySelector('.cursor');
const follower=document.querySelector('.cursor-follower');
document.addEventListener('mousemove',(e)=>{cursor.style.left=e.clientX-4+'px';cursor.style.top=e.clientY-4+'px';setTimeout(()=>{follower.style.left=e.clientX-15+'px';follower.style.top=e.clientY-15+'px';},80);});
document.querySelectorAll('a,button,.btn,.card,.envelope,.gift-card,.message-card,.photo-preview').forEach(el=>{el.addEventListener('mouseenter',()=>{follower.style.transform='scale(1.8)';follower.style.borderColor='#ff6b9d';});el.addEventListener('mouseleave',()=>{follower.style.transform='scale(1)';follower.style.borderColor='#ffb8d0';});});

// Sparkles
const sc=document.getElementById('sparklesContainer');
if(sc){setInterval(()=>{const s=document.createElement('div');s.classList.add('sparkle');s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.animationDuration=3+Math.random()*4+'s';sc.appendChild(s);setTimeout(()=>s.remove(),4000);},400);}

// Photo Upload
document.addEventListener('DOMContentLoaded',function(){
    const pp=document.getElementById('photoPreview');
    const pi=document.getElementById('photoInput');
    const ub=document.getElementById('uploadBtn');
    const rb=document.getElementById('removeBtn');
    const up=document.getElementById('uploadedPhoto');
    const uph=document.getElementById('uploadPlaceholder');
    if(!pp||!pi)return;
    const saved=localStorage.getItem('sipraMemoryPhoto');
    if(saved){up.src=saved;up.style.display='block';uph.style.display='none';rb.style.display='inline-block';ub.textContent='📸 Change Photo';}
    pp.addEventListener('click',()=>pi.click());
    ub.addEventListener('click',e=>{e.stopPropagation();pi.click();});
    pi.addEventListener('change',function(e){
        const f=e.target.files[0];
        if(!f)return;
        if(!f.type.startsWith('image/')){alert('❌ Sirf photo select kar!');return;}
        if(f.size>10*1024*1024){alert('❌ Photo 10MB se chhoti honi chahiye!');return;}
        const r=new FileReader();
        r.onload=function(ev){
            try{localStorage.setItem('sipraMemoryPhoto',ev.target.result);}catch(e){alert('⚠️ Storage full!');return;}
            up.src=ev.target.result;up.style.display='block';uph.style.display='none';rb.style.display='inline-block';ub.textContent='📸 Change Photo';
            for(let i=0;i<15;i++){const e=document.createElement('span');e.textContent=['💝','💖','✨','🎉'][Math.floor(Math.random()*4)];e.style.cssText='position:fixed;pointer-events:none;font-size:'+(1+Math.random()*2)+'rem;top:50%;left:50%;z-index:9999;animation:uploadBurst '+(1+Math.random()*1.5)+'s ease-out forwards;--tx:'+((Math.random()-0.5)*400)+'px;--ty:'+((Math.random()-0.5)*400)+'px;';document.body.appendChild(e);setTimeout(()=>e.remove(),2000);}
        };
        r.readAsDataURL(f);
    });
    rb.addEventListener('click',function(e){e.stopPropagation();if(confirm('Sach mein photo hatani hai? 🥺')){localStorage.removeItem('sipraMemoryPhoto');up.style.display='none';up.src='';uph.style.display='block';rb.style.display='none';ub.textContent='📸 Choose Photo';}});
    pp.addEventListener('dragover',function(e){e.preventDefault();this.style.borderColor='#ff6b9d';});
    pp.addEventListener('dragleave',function(e){e.preventDefault();this.style.borderColor='rgba(255,107,157,0.4)';});
    pp.addEventListener('drop',function(e){e.preventDefault();const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/')){pi.files=e.dataTransfer.files;pi.dispatchEvent(new Event('change'));}});
});
const bs=document.createElement('style');
bs.textContent='@keyframes uploadBurst{0%{transform:translate(0,0) scale(1);opacity:1;}100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0;}}';
document.head.appendChild(bs);
