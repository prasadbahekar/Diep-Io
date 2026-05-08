import { COLORS } from "../data/colors";

const upgradesContainer = document.getElementById("upgrades");

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

document.addEventListener("mousemove", (e) => {
  let showPanel = e.clientX < 224 && e.clientY > window.innerHeight - 224;
  if (showPanel) {
    upgradesContainer.classList.add("active");
  } else {
    upgradesContainer.classList.remove("active");
  }
});
