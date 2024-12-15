import React, { useEffect, useRef } from 'react';
import { Flex1, FlexColumn, FlexRow } from '../../Flex';
import { Text } from '../../BaseElements';

interface Props {
  boardWidth?: number;
  boardHeight?: number;
}
const SnakeGame: React.FC<Props> = (props) => {
  const { boardWidth = 600, boardHeight = 600 } = props;
  const delay = useRef(200);
  const cols = useRef<number>(0);
  const rows = useRef<number>(0);
  const cellsize = useRef<number>(20);
  let snakeblocks = useRef<any[]>([]);
  let nextfood = useRef<[number, number]>([] as any);
  let timer = useRef<any>(null);
  let maxScore = useRef<number>(0);
  let lastOp = useRef<string>('');

  const getRandomPos = () => {
    let x = Math.floor(Math.random() * (boardWidth / cellsize.current));
    let y = Math.floor(Math.random() * (boardHeight / cellsize.current));
    return [x, y];
  };

  useEffect(() => {
    reset();
    document.addEventListener('keydown', attachEvents);
    return () => {
      document.removeEventListener('keydown', attachEvents);
    };
  }, []);

  const reset = () => {
    renderGrid();
    placeSnakeInitial();
    placeFood();
  };
  const renderGrid = () => {
    const container = document.getElementById('container');
    if (container) {
      container.innerHTML = '';
      let grid = document.createElement('div');
      grid.setAttribute('id', 'snake-board');
      cols.current = boardWidth / cellsize.current;
      rows.current = boardWidth / cellsize.current;
      grid.style.cssText = `display: grid; grid-template-columns:repeat(${cols.current}, ${cellsize.current}px); grid-template-rows: repeat(${rows.current}, ${cellsize.current}px); gap: 0px; border: 5px solid red; max-width: max-content; background: #000`;
      if (grid) {
        for (let i = 0; i < rows.current; i++) {
          for (let j = 0; j < cols.current; j++) {
            let cell = document.createElement('div');
            cell.style.cssText = `display: flex;border: 1px solid #000;cursor: pointer; justify-content: center; align-items: center; font-size: 5em`;
            cell.dataset.row = `${i}`;
            cell.dataset.col = `${j}`;
            cell.setAttribute('id', `cell-${i}-${j}`);
            grid.appendChild(cell);
          }
        }
      }
      container.appendChild(grid);
    }
  };
  const placeSnakeInitial = () => {
    snakeblocks.current = [];
    let [x, y] = getRandomPos();
    let cell = document.getElementById(`cell-${x}-${y}`);
    if (cell) {
      cell.style.background = 'blue';
      snakeblocks.current.push([x, y]);
    }
  };

  const placeFood = () => {
    let [x, y] = getRandomPos();
    let cell = document.getElementById(`cell-${x}-${y}`);
    if (cell) {
      cell.style.background = 'orange';
      cell.style.border = '2px solid #000';
      cell.style.borderRadius = '50%';
      nextfood.current = [x, y];
    }
  };
  const attachEvents = (e: any) => {
    let key = e.key;
    switch (key) {
      case 'ArrowUp':
      case 'w':
        if (lastOp.current == 'u' || lastOp.current == 'd') return;
        lastOp.current = 'u';
        timer.current && clearTimeout(timer.current);
        moveSnake(-1, 0);
        break;
      case 'ArrowDown':
      case 's':
        if (lastOp.current == 'u' || lastOp.current == 'd') return;
        lastOp.current = 'd';
        timer.current && clearTimeout(timer.current);
        moveSnake(1, 0);
        break;
      case 'ArrowLeft':
      case 'a':
        if (lastOp.current == 'l' || lastOp.current == 'r') return;
        lastOp.current = 'l';
        timer.current && clearTimeout(timer.current);
        moveSnake(0, -1);
        break;
      case 'ArrowRight':
      case 'd':
        if (lastOp.current == 'l' || lastOp.current == 'r') return;
        lastOp.current = 'r';
        timer.current && clearTimeout(timer.current);
        moveSnake(0, 1);
        break;
      default:
        e.preventDefault();
    }
  };

  const moveSnake = (dx: number, dy: number) => {
    let at = snakeblocks.current[0];
    let [x, y] = at;
    let newx = x + dx,
      newy = y + dy;
    let head = document.getElementById(`cell-${newx}-${newy}`);
    if (head) {
      if (head.getAttribute('visited') == 'true') {
        gameOver();
      } else {
        head.style.background = 'blue';
        head.style.borderRadius = '0';
        head.style.border = 'none';
        head.setAttribute('visited', 'true');
        if (newx == nextfood.current[0] && newy == nextfood.current[1]) {
          snakeblocks.current.unshift([newx, newy]);
          timer.current && clearTimeout(timer.current);
          updateScore();
          placeFood();
          moveSnake(dx, dy);
        } else {
          let tail = snakeblocks.current[snakeblocks.current.length - 1];
          let [lx, ly] = tail;
          let tailcell = document.getElementById(`cell-${lx}-${ly}`);
          if (tailcell) {
            tailcell.style.background = '#000';
            tailcell.removeAttribute('visited');
          }
          snakeblocks.current.unshift([newx, newy]);
          snakeblocks.current.pop();
          timer.current = setTimeout(() => {
            moveSnake(dx, dy);
          }, delay.current);
        }
      }
    } else {
      gameOver();
    }
  };

  const gameOver = () => {
    timer.current && clearTimeout(timer.current);
    updateMaxScore();
    reset();
    alert('GAME OVER');
  };

  const updateScore = () => {
    const scoreEl = document.getElementById('score');
    if (scoreEl) {
      scoreEl.textContent = `${snakeblocks.current.length}`;
      maxScore.current = Math.max(maxScore.current, snakeblocks.current.length);
    }
  };
  const updateMaxScore = () => {
    const scoreEl = document.getElementById('maxScore');
    if (scoreEl) {
      scoreEl.textContent = `${maxScore.current}`;
    }
  };
  return (
    <Flex1 flexDirection="column" maxWidth="max-content">
      <FlexRow justifyContent="space-between">
        <FlexRow justifyContent="center">
          <Text mr={2}>Score :</Text>
          <Text id="score"></Text>
        </FlexRow>
        <FlexRow justifyContent="center">
          <Text mr={2}>Max Score :</Text>
          <Text id="maxScore"></Text>
        </FlexRow>
      </FlexRow>
      <FlexColumn id="container"></FlexColumn>
    </Flex1>
  );
};

export default SnakeGame;
