const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

function toggleMenu(forceClose = false) {
  const open = forceClose ? false : !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', open);
  menuButton.classList.toggle('active', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}

menuButton.addEventListener('click', () => toggleMenu());
mobileLinks.forEach((link) => link.addEventListener('click', () => toggleMenu(true)));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element, index) => {
  if (element.closest('.project-grid')) element.style.transitionDelay = `${(index % 3) * 90}ms`;
  revealObserver.observe(element);
});

document.getElementById('year').textContent = new Date().getFullYear();
