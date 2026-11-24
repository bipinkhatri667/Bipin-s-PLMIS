(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s);
const root=document.documentElement;
const saved=localStorage.getItem('slms-theme');
const systemDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
function applyTheme(mode){const actual=mode==='adaptive'?(systemDark?'dark':'light'):mode;root.dataset.theme=actual;localStorage.setItem('slms-theme-mode',mode);localStorage.setItem('slms-theme',actual);}
applyTheme(saved==='dark'||saved==='light'?saved:(localStorage.getItem('slms-theme-mode')||'adaptive'));
$('#themeToggle')?.addEventListener('click',()=>applyTheme(root.dataset.theme==='dark'?'light':'dark'));
$('#settingsTheme')?.addEventListener('click',()=>applyTheme(root.dataset.theme==='dark'?'light':'dark'));
$('#sidebarToggle')?.addEventListener('click',()=>document.body.classList.toggle('sidebar-collapsed'));
if(window.matchMedia){window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(localStorage.getItem('slms-theme-mode')==='adaptive')applyTheme('adaptive');});}
const form=$('#aiForm');form?.addEventListener('submit',async e=>{e.preventDefault();const input=$('#aiPrompt'),box=$('#aiMessages'),prompt=input.value.trim();if(!prompt)return;const user=document.createElement('div');user.className='ai-message user';user.textContent=prompt;box.append(user);input.value='';const wait=document.createElement('div');wait.className='ai-message';wait.textContent='Thinking…';box.append(wait);try{const res=await fetch('api/ai.php',{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-Token':window.SLMS.csrf},body:JSON.stringify({prompt})});const data=await res.json();wait.textContent=data.answer||data.error||'No response.';}catch(err){wait.textContent='Unable to contact the assistant.';}});
})();