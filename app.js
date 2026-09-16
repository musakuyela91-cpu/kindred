/* Kindred client-side prototype. Replace localStorage with authenticated API calls in production. */
const KINDRED_KEY = 'kindred-profile';
const FEATHER_KEY = 'kindred-feather-active';
const attendees = [
  { name: 'Nora', interests: 'Family dinners · pottery · slow Sundays', match: 'Someone shares your pace' },
  { name: 'Maya', interests: 'Live music · long walks · cooking', match: 'A very good conversation awaits' },
  { name: 'Sophie', interests: 'Bookshops · brunch · beach days', match: 'You both value the little things' }
];
const toggle = document.querySelector('#feather-toggle');
const wave = document.querySelector('#wave-button');
const status = document.querySelector('#match-status');
const matchName = document.querySelector('#match-name');
const interests = document.querySelector('#match-interests');
const joinForm = document.querySelector('#join-form');
const message = document.querySelector('.form-message');
const profile = () => { try { return JSON.parse(localStorage.getItem(KINDRED_KEY)); } catch { return null; } };
function renderFeather() {
  const active = localStorage.getItem(FEATHER_KEY) === 'true';
  toggle.setAttribute('aria-pressed', String(active)); toggle.classList.toggle('active', active);
  toggle.innerHTML = `<span></span> ${active ? 'Your Feather is on' : 'Turn on my Feather'}`;
  wave.disabled = !active; status.textContent = active ? 'A feather nearby' : 'Turn on your Feather to connect';
}
toggle.addEventListener('click', () => {
  if (!profile()) { document.querySelector('[data-open-modal="join"]').click(); message.textContent = 'Create your profile before joining the event.'; return; }
  localStorage.setItem(FEATHER_KEY, String(localStorage.getItem(FEATHER_KEY) !== 'true')); renderFeather();
});
wave.addEventListener('click', () => {
  const person = attendees[Math.floor(Math.random() * attendees.length)];
  matchName.textContent = person.name; interests.textContent = person.interests; status.textContent = `Wave sent to ${person.name}`;
  wave.textContent = '✓'; wave.disabled = true;
  setTimeout(() => { wave.textContent = '↗'; wave.disabled = false; status.textContent = `${person.name} can choose to reply`; }, 2200);
});
joinForm.addEventListener('submit', () => {
  const [name, email] = [...joinForm.querySelectorAll('input')].map(input => input.value.trim());
  if (name && email) localStorage.setItem(KINDRED_KEY, JSON.stringify({ name, email, joinedAt: new Date().toISOString() }));
});
renderFeather();
