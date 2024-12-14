import React, { useEffect, useRef } from 'react';
import { Flex1 } from '../../Flex';

const Chessboard: React.FC<{}> = () => {
  const previous = useRef<any>('#fff');
  const affectedCells = useRef<any>([]);
  useEffect(() => {
    const container = document.getElementById('container');
    if (container) {
      container.innerHTML = '';
      let grid = document.createElement('div');
      grid.setAttribute('id', 'chess-board');
      grid.style.cssText = `display: grid; grid-template-columns:repeat(8, 50px); grid-template-rows: repeat(8, 50px); gap: 0px; border: 1px solid; max-width: max-content`;
      let white = true;
      if (grid) {
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            let cell = document.createElement('div');
            cell.style.cssText = `display: flex;border: 1ps solid: #000;cursor: pointer`;
            cell.dataset.row = `${i}`;
            cell.dataset.col = `${j}`;
            cell.style.background = white ? '#fff' : '#000';
            cell.dataset.block = white ? 'white' : 'black';
            white = !white;
            cell.setAttribute('id', `cell-${i}-${j}`);
            cell.addEventListener('click', (e) => {
              handleClick(i, j);
            });
            grid.appendChild(cell);
          }
          white = !white;
        }
      }
      container.appendChild(grid);
    }
    document.addEventListener(
      'click',
      (e: any) => {
        if (e.target.parentNode.id == 'root') resetBoard();
      },
      true,
    );
  }, []);
  const handleClick = (i: number, j: number) => {
    const _traverse = (_i: number, _j: number, dir: string) => {
      if (_i < 0 || _i > 7 || _j < 0 || _j > 7) return;
      const _cell = document.getElementById(`cell-${_i}-${_j}`);
      if (_cell) _cell.style.background = 'red';
      affectedCells.current.push([_i, _j]);
      if (dir == 'UL') {
        _traverse(_i - 1, _j - 1, dir);
      }
      if (dir == 'UR') {
        _traverse(_i - 1, _j + 1, dir);
      }
      if (dir == 'DL') {
        _traverse(_i + 1, _j - 1, dir);
      }
      if (dir == 'DR') {
        _traverse(_i + 1, _j + 1, dir);
      }
    };
    const cell = document.getElementById(`cell-${i}-${j}`);
    if (cell) {
      const blockType = cell.dataset.block;
      resetBoard();
      affectedCells.current = [];
      previous.current = blockType;
      _traverse(i, j, 'UL');
      _traverse(i, j, 'UR');
      _traverse(i, j, 'DL');
      _traverse(i, j, 'DR');
    }
  };
  const resetBoard = () => {
    if (!previous.current) return;
    for (let [i, j] of affectedCells.current) {
      const cell = document.getElementById(`cell-${i}-${j}`);
      if (cell) cell.style.background = previous.current;
    }
  };
  return <Flex1 flexDirection="column" id="container" />;
};

export default Chessboard;
