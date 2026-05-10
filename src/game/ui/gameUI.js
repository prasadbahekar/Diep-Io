import { COLORS } from "../data/colors";
import { getLevelData, getPointsToNextLevel } from "../data/levels";
import { state } from "../state";
import Phaser from "phaser";

const upgradesContainer = document.getElementById("upgrades");
let showPanel = false;
let mKey = false;

let currentWidth = 0;
let prevLevel = 1;
let animateProgress = false;

function createUpgrade(title, hotkey, filledBars = 0, color = "#000000") {
  const upgrade = document.createElement("div");
  upgrade.className = "upgrade";
  const bars = document.createElement("div");
  bars.className = "bars";
  const texts = document.createElement("div");
  texts.className = "texts";
  const titleEl = document.createElement("p");
  titleEl.className = "title";
  titleEl.textContent = title;
  const hotkeyEl = document.createElement("p");
  hotkeyEl.className = "hotkey";
  hotkeyEl.textContent = `[${hotkey}]`;
  texts.appendChild(titleEl);
  texts.appendChild(hotkeyEl);
  bars.appendChild(texts);

  for (let i = 0; i < 7; i++) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.backgroundColor = color;
    if (i >= filledBars) {
      bar.style.opacity = "0";
    }

    bars.appendChild(bar);
  }

  const add = document.createElement("div");
  add.className = "add";
  add.style.backgroundColor = color;
  const plus = document.createElement("p");
  plus.textContent = "+";

  add.appendChild(plus);
  upgrade.appendChild(bars);
  upgrade.appendChild(add);
  upgradesContainer.appendChild(upgrade);

  return upgrade;
}

export function createGameUI() {
  document.getElementById("game-ui").style.display = "block";

  // Upgrades
  createUpgrade("Health Regen", 1, 3, COLORS.peach);
  createUpgrade("Max Health", 2, 1, COLORS.magenta);
  createUpgrade("Bullet Speed", 3, 1, COLORS.purple);
  createUpgrade("Body Damage", 4, 0, COLORS.blue);
  createUpgrade("Bullet Penetration", 5, 0, COLORS.yellow);
  createUpgrade("Bullet Damage", 6, 5, COLORS.red);
  createUpgrade("Reload", 7, 4, COLORS.green);
  createUpgrade("Movement Speed", 8, 4, COLORS.cyan);

  // Names
  const nameField = document.getElementById("playerNameInput");
  const nameElement = document.getElementById("playerName");
  nameElement.textContent = nameField.value;
}

export function updateGameUI() {
  const scoreEl = document.getElementById("scoreTitle");
  const levelEl = document.getElementById("levelTitle");

  scoreEl.textContent = `Score: ${state.game.score}`;
  levelEl.textContent = `Lvl ${state.game.level} Tank`;

  updateProgressBar();

  if (showPanel || mKey) {
    upgradesContainer.classList.add("active");
  } else {
    upgradesContainer.classList.remove("active");
  }
}

function updateProgressBar() {
  const levelProgress =
    (state.game.score - getLevelData(state.game.level).pointsNeeded) /
    getPointsToNextLevel(state.game.level);

  let targetWidth = levelProgress * 100;
  let lerpSpeed = 0.05;

  if (state.game.level !== prevLevel || animateProgress) {
    targetWidth = 100;
    lerpSpeed = 0.075;
    if (Math.round(currentWidth) == targetWidth) {
      animateProgress = true;
      prevLevel = state.game.level;
    }

    if (animateProgress) {
      targetWidth = 5;
      if (Math.round(currentWidth) == targetWidth) {
        animateProgress = false;
      }
    }
  } else {
    targetWidth = levelProgress * 100;
    prevLevel = state.game.level;
  }

  if (targetWidth < 5) targetWidth = 5;
  const levelProgEl = document.getElementById("levelProgress");
  currentWidth = Phaser.Math.Linear(currentWidth, targetWidth, lerpSpeed);
  levelProgEl.style.width = `${currentWidth}%`;
}

document.addEventListener("mousemove", (e) => {
  showPanel = e.clientX < 224 && e.clientY > window.innerHeight - 224;
});

document.addEventListener("keydown", (e) => {
  mKey = e.key == "m";
});

document.addEventListener("keyup", (e) => {
  if (mKey && e.key == "m") {
    mKey = false;
  }
});
