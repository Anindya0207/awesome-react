import React, { useState } from 'react';
import withModal, { WithModalInjectedProps } from './Modal';
import { Button, Input, Text, TextArea } from '../../../BaseElements';
import { Flex1, FlexColumn, FlexRow } from '../../../Flex';
import { useJira } from '..';
import { Jira } from '../interface';
import Select from '../../Select/Select';
import { EPICS, getRandomColor } from '../constants';

let uuid = 1;

const CreateJiraModal: React.FC<{ onSubmit: (payload: Jira) => void }> = ({
  onSubmit,
}) => {
  const [formState, setFormState] = useState<Jira>({} as Jira);
  return (
    <Flex1 flexDirection="column">
      <FlexColumn mb={10} fontSize={28}>
        Create a new Jira
      </FlexColumn>
      <FlexColumn flex={1} fontSize={20}>
        <FlexRow mb={3}>
          <Text width={120}>Title</Text>
          <Input
            type="text"
            minWidth="300px"
            onChange={(e) => {
              setFormState((prev) => ({ ...prev, title: e.target.value }));
            }}
          ></Input>
        </FlexRow>
        <FlexRow mb={3}>
          <Text width={120}>Description</Text>
          <TextArea
            maxWidth="300px"
            minWidth="300px"
            maxHeight="60px"
            minHeight="60px"
            border="2px solid"
            borderRadius="6px"
            onChange={(e) => {
              setFormState((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
        </FlexRow>
        <FlexRow mb={3}>
          <Text width={120}>Assignee</Text>
          <Input
            type="text"
            minWidth="300px"
            onChange={(e) => {
              setFormState((prev) => ({
                ...prev,
                assignee: { name: e.target.value, color: getRandomColor() },
              }));
            }}
          ></Input>
        </FlexRow>
        <FlexRow mb={3}>
          <Text width={120}>Epic Link</Text>
          <Select
            id="epic"
            options={EPICS}
            valueAccessor="id"
            labelAccessor="title"
            containerStyles={{ maxWidth: '300px' }}
            onChange={(arg) => setFormState((prev) => ({ ...prev, epic: arg }))}
          />
        </FlexRow>
        <FlexRow mb={3}>
          <Text width={120}>Story Point</Text>
          <Input
            type="text"
            minWidth="300px"
            onChange={(e) => {
              setFormState((prev) => ({ ...prev, storyPoint: e.target.value }));
            }}
          ></Input>
        </FlexRow>
      </FlexColumn>
      <FlexColumn alignSelf="flex-end">
        <Button
          onClick={(e) => {
            e.preventDefault();
            onSubmit({ ...formState, id: `JIRA-${uuid++}` });
          }}
        >
          Submit
        </Button>
      </FlexColumn>
    </Flex1>
  );
};
const CreateJira: React.FC<WithModalInjectedProps> = (props) => {
  const { showModal, hideModal } = props;
  const { createJira } = useJira();
  return (
    <FlexColumn flex={1} alignItems="flex-end">
      <Button
        width={200}
        onClick={() => {
          showModal(
            <CreateJiraModal
              onSubmit={(jira) => {
                createJira(jira);
                hideModal();
              }}
            />,
            {
              showCloseIcon: true,
              easyClose: true,
            },
          );
        }}
      >
        Create New Jira
      </Button>
    </FlexColumn>
  );
};

export default withModal({})(CreateJira);
