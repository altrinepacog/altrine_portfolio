// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const tabList = document.getElementById('tabList');
navToggle.addEventListener('click', () => {
  const open = tabList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
tabList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    tabList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Request slip: give it a "filed" number for flavor
document.getElementById('slipNumber').textContent =
  String(Math.floor(Math.random() * 900) + 100);

// Contact form -> opens the user's email client with a pre-filled message
const form = document.getElementById('requestSlip');
const submitBtn = document.getElementById('slipSubmitBtn');
const approvedNote = document.getElementById('slipApproved');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(
    `${message}\n\n— ${name}\n${email}`
  );

  submitBtn.classList.add('is-stamped');
  approvedNote.classList.add('show');
  setTimeout(() => submitBtn.classList.remove('is-stamped'), 350);

  window.location.href = `mailto:altrinemay.pacogg@gmail.com?subject=${subject}&body=${body}`;
});

// ---- Scroll-reveal for folders/sections ----
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ---- Scroll-spy: highlight the active tab ----
const sections = document.querySelectorAll('main section[id]');
const tabs = document.querySelectorAll('.tab[data-section]');
if ('IntersectionObserver' in window && sections.length) {
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tabs.forEach(t => t.classList.toggle('active', t.dataset.section === id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => spyObserver.observe(s));
}

// ---- Scroll progress tape ----
const scrollTape = document.getElementById('scrollTape');
function updateScrollProgress() {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const pct = height > 0 ? (scrollTop / height) * 100 : 0;
  document.documentElement.style.setProperty('--scroll-progress', pct + '%');
}
document.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

const modal = document.getElementById('certModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalOverlay = document.getElementById('modalOverlay');
const certItems = document.querySelectorAll('.cert-item');

// Open Modal on Item Click
certItems.forEach((item) => {
  item.addEventListener('click', () => {
    const imgSrc = item.getAttribute('data-cert-img');
    const title = item.getAttribute('data-cert-title');

    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  });
});

// Close Modal Function
function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
}

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close on 'Escape' key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

