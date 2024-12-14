import React, { useCallback, useEffect, useState, useRef } from 'react';
import './DraggableGrid.css';
import { Flex1 } from '../../../Flex';

interface Props {
  cellHeight?: number;
  cellWidth?: number;
  containerHeight?: number;
  containerWidth?: number;
}
const DraggableGrid: React.FC<Props> = (props) => {
  const start = useRef<[number, number]>([] as any);
  const end = useRef<[number, number]>([] as any);
  const isMoving = useRef<boolean>(false);
  const containerRef = useRef<any>(null);
  const {
    cellHeight = 30,
    cellWidth = 100,
    containerHeight = window.innerHeight,
    containerWidth = window.innerWidth,
  } = props;
  const ROWS = Math.floor(containerHeight / cellHeight);
  const COLS = Math.floor(containerWidth / cellWidth);

  useEffect(() => {
    const grid = document.createElement('div');
    grid.innerHTML = '';
    grid.style.cssText = `display: grid; grid-template-columns: repeat(${COLS}, ${cellWidth}px); grid-template-rows: repeat(${ROWS}, ${cellHeight}px); gap: 1px;`;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        let cell = document.createElement('div');
        cell.dataset.rows = `${i}`;
        cell.dataset.cols = `${j}`;
        cell.setAttribute('id', `cell-${i}-${j}`);
        cell.style.cssText = `display: flex; justify-content: center; align-items: center; border: 1px solid #000`;
        cell.addEventListener('mousedown', (e) => {
          e.preventDefault();
          onMouseDown(i, j);
        });
        cell.addEventListener('mousemove', (e) => {
          e.preventDefault();
          onMouseMove(i, j);
        });
        cell.addEventListener('mouseup', (e) => {
          e.preventDefault();
          onMouseLeave(i, j);
        });
        grid.appendChild(cell);
      }
    }

    containerRef.current?.appendChild(grid);
  }, []);
  const paint = useCallback(() => {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j <= COLS; j++) {
        const cell = document.getElementById(`cell-${i}-${j}`);
        let xStart = Math.min(start.current[0], end.current[0]);
        let xEnd = Math.max(start.current[0], end.current[0]);
        let yStart = Math.min(start.current[1], end.current[1]);
        let yEnd = Math.max(start.current[1], end.current[1]);
        if (cell) {
          if (i >= xStart && i <= xEnd && j >= yStart && j <= yEnd) {
            cell.style.backgroundColor = 'rgb(166 210 255)';
          } else {
            cell.style.backgroundColor = '#fff';
          }
        }
      }
    }
  }, [start, end]);
  const onMouseDown = useCallback((row: number, col: number) => {
    start.current = [row, col];
    end.current = [] as any;
    isMoving.current = true;
  }, []);
  const onMouseMove = useCallback((row: number, col: number) => {
    if (isMoving.current === true) {
      end.current = [row, col];
      paint();
    }
  }, []);
  const onMouseLeave = useCallback((row: number, col: number) => {
    isMoving.current = false;
    end.current = [row, col];
    paint();
  }, []);
  return <Flex1 flexDirection="column" ref={containerRef} />;
};

export default DraggableGrid;
