import '../assets/sass/main.sass';

const descriptions = {
  coral: 'Coral · the original',
  blue: 'Blue · a fresh perspective',
  green: 'Green · room to grow',
  purple: 'Purple · a little imagination',
};

document.querySelectorAll('[data-color]').forEach((button) => {
  button.addEventListener('click', () => {
    document.body.dataset.accent = button.dataset.color;
    document.querySelectorAll('[data-color]').forEach((swatch) => {
      const selected = swatch === button;
      swatch.setAttribute('aria-pressed', String(selected));
      swatch.textContent = selected ? '✓' : '';
    });
    document.querySelector('#accent-name').textContent =
      descriptions[button.dataset.color];
  });
});

let steps = 0;
const increment = document.querySelector('#increment');
function renderCounter() {
  const output = document.querySelector('#count');
  output.replaceChildren(document.createTextNode(String(steps)));
  const total = document.createElement('span');
  total.textContent = '/ 10';
  output.append(total);
  document.querySelector('#progress-fill').style.width = `${steps * 10}%`;
  document
    .querySelector('[role="progressbar"]')
    .setAttribute('aria-valuenow', String(steps));
  document.querySelector('#counter-message').textContent =
    steps === 10
      ? 'Look at you. Ten steps further.'
      : steps === 0
        ? 'Every idea starts at zero.'
        : 'One step closer to something good.';
  increment.disabled = steps === 10;
}
increment.addEventListener('click', () => {
  steps += 1;
  renderCounter();
});
document.querySelector('#reset').addEventListener('click', () => {
  steps = 0;
  renderCounter();
});

document.querySelector('#idea-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#project-name');
  const name = input.value.trim();
  if (!name) {
    input.setCustomValidity('Give your idea a name.');
    input.reportValidity();
    return;
  }
  const mood = new FormData(event.currentTarget).get('mood');
  document.querySelector('#idea-result p').textContent =
    `${name} — a ${mood.toLowerCase()} beginning. Let's make it happen.`;
  document.querySelector('#idea-result').classList.add('is-created');
});
document
  .querySelector('#project-name')
  .addEventListener('input', (event) => event.target.setCustomValidity(''));
