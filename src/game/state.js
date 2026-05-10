export const state = {
  isLoggedIn: false,
  player: {
    username: "",
    name: "",
    id: null,
  },
  game: {
    started: false,
    score: 0,
    level: 1,
    stats: {
      reload: 1000,
    },
  },
};
