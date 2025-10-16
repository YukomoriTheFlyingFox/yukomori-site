// ---------------- Navigation ----------------
const nav = document.getElementById('nav');
nav.addEventListener('click', e=>{
  if(e.target.dataset && e.target.dataset.target){
    showView(e.target.dataset.target);
    document.querySelectorAll('#nav button').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
  }
});

function showView(id){
  document.querySelectorAll('.view').forEach(v=>v.style.display='none');
  const el = document.getElementById(id);
  if(el) el.style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}

// ---------------- Filtrage ----------------
function makeFilter(inputId, gridId){
  const input = document.getElementById(inputId);
  const grid = document.getElementById(gridId);
  if(!input||!grid) return;
  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    grid.querySelectorAll('.card').forEach(card=>{
      const name = (card.dataset.name||card.textContent).toLowerCase();
      card.style.display = name.includes(q)?'block':'none';
    });
  });
}
makeFilter('charSearch','charactersGrid');
makeFilter('projSearch','projectsGrid');

// ---------------- Utilitaires ----------------
function copyEmail(){
  const e = document.getElementById('email').textContent.replace('[at]','@').replace('[dot]','.');
  navigator.clipboard?.writeText(e).then(()=>alert('Email copié !'));
}

function addPlaceholder(section){
  const txt = prompt('Titre du nouvel élément (placeholder) :');
  if(!txt) return;
  const gridId = section==='characters'?'charactersGrid': section==='projects'?'projectsGrid':'journalGrid';
  const grid = document.getElementById(gridId);
  const article = document.createElement('article');
  article.className='card';
  article.dataset.name = txt;
  article.innerHTML = `<h3>${escapeHtml(txt)}</h3><p class="muted small">Placeholder — édite le contenu dans le fichier HTML.</p>`;
  grid.prepend(article);
}

function addEntry(){
  const content = prompt('Nouvelle entrée — écris un court texte :');
  if(!content) return;
  const grid = document.getElementById('journalGrid');
  const d = new Date().toISOString().split('T')[0];
  const article = document.createElement('article');
  article.className='card';
  article.dataset.date = d;
  article.innerHTML = `<h3>Note — ${d}</h3><p class="muted small">${escapeHtml(content)}</p>`;
  grid.prepend(article);
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];
  });
}

// ---------------- Initialisation ----------------
showView('home');

// ---------------- Raccourcis clavier 1-5 ----------------
document.addEventListener('keydown', e=>{
  if(document.activeElement.tagName==='INPUT' || document.activeElement.tagName==='TEXTAREA') return;
  if(e.key>='1' && e.key<='5'){
    const idx = Number(e.key)-1;
    const btn = document.querySelectorAll('#nav button')[idx];
    if(btn) btn.click();
  }
});
