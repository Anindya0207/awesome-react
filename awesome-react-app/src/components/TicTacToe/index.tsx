import React, { useEffect, useRef } from 'react';
import { Flex1, FlexColumn, FlexRow } from '../../Flex';
import { Button, Text } from '../../BaseElements';

let gameOver = false;
const TicTacToe: React.FC<{}> = () => {
  const rows = useRef<number>(0);
  const cols = useRef<number>(0);
  const currentPlayer = useRef<string>('Player 1');
  const K = 3;
  const sanitise = (input: number) => {
    return !isNaN(input) && input >= K && input <= 20;
  };
  const handleClick = (i: number, j: number) => {
    if (gameOver) {
      alert('Game is over. Fancy another game?');
      gameOver = false;
      const container = document.getElementById('container');
      const result = document.getElementById('result');
      if (container) container.innerHTML = '';
      if (result) result.innerHTML = '';
      return;
    }
    const cell = document.getElementById(`cell-${i}-${j}`);
    if (currentPlayer.current == 'Player 1') {
      if (cell) {
        cell.textContent = '○';
        cell.dataset.content = 'O';
      }
      detectWin(i, j);
      currentPlayer.current = 'Player 2';
    } else {
      if (cell) {
        cell.innerHTML = '✕';
        cell.dataset.content = 'X';
      }
      detectWin(i, j);
      currentPlayer.current = 'Player 1';
    }
  };

  const detectWin = (i: number, j: number) => {
    const _traverse = (_i: number, _j: number, dir: string) => {
      if (_i < 0 || _i >= rows.current || _j < 0 || _j >= cols.current)
        return [];
      const cell = document.getElementById(`cell-${_i}-${_j}`);
      if (cell?.dataset.content != 'X' && currentPlayer.current == 'Player 2')
        return [];
      if (cell?.dataset.content != 'O' && currentPlayer.current == 'Player 1')
        return [];
      let path: any[] = [];
      switch (dir) {
        case 'U':
          path = [[_i, _j], ..._traverse(_i - 1, _j, dir)];
          break;
        case 'D':
          path = [[_i, _j], ..._traverse(_i + 1, _j, dir)];
          break;
        case 'L':
          path = [[_i, _j], ..._traverse(_i, _j - 1, dir)];
          break;
        case 'R':
          path = [[_i, _j], ..._traverse(_i, _j + 1, dir)];
          break;
        case 'UL':
          path = [[_i, _j], ..._traverse(_i - 1, _j - 1, dir)];
          break;
        case 'DR':
          path = [[_i, _j], ..._traverse(_i + 1, _j + 1, dir)];
          break;
        case 'UR':
          path = [[_i, _j], ..._traverse(_i - 1, _j + 1, dir)];
          break;
        case 'DL':
          path = [[_i, _j], ..._traverse(_i + 1, _j - 1, dir)];
          break;
      }
      return path;
    };
    let op11 = _traverse(i, j, 'U');
    let op12 = _traverse(i, j, 'D');
    let op1 = op11.length + op12.length - 1;
    if (op1 >= K) {
      showWin([...op11, ...op12]);
    }
    let op21 = _traverse(i, j, 'L');
    let op22 = _traverse(i, j, 'R');
    let op2 = op21.length + op22.length - 1;
    if (op2 >= K) {
      showWin([...op21, ...op22]);
    }
    let op31 = _traverse(i, j, 'UL');
    let op32 = _traverse(i, j, 'DR');
    let op3 = op31.length + op32.length - 1;
    if (op3 >= K) {
      showWin([...op31, ...op32]);
    }
    let op41 = _traverse(i, j, 'UR');
    let op42 = _traverse(i, j, 'DL');
    let op4 = op41.length + op42.length - 1;
    if (op4 >= K) {
      showWin([...op41, ...op42]);
    }
  };

  const showWin = (path: number[][]) => {
    for (let [i, j] of path) {
      const cell = document.getElementById(`cell-${i}-${j}`);
      if (cell) cell.style.background = 'rgb(208 244 213)';
    }
    let result = document.getElementById('result');
    if (result) result.textContent = `${currentPlayer.current} Wins!`;
    gameOver = true;
  };
  const generateGrid = () => {
    if (!sanitise(rows.current) || !sanitise(cols.current)) {
      alert('Please enter valid number[3-20]');
      return;
    }
    const container = document.getElementById('container');
    const result = document.getElementById('result');
    if (result) result.innerHTML = '';
    if (container) {
      container.innerHTML = '';
      let grid = document.createElement('div');
      grid.setAttribute('id', 'tic-tac-tow-board');
      grid.style.cssText = `display: grid; grid-template-columns:repeat(${cols.current}, 100px); grid-template-rows: repeat(${rows.current}, 100px); gap: 2px; border: 1px solid; max-width: max-content`;
      if (grid) {
        for (let i = 0; i < rows.current; i++) {
          for (let j = 0; j < cols.current; j++) {
            let cell = document.createElement('div');
            cell.style.cssText = `display: flex;border: 1px solid #000;cursor: pointer; justify-content: center; align-items: center; font-size: 5em`;
            cell.dataset.row = `${i}`;
            cell.dataset.col = `${j}`;
            cell.setAttribute('id', `cell-${i}-${j}`);
            cell.addEventListener('click', (e) => {
              e.preventDefault();
              handleClick(i, j);
            });
            grid.appendChild(cell);
          }
        }
      }
      container.appendChild(grid);
    }
  };
  return (
    <Flex1 flexDirection="column" maxWidth="max-content">
      <FlexRow justifyContent="flex-end" alignItems="center">
        <FlexColumn mr={3}>
          <Text mr={2}># Rows (3-20)</Text>
          <input
            type="text"
            onChange={(e) => {
              let val = e.target.value;
              rows.current = Number(val);
            }}
          />
        </FlexColumn>
        <FlexColumn>
          <Text mr={2}># Columns (3-20)</Text>
          <input
            type="text"
            onChange={(e) => {
              let val = e.target.value;
              cols.current = Number(val);
            }}
          />
        </FlexColumn>
        <FlexColumn ml={4} alignSelf="flex-end" flex={1}>
          <Button onClick={generateGrid}>Go!</Button>
        </FlexColumn>
      </FlexRow>
      <FlexColumn mt={4} id="container" />
      <FlexColumn mt={2} id="result" fontSize={60} />
    </Flex1>
  );
};

export default TicTacToe;
