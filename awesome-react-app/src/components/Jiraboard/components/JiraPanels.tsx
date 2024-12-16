import React, { useState } from 'react';
import { useJira } from '..';
import { FlexColumn, FlexRow } from '../../../Flex';
import { Jira, JiraStatus, PanelStatus } from '../interface';
import {
  getRandomColor,
  STATUS_LABEL_MAP,
  STATUS_SUB_STATUS_MAP,
} from '../constants';
import { Text } from '../../../BaseElements';

const JiraPanels: React.FC<{}> = () => {
  const [currentDraggedItem, setCurrentDraggedItem] = useState<any>(null);
  const { panels: panelGroup, moveJira } = useJira();
  const panels = Object.keys(panelGroup) as PanelStatus[];

  const handleDragStart = (
    jira: Jira,
    sourceStatus: JiraStatus,
    panelStatus: PanelStatus,
  ) => {
    setCurrentDraggedItem({ jira, sourceStatus, panelStatus });
  };
  const allowDrop = (e: any) => e.preventDefault();
  const handleDrop = (targetStatus: JiraStatus, targetPanel: PanelStatus) => {
    if (!currentDraggedItem) return;
    const { jira, sourceStatus, panelStatus } = currentDraggedItem;
    if (sourceStatus == targetStatus) return;
    if (sourceStatus == 'CLOSED') return;
    if (panelStatus == 'PENDING' && targetPanel == 'COMPLETED') return;
    if (panelStatus == 'COMPLETED' && targetPanel == 'PENDING') return;
    moveJira(jira, sourceStatus, panelStatus, targetStatus, targetPanel);
  };
  return (
    <FlexRow
      flex={1}
      my={3}
      p={3}
      borderRadius={10}
      boxShadow="0 0 3px #83868c"
    >
      {panels.map((p) => {
        const panel = panelGroup[p];
        const substatuses = (STATUS_SUB_STATUS_MAP[p] || []) as JiraStatus[];
        return (
          <FlexColumn key={p} flex={1}>
            <FlexColumn ml={3} mb={10} fontSize={28}>
              {STATUS_LABEL_MAP[p] || p}
            </FlexColumn>
            <FlexColumn
              flex={1}
              padding="10px"
              mx={2}
              borderRadius={10}
              background="#f4f5f7"
            >
              {substatuses.map((subStatus: JiraStatus) => {
                const jiras = panel[subStatus] || [];
                const subStatusLabel = STATUS_LABEL_MAP[subStatus];
                return (
                  <FlexColumn
                    borderRadius={6}
                    border="1px dashed #999999"
                    minHeight={100}
                    padding={6}
                    mb={2}
                    key={subStatus}
                    onDragOver={allowDrop}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleDrop(subStatus, p);
                    }}
                  >
                    <FlexColumn fontSize={12} m="6px 0px" ml={6}>
                      {subStatusLabel}
                    </FlexColumn>
                    <FlexColumn flex={1}>
                      {jiras.map((jira) => {
                        const assignee = jira.assignee.name
                          .toUpperCase()
                          .charAt(0);
                        const color = jira.assignee.color;
                        return (
                          <FlexColumn
                            key={jira.id}
                            background="#fff"
                            padding={10}
                            boxShadow="0px 2px 5px #babec2"
                            borderLeft="3px solid"
                            borderRadius="6px"
                            mb={10}
                            style={{ position: 'relative' }}
                            draggable
                            onDragStart={(e) => {
                              // e.preventDefault();
                              handleDragStart(jira, subStatus, p);
                            }}
                          >
                            <Text
                              height={30}
                              width={30}
                              borderRadius="50%"
                              backgroundColor={color}
                              color="#fff"
                              lineHeight={2}
                              textAlign="center"
                              style={{
                                position: 'absolute',
                                top: '8px',
                                right: '14px',
                              }}
                            >
                              {assignee}
                            </Text>

                            <Text
                              fontSize={16}
                              color="#5d6c84"
                              {...(subStatus == 'CLOSED' && {
                                style: { textDecoration: 'line-through' },
                              })}
                            >
                              {jira.id}
                            </Text>
                            <Text color="#2b2d57">{jira.title}</Text>
                            {jira.epic && (
                              <Text
                                backgroundColor={jira.epic.color}
                                padding="2px 6px"
                                fontSize={13}
                                borderRadius={4}
                                maxWidth="max-content"
                                margin="4px 0"
                                color="#fff"
                              >
                                {jira.epic.title}
                              </Text>
                            )}
                            <Text
                              backgroundColor="#cfd1da"
                              color="#2b2d57"
                              fontWeight="bold"
                              borderRadius="6px"
                              height="18px"
                              fontSize="12px"
                              textAlign="center"
                              mt={1}
                              maxWidth="max-content"
                              padding="0 6px"
                            >
                              {jira.storyPoint}
                            </Text>
                          </FlexColumn>
                        );
                      })}
                    </FlexColumn>
                  </FlexColumn>
                );
              })}
            </FlexColumn>
          </FlexColumn>
        );
      })}
    </FlexRow>
  );
};

export default JiraPanels;
