import App from '.';

let singleton = null;

const createGame = (config) => {
  if (!singleton) {
    singleton = new App(config);
  }
  return singleton;
};

export default createGame;
