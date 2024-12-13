import React, { lazy, Suspense, useContext, useState } from 'react';
import { Flex1 } from '../../Flex';
import { Text } from '../../BaseElements';
import { Jira, JiraPanelState, JiraStatus, PanelStatus } from './interface';

const CreateJira = lazy(() => import('./components/CreateJira'));
const JiraPanels = lazy(() => import('./components/JiraPanels'));

export const JiraContext = React.createContext<{
  panels: JiraPanelState;
  createJira: (jira: Jira) => void;
  moveJira: (
    jira: Jira,
    sourceStatus: JiraStatus,
    sourcePanel: PanelStatus,
    targetStatus: JiraStatus,
    targetPanel: PanelStatus,
  ) => void;
}>({} as any);
export const useJira = () => useContext(JiraContext);

const Fallback = <Text>Please Wait..</Text>;

const JiraBoard: React.FC<{}> = () => {
  const [panels, setPanels] = useState<JiraPanelState>({
    ['PENDING']: {
      ['PENDING']: [
        {
          id: 'JIRA0',
          title: 'Test Jira',
          description: 'Test',
          assignee: {name: 'Anindya', color: 'orange'},
          storyPoint: 2,
        },
      ],
    } as any,
    ['IN_PROGRESS']: {} as any,
    ['COMPLETED']: {} as any,
  });
  const createJira = (payload: Jira) => {
    setPanels((prev) => {
      return {
        ...prev,
        [PanelStatus.PENDING]: {
          ...prev[PanelStatus.PENDING],
          ['PENDING']: [...(prev[PanelStatus.PENDING]?.PENDING || []), payload],
        },
      };
    });
  };
  const moveJira = (
    jira: Jira,
    sourceStatus: JiraStatus,
    sourcePanel: PanelStatus,
    targetStatus: JiraStatus,
    targetPanel: PanelStatus,
  ) => {
    setPanels((prev) => {
      const filtered = prev[sourcePanel][sourceStatus]?.filter(
        (j) => j.id != jira.id,
      );
      const targetJiras = [...(prev[targetPanel][targetStatus] || []), jira];
      if(sourcePanel == targetPanel) {
        return {
          ...prev,
          [sourcePanel]: {
            ...prev[sourcePanel],
            [sourceStatus]: filtered,
            [targetStatus]: targetJiras,
          },
        };
      }
      return {
        ...prev,
        [sourcePanel]: {
          ...prev[sourcePanel],
          [sourceStatus]: filtered,
        },
        [targetPanel]: {
          ...prev[targetPanel],
          [targetStatus]: targetJiras,
        },
      };
    });
  };
  return (
    <JiraContext.Provider value={{ panels, createJira, moveJira }}>
      <Flex1 flexDirection="column">
        <Suspense fallback={Fallback}>
          <CreateJira />
        </Suspense>
        <Suspense fallback={Fallback}>
          <JiraPanels />
        </Suspense>
      </Flex1>
    </JiraContext.Provider>
  );
};

export default JiraBoard;
