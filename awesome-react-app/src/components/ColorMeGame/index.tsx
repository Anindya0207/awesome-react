import React, { useEffect, useRef } from 'react';
import { Flex1, FlexColumn, FlexRow } from '../../Flex';
import { Text } from '../../BaseElements';

const ColorMeGame: React.FC<{}> = (props) => {
  const gridSize = useRef<number>(3);
  const score = useRef<number>(0);
  const maxScore = useRef<number>(0);
  const correctCell = useRef<number[]>([]);
  const getRandomColor = () => {
    return `#${Math.round(Math.random() * 0x80)
      .toString(16)
      .padStart(2, '0')}${Math.round(Math.random() * 0x80)
      .toString(16)
      .padStart(2, '0')}${Math.round(Math.random() * 0x80)
      .toString(16)
      .padStart(2, '0')}`;
  };
  const getRandom = (range: number) => {
    return Math.floor(Math.random() * range);
  };
  useEffect(() => {
    paintGrid();
    printScores();
  }, []);

  const printScores = () => {
    let scoreEl = document.getElementById('score');
    if (scoreEl) scoreEl.textContent = `${score.current}`;
    let maxScoreEl = document.getElementById('maxScore');
    if (maxScoreEl) maxScoreEl.textContent = `${maxScore.current}`;
  };
  const onSuccess = () => {
    score.current++;
    gridSize.current++;
    maxScore.current = Math.max(maxScore.current, score.current);
    printScores();
    paintGrid();
  };
  const onFailure = (galatI: number, galatJ: number) => {
    gridSize.current = 3;
    score.current = 0;
    printScores();
    const container = document.getElementById('container');
    const galatCell = document.getElementById(`cell-${galatI}-${galatJ}`);
    const sahiCell = document.getElementById(
      `cell-${correctCell.current[0]}-${correctCell.current[1]}`,
    );
    if (container) {
      container.classList.add('shake');
      setTimeout(() => {
        container.classList.remove('shake');
        if (galatCell) galatCell.style.border = '2px solid red';
        if (sahiCell) sahiCell.style.border = '2px solid green';
      }, 500);
      setTimeout(() => {
        paintGrid();
      }, 2000);
    }
  };
  const paintGrid = () => {
    let color = getRandomColor();
    const container = document.getElementById('container');
    if (container) container.innerHTML = '';
    let grid = document.createElement('div');
    let cellSize = Math.max(50, Math.floor(600 / gridSize.current));
    grid.style.cssText = `display: grid; grid-template-rows: repeat(${gridSize.current}, ${cellSize}px);grid-template-columns: repeat(${gridSize.current}, ${cellSize}px); gap: 1px; border: 2ps solid #000; max-width: max-content`;
    for (let i = 0; i < gridSize.current; i++) {
      for (let j = 0; j < gridSize.current; j++) {
        const cell = document.createElement('div');
        cell.dataset.row = `${i}`;
        cell.dataset.col = `${j}`;
        cell.setAttribute('id', `cell-${i}-${j}`);
        cell.style.cssText = `display: flex; justify-content:center; align-items: center; border: 1ps solid ${color}; cursor: pointer`;
        cell.style.background = color;
        cell.onclick = () => onFailure(i, j);
        grid.appendChild(cell);
      }
    }
    container?.appendChild(grid);
    const randomRow = getRandom(gridSize.current);
    const randomCol = getRandom(gridSize.current);
    const randomCell = document.getElementById(
      `cell-${randomRow}-${randomCol}`,
    );
    correctCell.current = [randomRow, randomCol];
    if (randomCell) {
      randomCell.style.filter = `brightness(1.1)`;
      randomCell.onclick = onSuccess;
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

export default ColorMeGame;
