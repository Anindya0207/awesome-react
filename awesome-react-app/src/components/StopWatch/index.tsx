import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Flex1, FlexRow } from '../../Flex';
import { Button, Text } from '../../BaseElements';

const StopWatch: React.FC<{}> = () => {
  const [hh, setHH] = useState<number>(0);
  const [mm, setMM] = useState<number>(0);
  const [ss, setSS] = useState<number>(0);
  const [zz, setZZ] = useState<number>(0);
  const [mode, setMode] = useState<string>('INIT');
  const intervalId = useRef<any>(null);
  const startTime = useRef(0);
  const [delta, setDelta] = useState(0);
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);
  const setUpTimer = () => {
    startTime.current = Date.now() - delta;
    intervalId.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime.current;
      setZZ(Math.floor(elapsedTime % 1000));
      setSS(Math.floor((elapsedTime / 1000) % 60));
      setMM(Math.floor((elapsedTime / (1000 * 60)) % 60));
      setHH(Math.floor(elapsedTime / (1000 * 60 * 60)));
    }, 10);
  };
  const start = () => {
    setUpTimer();
    setMode('IN_PROGRESS');
  };
  const toggle = () => {
    if (mode == 'IN_PROGRESS') {
      setMode('PAUSED');
      setDelta(Date.now() - startTime.current);
      intervalId.current && clearInterval(intervalId.current);
    }
    if (mode == 'PAUSED') {
      setUpTimer();
      setMode('IN_PROGRESS');
    }
  };
  const reset = () => {
    intervalId.current && clearInterval(intervalId.current);
    startTime.current = 0;
    setMode('INIT');
    setHH(0);
    setMM(0);
    setSS(0);
    setZZ(0);
  };
  const format = (val: number | string, digits = 2) => {
    return String(val).padStart(digits, '0');
  };
  return (
    <Flex1 flexDirection="column" justifyContent="center" alignItems="center">
      <FlexRow>
        <Text fontSize="150px">
          {format(hh)}:{format(mm)}:{format(ss)}:{format(zz, 3)}
        </Text>
      </FlexRow>
      <FlexRow>
        {mode === 'INIT' && <Button onClick={() => start()}>Start</Button>}
        {['IN_PROGRESS', 'PAUSED'].includes(mode) && (
          <Button onClick={() => reset()}>Reset</Button>
        )}
        {mode === 'IN_PROGRESS' && (
          <Button onClick={() => toggle()}>Pause</Button>
        )}
        {mode === 'PAUSED' && <Button onClick={() => toggle()}>Resume</Button>}
      </FlexRow>
    </Flex1>
  );
};

export default StopWatch;
