import Snake from './Snake';
import service from '../service.js';
import {
  BOX_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_DOM_ID,
  SNAKE_INIT_LENGTH,
  SNAKE_HEAD_COLOR,
  SNAKE_BODY_COLOR,
  DIRECTIONS,
  INIT_DIRECTION,
  FOOD_COLOR,
} from '../constant';

const canvas_width = CANVAS_WIDTH * BOX_SIZE,
  canvas_height = CANVAS_HEIGHT * BOX_SIZE,
  scoreElem = document.getElementById('scoreText');

class SnakeApp{
  constructor() {
    const me = this;
    me.initCanvas();
    me.addKeyboardListener();

    Object.assign(me, {
      _score: null,
      snake: null,
      food: null,
      gameOver: true,
    });
  }

  get score() {
    return this._score;
  }

  set score(value) {
    scoreElem.innerText = value - SNAKE_INIT_LENGTH;
    this._score = value;
  }

  initCanvas(){
    const me = this;
    const canvasElem = document.getElementById(CANVAS_DOM_ID);
    canvasElem.width = canvas_width;
    canvasElem.height = canvas_height;

    me.ctx = canvasElem.getContext('2d');
    me.ctx.fillStyle = '#f5f5f5';
    me.ctx.fillRect(0, 0, canvas_width, canvas_height);
  }

  addKeyboardListener(){
    const me = this;
    document.addEventListener("keydown", e => {
      const { keyCode } = e;
      if(keyCode in DIRECTIONS && !me.gameOver){
        me.snake.changeDirection(DIRECTIONS[keyCode]);
      }
    });
  }

  showGameOver(reason){
    const me = this;
    me.ctx.clearRect(0, 0, canvas_width, canvas_height);
    me.ctx.font = "30px Play";
    me.ctx.fillStyle = SNAKE_HEAD_COLOR;
    me.ctx.fillText(`You hit ${reason}, game over.`,10,50);
  }

  onSnakeEatCheck(error, errorObj){
    const me = this;
    if(error){
      me.gameOver = true;
      me.showGameOver(errorObj);
    } else {
      me.score += 1;
      me.food = service.createNewFood(me.snake.location);
    }
  }

  render(){
    const me = this;
    if(me.gameOver){
      return;
    }
    me.ctx.clearRect(0, 0, canvas_width, canvas_height);
    me.snake.move(me.score);
    me.snake.eat(me.food, me.onSnakeEatCheck.bind(me));
    service.drawSnake(me.ctx, me.snake.location);
    service.drawFood(me.ctx, me.food);
  }

  resetGame(){
    const me = this;
    me.score = SNAKE_INIT_LENGTH;
    me.snake = new Snake();

    // food need create after snake initialized
    me.food = service.createNewFood(me.snake.location);
    me.gameOver = false;
  }
}

export default SnakeApp;