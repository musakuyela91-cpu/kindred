const modal = document.querySelector('#modal');
const title = document.querySelector('#modal-title');
const form = document.querySelector('#join-form');
const message = document.querySelector('.form-message');

document.querySelectorAll('[data-open-modal]').forEach(button => button.addEventListener('click', () => {
  const isLogin = button.dataset.openModal === 'login';
  title.textContent = isLogin ? 'Welcome back.' : 'A good story can start here.';
  form.querySelector('button').innerHTML = isLogin ? 'Continue <span>→</span>' : 'Start your profile <span>→</span>';
  message.textContent = '';
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  form.querySelector('input').focus();
}));

function closeModal() { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); }
document.querySelector('.close').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
form.addEventListener('submit', event => {
  event.preventDefault();
  message.textContent = 'Thanks — your Kindred journey is ready to begin.';
  form.reset();
});
