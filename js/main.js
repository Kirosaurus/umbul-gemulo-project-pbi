/* ====== PENGATURAN GALERI ======
   Daftar foto galeri. Tambah/kurangi baris sesuai jumlah foto;
   titik navigasi dibuat otomatis. Letakkan file di assets/images/ */
const galleryImages = [
  { src: 'assets/images/galeri-1.jpg', alt: 'Galeri Umbul Gemulo 1' },
  { src: 'assets/images/galeri-2.jpg', alt: 'Galeri Umbul Gemulo 2' },
  { src: 'assets/images/galeri-3.jpg', alt: 'Galeri Umbul Gemulo 3' },
  { src: 'assets/images/galeri-4.jpg', alt: 'Galeri Umbul Gemulo 4' },
  { src: 'assets/images/galeri-5.jpg', alt: 'Galeri Umbul Gemulo 5' },
  { src: 'assets/images/galeri-6.jpg', alt: 'Galeri Umbul Gemulo 6' },
];

/* ====== Placeholder untuk gambar yang belum ada ====== */
function watchImg(img){
  const slot = img.closest('.img-slot');
  const mark = () => slot && slot.classList.add('missing');
  if (img.complete && img.naturalWidth === 0) mark();
  img.addEventListener('error', mark);
}

/* ====== Galeri slider ====== */
const track = document.getElementById('slider-track');
const dotsEl = document.getElementById('dots');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let index = 0;

galleryImages.forEach(g => {
  const slide = document.createElement('div');
  slide.className = 'slide img-slot';
  slide.dataset.name = g.src.split('/').pop();
  const img = document.createElement('img');
  img.src = g.src; img.alt = g.alt; img.loading = 'lazy';
  slide.appendChild(img);
  track.appendChild(slide);
});

const perView = () => window.innerWidth <= 720 ? 1 : window.innerWidth <= 1100 ? 2 : 3;
const maxIndex = () => Math.max(0, galleryImages.length - perView());

function renderDots(){
  dotsEl.innerHTML = '';
  for (let i = 0; i <= maxIndex(); i++){
    const d = document.createElement('button');
    d.className = 'dot';
    d.setAttribute('aria-label', 'Ke posisi ' + (i + 1));
    d.addEventListener('click', () => go(i));
    dotsEl.appendChild(d);
  }
}
function go(i){
  index = Math.min(Math.max(i, 0), maxIndex());
  const slide = track.children[0];
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  const step = slide.getBoundingClientRect().width + gap;
  track.style.transform = `translateX(${-index * step}px)`;
  [...dotsEl.children].forEach((d, k) => d.classList.toggle('active', k === index));
  prev.disabled = index === 0;
  next.disabled = index === maxIndex();
}
prev.addEventListener('click', () => go(index - 1));
next.addEventListener('click', () => go(index + 1));
window.addEventListener('resize', () => { renderDots(); go(index); });

/* ====== Navbar: latar saat scroll + penanda menu aktif ====== */
const topbar = document.getElementById('topbar');
const links = [...document.querySelectorAll('.nav-links a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
function onScroll(){
  topbar.classList.toggle('scrolled', window.scrollY > 40);
  const y = window.scrollY + window.innerHeight * 0.35;
  let cur = 0;
  sections.forEach((s, i) => { if (s && s.offsetTop <= y) cur = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === cur));
}
window.addEventListener('scroll', onScroll, { passive: true });

/* ====== Init ====== */
document.querySelectorAll('.img-slot img').forEach(watchImg);
renderDots(); go(0); onScroll();
