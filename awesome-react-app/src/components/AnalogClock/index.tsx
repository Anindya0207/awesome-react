import React, { useRef, useEffect } from 'react';
import { Flex1, FlexColumn } from '../../Flex';

const num_to_roman: any = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  11: 'XI',
  12: 'XII',
};

const AnalogClock: React.FC<{}> = () => {
  const clockRef = useRef(null as any);
  const hourRef = useRef(null as any);
  const minRef = useRef(null as any);
  const secRef = useRef(null as any);
  const timerRef = useRef(null as any);
  useEffect(() => {
    setUpTime();
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);
  const setUpTime = () => {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    secRef.current.style.transform = `translate(125px, 115px) rotate(${
      -90 + 6 * s
    }deg)`;
    minRef.current.style.transform = `translate(126px, 115px) rotate(${
      -90 + 6 * m + (6 * s) / 60
    }deg)`;
    hourRef.current.style.transform = `translate(121px, 121px) rotate(${
      -90 + h * 30 + m * 0.5 + (1 * s) / 120
    }deg)`;
    timerRef.current = setTimeout(() => {
      setUpTime();
    }, 1000);
  };
  return (
    <Flex1
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{ position: 'relative' }}
    >
      <FlexColumn
        borderRadius="50%"
        height="250px"
        width="250px"
        border="5px solid"
        style={{ boxSizing: 'content-box', boxShadow: '0 0 30px #999 inset' }}
        position="relative"
        ref={(node) => {
          clockRef.current = node;
          let rotate = -60;
          for (let i = 1; i <= 12; i++) {
            let el = document.createElement('div');
            el.style.cssText = `line-height: 0;width: 120px; height: 0px; transform-origin: top left; text-align: right; transform: translate(125px, 125px) rotate(${rotate}deg)`;
            let num = document.createElement('span');
            num.style.cssText = `transform: rotate(90deg); display: inline-block; font-weight: 600`;
            num.textContent = `${num_to_roman[i as any]}`;
            el.appendChild(num);
            rotate += 30;
            clockRef.current.appendChild(el);
          }
          let hourHand = document.createElement('div');
          let minutesHand = document.createElement('div');
          let secondsHand = document.createElement('div');
          hourHand.style.cssText = `line-height: 0; width: 60px; height: 6px; transform-origin: left top; text-align: right; transform: translate(121px, 121px) rotate(270deg);background: #000`;
          minutesHand.style.cssText = `line-height: 0; width: 100px; height: 4px; transform-origin: left top; text-align: right; transform: translate(126px, 115px) rotate(270deg);background: #000`;
          secondsHand.style.cssText = `line-height: 0; width: 90px; height: 1px; transform-origin: left top; text-align: right; transform: translate(125px, 115px) rotate(270deg);background: red`;
          hourRef.current = hourHand;
          minRef.current = minutesHand;
          secRef.current = secondsHand;
          clockRef.current.appendChild(hourHand);
          clockRef.current.appendChild(minutesHand);
          clockRef.current.appendChild(secondsHand);
          let knob = document.createElement('div');
          knob.style.cssText = `height: 15px; width: 15px;background: #000; border-radius: 50%; transform-origin: top left; transform: translate(117px, 104px)`;
          clockRef.current.appendChild(knob);
        }}
      ></FlexColumn>
    </Flex1>
  );
};

export default AnalogClock;
