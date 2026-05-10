export const state = {
  isLoggedIn: false,
  player: {
    username: "",
    name: "",
    id: null,
  },
  game: {
    started: false,
    score: 30,
    level: 1,
    stats: {
      reload: 1000,
    },
  },
};
