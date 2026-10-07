const hourHand   = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');
const clock      = document.querySelector('.clock');

const web = document.querySelector('.web');
const NS  = 'http://www.w3.org/2000/svg';
const SPOKES = 12;
const RINGS  = [15, 30, 45, 60, 75, 90];

// Spokes
for (let i = 0; i < SPOKES; i++) {
  const a = (i / SPOKES) * 2 * Math.PI;
  const line = document.createElementNS(NS, 'line');
  line.setAttribute('x1', 0);
  line.setAttribute('y1', 0);
  line.setAttribute('x2', 95 * Math.cos(a));
  line.setAttribute('y2', 95 * Math.sin(a));
  line.setAttribute('stroke', '#fff');
  line.setAttribute('stroke-width', 0.5);
  web.appendChild(line);
}

// Rings (slightly curved lines between spokes)
RINGS.forEach(r => {
  let d = '';
  for (let i = 0; i <= SPOKES; i++) {
    const a    = (i / SPOKES) * 2 * Math.PI;
    const next = ((i + 0.5) / SPOKES) * 2 * Math.PI;
    const x = r * Math.cos(a), y = r * Math.sin(a);
    const cx = (r * 0.93) * Math.cos(next), cy = (r * 0.93) * Math.sin(next);
    d += (i === 0 ? `M${x},${y}` : `Q${cx},${cy} ${x},${y}`);
  }
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#fff');
  path.setAttribute('stroke-width', 0.5);
  web.appendChild(path);
});

// 1. Create the numbers 1 to 12
for (let n = 1; n <= 12; n++) {
  const num = document.createElement('div');
  num.className = 'number';
  num.style.setProperty('--n', n);
  num.textContent = n;
  clock.appendChild(num);
}

// 2. Read the time and rotate the hands
function tick() {
  const now = new Date();
  const sec  = now.getSeconds() + now.getMilliseconds() / 1000;
  const min  = now.getMinutes() + sec / 60;
  const hour = (now.getHours() % 12) + min / 60;

  secondHand.style.transform = `rotate(${Math.floor(sec) * 6}deg)`;    // 360/60 = 6° per second
  minuteHand.style.transform = `rotate(${min * 6}deg)`;    // 6° per minute
  hourHand.style.transform   = `rotate(${hour * 30}deg)`;  // 360/12 = 30° per hour

  requestAnimationFrame(tick);  // repeat smoothly
}
tick();