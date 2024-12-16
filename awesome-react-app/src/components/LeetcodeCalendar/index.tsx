import React, { useCallback, useEffect, useState } from 'react';
import { Flex1, FlexColumn, FlexRow } from '../../Flex';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { flushSync } from 'react-dom';

interface Props {
  theme?: 'dark' | 'light';
}

const MON_MAP = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};
const LeetcodeCalendar: React.FC<Props> = (props) => {
  const { theme = 'dark' } = props;
  const [currentTheme, setTheme] = useState<'dark' | 'light'>(theme);

  const repaint = useCallback(() => {
    const parent = document.getElementById('container');
    if (parent) parent.innerHTML = '';
    const container = document.createElement('heatmap');
    container.style.cssText = `display: flex;flex-direction: row`;
    let arr: any = [];
    for (let i = 0; i < 12; i++) {
      let first = new Date();
      first.setDate(1);
      first.setMonth(i);
      let firstDay = first.getDay();
      let totalDays = new Date(first.getFullYear(), i + 1, 0).getDate();
      let last = new Date();
      last.setDate(totalDays);
      last.setMonth(i);
      let lastDay = last.getDay();
      console.log({ firstDay, totalDays, lastDay });
      let j = totalDays;
      let w = 0;
      let temp = [];
      while (j > 0) {
        if (w == 0) {
          let firstWeek = [
            ...new Array(firstDay).fill(0),
            ...new Array(7 - firstDay).fill(1),
          ];
          j = j - (7 - firstDay);
          w++;
          temp.push(firstWeek);
        } else {
          if (j >= 7) {
            temp.push(new Array(7).fill(1));
            j = j - 7;
          } else {
            let lastWeek = [
              ...new Array(j).fill(1),
              ...new Array(7 - j).fill(0),
            ];
            temp.push(lastWeek);
            j = 0;
          }
        }
      }
      arr.push(temp);
    }
    for (let i = 0; i < arr.length; i++) {
      let month = arr[i];
      let ROW = 7,
        COL = month.length;
      let grid = document.createElement('div');
      grid.style.cssText = `display: grid; grid-auto-flow:column; grid-template-rows: repeat(${ROW}, 13.4px); grid-template-columns: repeat(${COL}, 13.4px); gap: 2px;margin: 10px`;
      for (let c = 0; c < COL; c++) {
        for (let r = 0; r < ROW; r++) {
          const cell = document.createElement('div');
          cell.dataset.row = `${c}`;
          cell.dataset.col = `${r}`;
          cell.setAttribute('id', `cell-${i}-${r}-${c}`);
          cell.style.cssText = `display: flex; justify-content: center; align-items: center; border-radius: 2px`;
          if (month[c][r] == 1) {
            cell.style.background =
              currentTheme == 'dark' ? `rgb(63,63,71)` : '#d4d4d8';
          } else {
            cell.style.background =
              currentTheme == 'dark' ? `rgb(30, 30, 33)` : '#fff';
          }
          grid.appendChild(cell);
        }
      }
      container?.appendChild(grid);
    }

    const monthRow = document.createElement('div');
    monthRow.style.cssText = `display: flex; flex: 1, flex-direction: row`;
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('div');
      el.style.cssText = `display: flex; flex: 1 1 100px;text-align: center;justify-content: center; font-size: 14px;`;
      el.style.color = currentTheme == 'dark' ? '#c7c7d6' : 'rgb(30, 30, 33)';
      el.textContent = MON_MAP[i as keyof typeof MON_MAP];
      monthRow.appendChild(el);
    }
    parent?.appendChild(container);
    parent?.appendChild(monthRow);
  }, [currentTheme]);

  useEffect(() => {
    repaint();
  }, [currentTheme]);

  return (
    <Flex1
      flexDirection="column"
      background={currentTheme == 'dark' ? 'rgb(30, 30, 33)' : '#fff'}
      maxWidth="max-content"
      p="10px 30px"
      pt={20}
    >
      <FlexColumn
        alignItems="flex-end"
        position="relative"
        style={{ cursor: 'pointer' }}
      >
        {currentTheme == 'dark' ? (
          <DarkModeIcon
            style={{
              position: 'absolute',
              top: '-11px',
              right: '-23px',
              color: '#c7c7d6',
            }}
            onClick={() => {
              setTheme('light');
            }}
          />
        ) : (
          <LightModeIcon
            style={{
              position: 'absolute',
              top: '-11px',
              right: '-23px',
              color: '#rgb(30, 30, 33)',
            }}
            onClick={() => {
              setTheme('dark');
            }}
          />
        )}
      </FlexColumn>
      <Flex1 flexDirection="column" id="container"></Flex1>
    </Flex1>
  );
};

export default LeetcodeCalendar;
