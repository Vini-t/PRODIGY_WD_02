let [seconds, minutes, hours] = [0, 0, 0];
let display = document.getElementById("display");
let hSpan = document.getElementById("h");
let mSpan = document.getElementById("m");
let sSpan = document.getElementById("s");
let laps = document.getElementById("laps");
let timer = null;

let beepStart = document.getElementById("beep-start");
let beepPause = document.getElementById("beep-pause");
let beepReset = document.getElementById("beep-reset");
let beepLap = document.getElementById("beep-lap");

function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  updateDisplay();
}

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  hSpan.textContent = h;
  mSpan.textContent = m;
  sSpan.textContent = s;

  [hSpan, mSpan, sSpan].forEach(span => {
    span.classList.add("changed");
    setTimeout(() => span.classList.remove("changed"), 200);
  });
}

function start() {
  if (timer !== null) clearInterval(timer);
  timer = setInterval(stopwatch, 1000);
  beepStart.play();
}

function pause() {
  clearInterval(timer);
  beepPause.play();
}

function reset() {
  clearInterval(timer);
  [seconds, minutes, hours] = [0, 0, 0];
  updateDisplay();
  laps.innerHTML = "";
  beepReset.play();
}

function lap() {
  const entry = document.createElement("div");
  entry.textContent = `Lap: ${hSpan.textContent}:${mSpan.textContent}:${sSpan.textContent}`;
  laps.appendChild(entry);
  beepLap.play();
}

let isDark = true;
function toggleTheme() {
  document.body.style.background = isDark
    ? "var(--bg-light)"
    : "var(--bg-dark)";
  document.body.style.color = isDark
    ? "var(--text-light)"
    : "var(--text-dark)";
  isDark = !isDark;
}
