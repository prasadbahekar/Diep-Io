const LEVEL_DATA = [
  { level: 1, tankSize: 2.0, pointsNeeded: 0, respawnLevel: 1 },
  { level: 2, tankSize: 2.02, pointsNeeded: 4, respawnLevel: 1 },
  { level: 3, tankSize: 2.04, pointsNeeded: 13, respawnLevel: 2 },
  { level: 4, tankSize: 2.061, pointsNeeded: 28, respawnLevel: 3 },
  { level: 5, tankSize: 2.081, pointsNeeded: 50, respawnLevel: 4 },
  { level: 6, tankSize: 2.102, pointsNeeded: 78, respawnLevel: 5 },
  { level: 7, tankSize: 2.123, pointsNeeded: 113, respawnLevel: 6 },
  { level: 8, tankSize: 2.144, pointsNeeded: 157, respawnLevel: 7 },
  { level: 9, tankSize: 2.166, pointsNeeded: 211, respawnLevel: 8 },
  { level: 10, tankSize: 2.187, pointsNeeded: 275, respawnLevel: 9 },
  { level: 11, tankSize: 2.209, pointsNeeded: 350, respawnLevel: 10 },
  { level: 12, tankSize: 2.231, pointsNeeded: 437, respawnLevel: 11 },
  { level: 13, tankSize: 2.254, pointsNeeded: 538, respawnLevel: 11 },
  { level: 14, tankSize: 2.276, pointsNeeded: 655, respawnLevel: 12 },
  { level: 15, tankSize: 2.299, pointsNeeded: 787, respawnLevel: 12 },
  { level: 16, tankSize: 2.322, pointsNeeded: 938, respawnLevel: 13 },
  { level: 17, tankSize: 2.345, pointsNeeded: 1109, respawnLevel: 13 },
  { level: 18, tankSize: 2.369, pointsNeeded: 1301, respawnLevel: 13 },
  { level: 19, tankSize: 2.392, pointsNeeded: 1516, respawnLevel: 14 },
  { level: 20, tankSize: 2.416, pointsNeeded: 1757, respawnLevel: 14 },
  { level: 21, tankSize: 2.44, pointsNeeded: 2026, respawnLevel: 15 },
  { level: 22, tankSize: 2.465, pointsNeeded: 2325, respawnLevel: 15 },
  { level: 23, tankSize: 2.489, pointsNeeded: 2658, respawnLevel: 15 },
  { level: 24, tankSize: 2.514, pointsNeeded: 3026, respawnLevel: 16 },
  { level: 25, tankSize: 2.539, pointsNeeded: 3433, respawnLevel: 16 },
  { level: 26, tankSize: 2.565, pointsNeeded: 3883, respawnLevel: 16 },
  { level: 27, tankSize: 2.591, pointsNeeded: 4379, respawnLevel: 17 },
  { level: 28, tankSize: 2.616, pointsNeeded: 4925, respawnLevel: 17 },
  { level: 29, tankSize: 2.643, pointsNeeded: 5525, respawnLevel: 17 },
  { level: 30, tankSize: 2.669, pointsNeeded: 6184, respawnLevel: 17 },
  { level: 31, tankSize: 2.696, pointsNeeded: 6907, respawnLevel: 18 },
  { level: 32, tankSize: 2.723, pointsNeeded: 7698, respawnLevel: 18 },
  { level: 33, tankSize: 2.75, pointsNeeded: 8537, respawnLevel: 18 },
  { level: 34, tankSize: 2.777, pointsNeeded: 9426, respawnLevel: 19 },
  { level: 35, tankSize: 2.805, pointsNeeded: 10368, respawnLevel: 19 },
  { level: 36, tankSize: 2.833, pointsNeeded: 11367, respawnLevel: 19 },
  { level: 37, tankSize: 2.862, pointsNeeded: 12426, respawnLevel: 19 },
  { level: 38, tankSize: 2.89, pointsNeeded: 13549, respawnLevel: 20 },
  { level: 39, tankSize: 2.919, pointsNeeded: 14739, respawnLevel: 20 },
  { level: 40, tankSize: 2.948, pointsNeeded: 16000, respawnLevel: 20 },
  { level: 41, tankSize: 2.978, pointsNeeded: 17337, respawnLevel: 20 },
  { level: 42, tankSize: 3.008, pointsNeeded: 18754, respawnLevel: 21 },
  { level: 43, tankSize: 3.038, pointsNeeded: 20256, respawnLevel: 21 },
  { level: 44, tankSize: 3.068, pointsNeeded: 21849, respawnLevel: 21 },
  { level: 45, tankSize: 3.099, pointsNeeded: 23536, respawnLevel: 22 },
];

export function getPointsToNextLevel(level) {
  const current = LEVEL_DATA.find((l) => l.level === level);
  const next = LEVEL_DATA.find((l) => l.level === level + 1);

  if (!current || !next) return null;

  return next.pointsNeeded - current.pointsNeeded;
}

export function getLevelFromScore(score) {
  return LEVEL_DATA.findLast((data) => score >= data.pointsNeeded)?.level ?? 1;
}

export function getLevelData(level) {
  return LEVEL_DATA.find((data) => data.level === level);
}
