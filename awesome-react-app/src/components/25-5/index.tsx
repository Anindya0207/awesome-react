import React, { useState, useRef } from 'react';
import { Flex1, FlexColumn, FlexRow } from '../../Flex';
import { Text } from '../../BaseElements';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { PlayArrow, RestartAltRounded } from '@mui/icons-material';
import { flushSync } from 'react-dom';

const ActionButton = ({ children, ...rest }: any) => (
  <FlexColumn
    {...rest}
    justifyContent="center"
    alignItems="center"
    margin="0 10px"
    padding="10px"
    borderRadius="6px"
    boxShadow="1px 3px 7px #d3d3d3"
    width="100px"
    style={{ cursor: 'pointer' }}
  >
    {children}
  </FlexColumn>
);
const BreakWorkButton = ({ children }: any) => (
  <FlexColumn
    margin={10}
    justifyContent="center"
    boxShadow="1px 3px 7px #d3d3d3"
    padding="16px"
    paddingTop="6px"
    borderRadius="6px"
  >
    {children}
  </FlexColumn>
);
const Pomodoro: React.FC<{}> = () => {
  const [workTime, setWorkTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);
  const [mm, setMM] = useState(workTime);
  const [ss, setSS] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('');
  const timer = useRef(null as any);
  const handleIncrementBreakTime = () => {
    setBreakTime((prev) => prev + 1);
  };
  const handleDecrementBreakTime = () => {
    setBreakTime((prev) => prev - 1);
  };
  const handleIncrementWorkTime = () => {
    setWorkTime((prev) => prev + 1);
  };
  const handleDecrementWorkTime = () => {
    setWorkTime((prev) => prev - 1);
  };
  const play = (initMM: number) => {
    if (isPlaying) return;
    setIsPlaying(true);
    const endTime = Date.now() + initMM * 60 * 1000;
    flushSync(() => {
      setMM(initMM);
      setMode((prev) => (prev == 'WORK' ? 'PLAY' : 'WORK'));
    });
    timer.current = setInterval(() => {
      const delta = endTime - Date.now();
      if (delta <= 0) {
        if (mode == 'WORK') {
          clearInterval(timer.current);
          play(breakTime);
        } else {
          clearInterval(timer.current);
          play(workTime);
        }
      } else {
        setMM(Math.floor((delta / (1000 * 60)) % 60));
        setSS(Math.floor((delta / 1000) % 60));
      }
    }, 10);
  };
  const reset = () => {
    timer.current && clearInterval(timer.current);
    setMode('');
    setMM(workTime);
    setSS(0);
    setIsPlaying(false);
  };
  return (
    <Flex1 justifyContent="center" alignItems="center">
      <FlexColumn flex={1} justifyContent="center" alignItems="center">
        <FlexRow flex={1} justifyContent="center" alignItems="center">
          <BreakWorkButton>
            <Text textAlign="center" fontSize="40px">
              {workTime}
            </Text>
            <FlexRow alignItems="center">
              <RemoveCircleIcon onClick={handleDecrementWorkTime} />
              <Text fontSize="20px" margin="0 10px">
                Work time
              </Text>
              <AddCircleIcon onClick={handleIncrementWorkTime} />
            </FlexRow>
          </BreakWorkButton>
          <BreakWorkButton>
            <Text textAlign="center" fontSize="40px">
              {breakTime}
            </Text>
            <FlexRow alignItems="center">
              <RemoveCircleIcon onClick={handleDecrementBreakTime} />
              <Text fontSize="20px" margin="0 10px">
                Break time
              </Text>
              <AddCircleIcon onClick={handleIncrementBreakTime} />
            </FlexRow>
          </BreakWorkButton>
        </FlexRow>
        <FlexColumn
          flex={1}
          justifyContent="center"
          alignItems="center"
          mb={20}
        >
          <Text
            textAlign="center"
            fontSize="30px"
            fontWeight={600}
            margin="20px 0"
            lineHeight={1}
          >
            {mode == 'WORK'
              ? 'Time to work!'
              : mode == 'PLAY'
              ? 'Take a break!'
              : 'Idle'}
          </Text>
          <Text fontSize="100px" fontWeight={600} lineHeight={1}>
            {`${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`}
          </Text>
        </FlexColumn>
        <FlexColumn flex={1}>
          <FlexRow>
            <ActionButton onClick={() => play(workTime)}>
              <PlayArrow />
              <Text>PLAY</Text>
            </ActionButton>
            <ActionButton onClick={reset}>
              <RestartAltRounded />
              <Text>RESET</Text>
            </ActionButton>
          </FlexRow>
        </FlexColumn>
      </FlexColumn>
    </Flex1>
  );
};

export default Pomodoro;
