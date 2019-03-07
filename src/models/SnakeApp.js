import Snake from './Snake';
import service from '../service';
import {
  BOX_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_DOM_ID,
  SNAKE_HEAD_COLOR,
  DIRECTIONS,
} from '../constant';

const canvasWidth = CANVAS_WIDTH * BOX_SIZE;
const canvasHeight = CANVAS_HEIGHT * BOX_SIZE;
const startBtnElem = document.getElementById('gameStartBtn');
const scoreElem = document.getElementById('scoreText');

class SnakeApp {
  constructor() {
    this.initCanvas();
    this.addAppListener();

    this.snake = null;
    this.food = null;
    this.gameOver = true;
  }

  initCanvas() {
    const canvasElem = document.getElementById(CANVAS_DOM_ID);
    canvasElem.width = canvasWidth;
    canvasElem.height = canvasHeight;

    this.ctx = canvasElem.getContext('2d');
    this.ctx.fillStyle = '#f5f5f5';
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  addAppListener() {
    document.addEventListener('keydown', (e) => {
      const { keyCode } = e;
      if (keyCode in DIRECTIONS && !this.gameOver) {
        this.snake.changeDirection(DIRECTIONS[keyCode]);
      }
    });

    startBtnElem.addEventListener('click', () => {
      this.resetGame();
    });
  }

  showGameOver(reason) {
    // this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.font = '30px Play';
    this.ctx.fillStyle = SNAKE_HEAD_COLOR;
    this.ctx.fillText(`You hit ${reason}, game over.`, 10, 50);
  }

  detectNext() {
    let res = null;
    if (service.detectCollision(this.snake.nextHead, this.food)) {
      this.snake.eat();
      this.food = service.createNewFood(this.snake.location);
      scoreElem.innerText = this.snake.score;
    } else if (service.checkHitWall(this.snake.nextHead)) {
      res = 'wall';
    } else if (service.checkHeadHitBody(this.snake.nextHead, this.snake.location)) {
      res = 'body';
    }
    return res;
  }

  render() {
    if (this.gameOver) {
      return;
    }

    const detectResult = this.detectNext();
    if (detectResult) {
      this.gameOver = true;
      this.showGameOver(detectResult);
      return;
    }

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.snake.move();
    service.drawSnake(this.ctx, this.snake.location);
    service.drawFood(this.ctx, this.food);
  }

  resetGame() {
    this.snake = new Snake();
    scoreElem.innerText = 0;
    // food need create after snake initialized, for not conflict purpose
    this.food = service.createNewFood(this.snake.location);
    this.gameOver = false;
  }
}

export default SnakeApp;
