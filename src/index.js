import './style.scss';
import createGame from './models/App/createGame';
import { GAME_INTERVAL, CANVAS_DOM_ID } from './constant';

const app = createGame({
  startBtnElem: document.getElementById('gameStartBtn'),
  scoreElem: document.getElementById('scoreText'),
  canvasElem: document.getElementById(CANVAS_DOM_ID),
});
setInterval(app.render.bind(app), GAME_INTERVAL);
