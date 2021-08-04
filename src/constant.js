/* eslint quote-props: "off" */
export const GAME_INTERVAL = 400;
export const BOX_SIZE = 20;

export const CANVAS_DOM_ID = 'appCan';
export const CANVAS_WIDTH = 20; // not actual pixel, but number of box width
export const CANVAS_HEIGHT = 20; // same as above

export const SNAKE_INIT_LENGTH = 3;
export const SNAKE_HEAD_COLOR = '#3f72af';
export const SNAKE_BODY_COLOR = '#c7d0d5';

export const FOOD_COLOR = '#ff7148';

export const DIRECTIONS = {
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
}; // not enabled for now

export const DIRECTIONS0 = {
  37: { x: -1, y: 0 }, // left arrow
  39: { x: 1, y: 0 }, // right
  38: { x: 0, y: -1 }, // up
  40: { x: 0, y: 1 }, // down
};

export const INIT_DIRECTION = DIRECTIONS.d;
