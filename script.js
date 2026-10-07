// 1. VIDEO DATA: edit this list (id = the part after v= in a YouTube link)
const videos = [
  { title: 'Build a Responsive Website in 1 Hour', tag: 'Web Dev', time: '58:12', id: 'M7lc1UVf-VE', c: '#7c5cff,#22d3ee' },
  { title: 'JavaScript Roadmap for Beginners', tag: 'JavaScript', time: '24:40', id: 'M7lc1UVf-VE', c: '#f97316,#ec4899' },
  { title: 'Git & GitHub Explained Simply', tag: 'Tools', time: '31:05', id: 'M7lc1UVf-VE', c: '#10b981,#22d3ee' },
  { title: 'How I Got My First Freelance Client', tag: 'Career', time: '18:22', id: 'M7lc1UVf-VE', c: '#6366f1,#a855f7' },
  { title: 'Python Project for Beginners', tag: 'Python', time: '42:30', id: 'M7lc1UVf-VE', c: '#f59e0b,#ef4444' },
  { title: 'My Developer Desk Setup 2026', tag: 'Setup', time: '12:48', id: 'M7lc1UVf-VE', c: '#0ea5e9,#6366f1' }
];

// 2. BUILD VIDEO CARDS
const grid = document.getElementById('videoGrid');
videos.forEach(v => {
  const b = document.createElement('button');
  b.className = 'video reveal';
  b.innerHTML = `<div class="thumb" style="background:linear-gradient(135deg,${v.c})">
      <span class="play">&#9654;</span><span class="dur">${v.time}</span></div>
    <div class="vbody"><small>${v.tag}</small><h3>${v.title}</h3></div>`;
  b.addEventListener('click', () => openVideo(v.id));
  grid.appendChild(b);
});

// 3. VIDEO MODAL
const modal = document.getElementById('modal');
const player = document.getElementById('player');
function openVideo(id) {
  player.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  modal.classList.add('open');
}
function closeVideo() { modal.classList.remove('open'); player.src = ''; }
document.getElementById('closeBtn').addEventListener('click', closeVideo);
modal.addEventListener('click', e => { if (e.target === modal) closeVideo(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideo(); });

// 4. DARK / LIGHT THEME (remembered in the browser)
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
let saved = 'dark';
try { saved = localStorage.getItem('theme') || 'dark'; } catch (e) {}
root.dataset.theme = saved;
themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// 5. MOBILE MENU
const nav = document.getElementById('nav');
document.getElementById('menuBtn').addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// 6. SCROLL REVEAL + COUNT-UP NUMBERS
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('show');
    const n = en.target.querySelector('[data-count]');
    if (n) countUp(n);
    io.unobserve(en.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

function countUp(el) {
  const end = +el.dataset.count; let cur = 0;
  const step = Math.max(1, Math.ceil(end / 40));
  const t = setInterval(() => {
    cur = Math.min(end, cur + step);
    el.textContent = cur;
    if (cur === end) clearInterval(t);
  }, 30);
}

// 7. PROFILE PHOTO FALLBACK (if images/profile.jpg is missing)
const av = document.querySelector('.avatar');
av.addEventListener('error', () => { av.src = 'https://picsum.photos/seed/creator/500/500'; }, { once: true });
