import { PanelStatus } from '../interface';

export const STATUS_LABEL_MAP = {
  [PanelStatus.PENDING]: 'Pending',
  [PanelStatus.IN_PROGRESS]: 'In Progress',
  [PanelStatus.COMPLETED]: 'Completed',
  DEV_IN_PROGRESS: 'Dev In Progress',
  IN_REVIEW: 'In review',
  IN_TESTING: 'In Testing',
  PENDING_ROLLOUT: 'In Rollout',
  CLOSED: 'Closed',
};

export const STATUS_SUB_STATUS_MAP = {
  [PanelStatus.PENDING]: ['PENDING'],
  [PanelStatus.IN_PROGRESS]: [
    'DEV_IN_PROGRESS',
    'IN_REVIEW',
    'IN_TESTING',
    'PENDING_ROLLOUT',
  ],
  [PanelStatus.COMPLETED]: ['COMPLETED', 'CLOSED'],
};

export const getRandomColor = () => {
  return `#${Math.round(0x80 * Math.random())
    .toString(16)
    .padStart(2, '0')}${Math.round(0x80 * Math.random())
    .toString(16)
    .padStart(2, '0')}${Math.round(0x80 * Math.random())
    .toString(16)
    .padStart(2, '0')}`;
};

export const EPICS = [
  {
    id: 'EPIC1',
    title: 'FE App improvements',
    color: getRandomColor(),
  },
  {
    id: 'EPIC2',
    title: 'WM Scan in BYOD',
    color: getRandomColor(),
  },
  {
    id: 'EPIC3',
    title: 'Seamless two way',
    color: getRandomColor(),
  },
  {
    id: 'EPIC4',
    title: 'Engineering Improvement',
    color: getRandomColor(),
  },
];
